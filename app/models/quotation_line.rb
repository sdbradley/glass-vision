class QuotationLine < ActiveRecord::Base
  belongs_to :quotation, touch: true
  belongs_to :serie
  belongs_to :shape
  has_many :quotation_lines_openings, dependent: :destroy
  has_many :options_quotation_lines, dependent: :destroy
  has_many :section_heights, dependent: :destroy
  has_many :section_widths, dependent: :destroy

  belongs_to :standard_interior_color, class_name: 'ProductColor'
  belongs_to :standard_exterior_color, class_name: 'ProductColor'

  validates_presence_of :width, :height, :serie_id, :quantity
  validates_numericality_of :width, :height, :quantity

  before_destroy :delete_preview_image
  after_initialize :set_default_quantity

  def set_default_quantity
    return unless new_record? && quantity.blank?

    self.quantity = 1
  end

  # @param [Shape] shape
  def upper_transom_index(shape)
    shape.total_sections + 1
  end

  # @param [Shape] shape
  def lower_transom_index(shape)
    shape.total_sections + 2
  end

  # @param [Shape] shape
  def left_sidelight_index(shape)
    shape.total_sections + 3
  end

  # @param [Shape] shape
  def right_sidelight_index(shape)
    shape.total_sections + 4
  end

  def get_image_size
    [(width + 30) * PIXELS_PER_INCH, (height + 20) * PIXELS_PER_INCH]
  end

  # @param [Opening] opening
  # @param [int] apply_to
  def applies_to(opening, apply_to)
    case apply_to
    when Option::APPLIES_TO_FIXED
      opening.openable == false
    when Option::APPLIES_TO_OPENABLE
      opening.openable == true
    when Option::APPLIES_TO_ALL
      true
    end
  end

  # @param [Option] option
  # @param [Opening] opening
  def compute_minimum_section_area(section_area, option, opening)
    # don't count this area if the opening isn't applicable (eg, we're only counting fixed or openable openings)
    return 0 if option.apply_to != Option::APPLIES_TO_ALL && !applies_to(opening, option.apply_to)

    section_area = option.minimum_quantity if section_area < option.minimum_quantity
    section_area
  end

  def compute_minimum_glass_area(section_area, option, opening)
    # don't count this area if the opening isn't applicable (eg, we're only counting fixed or openable openings)
    return 0 if option.apply_to != Option::APPLIES_TO_ALL && !applies_to(opening, option.apply_to)

    glasses_quantity = (opening.glasses_quantity || 1)
    glass_area = section_area / glasses_quantity
    glass_area = option.minimum_quantity if glass_area < option.minimum_quantity
    glass_area * glasses_quantity
  end

  def has_price_override?
    price != original_price
  end

  def compute_final_price
    if has_price_override?
      # if the price has been overridden do not apply the discount
      price * (1 + (quotation.markup / 100.0))
    else
      price * (1 - (quotation.discount / 100.0)) * (1 + (quotation.markup / 100.0))
    end
  end

  def has_interior_color?
    !interior_color.blank? || !standard_interior_color.blank?
  end

  def has_exterior_color?
    !exterior_color.blank? || !standard_exterior_color.blank?
  end

  def get_preview_image_path
    create_image unless File.exist?(File.join(Rails.root, 'public', preview_image_path))
    preview_image_path
  end

  def create_image
    WindowPreviewCreator.new(self).call
  end

  protected

  def delete_preview_image
    # delete the line image

    File.delete File.join(Rails.root, 'public', 'system', 'images', 'previews', "preview_#{id}.png")
  rescue StandardError
    # no problem if file does not exist
  end

  private

  def preview_image_path
    "/system/images/previews/preview_#{id}.png"
  end
end
