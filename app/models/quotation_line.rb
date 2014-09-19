class QuotationLine < ActiveRecord::Base
  belongs_to :quotation, :touch => true
  belongs_to :serie
  belongs_to :shape
  has_many :quotation_lines_openings, :order => 'sort_order', :dependent => :destroy
  has_many :options_quotation_lines, :dependent => :destroy
  has_many :section_heights, :dependent => :destroy
  has_many :section_widths, :dependent => :destroy

  belongs_to :standard_interior_color, :class_name => 'ProductColor'
  belongs_to :standard_exterior_color, :class_name => 'ProductColor'

  validates_presence_of :width, :height, :serie_id, :quantity
  validates_numericality_of :width, :height, :quantity

  before_destroy :delete_preview_image

  def after_initialize
    if self.new_record? && quantity.blank?
      self.quantity = 1
    end
  end

  def upper_transom_index(shape)
    (shape.sections_width * shape.sections_height + 1)
  end

  def lower_transom_index(shape)
    (shape.sections_width * shape.sections_height + 2)
  end

  def left_sidelight_index(shape)
    (shape.sections_width * shape.sections_height + 3)
  end

  def right_sidelight_index(shape)
    (shape.sections_width * shape.sections_height + 4)
  end

  def get_image_size
    return (width + 30) * PIXELS_PER_INCH, (height + 20) * PIXELS_PER_INCH
  end

  def applies_to(opening, apply_to)
    case apply_to
      when 0
        return opening.openable == false
      when 1
        return opening.openable == true
      when 2
        true
    end
  end

  def compute_minimum_section_area(section_area, option, opening)
    # don't count this area if the opening isn't applicable (eg, we're only counting fixed or openable openings)
    return 0 if option.apply_to != 2 && !applies_to(opening, option.apply_to)
    section_area = option.minimum_quantity if section_area < option.minimum_quantity
    section_area
  end

  def compute_minimum_glass_area(section_area, option, opening)
    # don't count this area if the opening isn't applicable (eg, we're only counting fixed or openable openings)
    return 0 if option.apply_to != 2 && !applies_to(opening, option.apply_to)

    glasses_quantity = (opening.glasses_quantity || 1)
    glass_area = section_area / glasses_quantity
    glass_area = option.minimum_quantity if glass_area < option.minimum_quantity
    glass_area * glasses_quantity
  end

  def has_price_override?
    self.price != self.original_price
  end

  def compute_final_price
    if self.price == self.original_price
      self.price * (1 - self.quotation.discount / 100.0) * (1 + self.quotation.markup / 100.0)
    else
      # if the price has been overridden do not apply the discount
      self.price * (1 + self.quotation.markup / 100.0)
    end
  end

  def has_interior_color?
    !interior_color.blank? || !standard_interior_color.blank?
  end

  def has_exterior_color?
    !exterior_color.blank? || !standard_exterior_color.blank?
  end


  def get_preview_image_path
    create_image unless File.exists?(File.join(Rails.root, 'public', preview_image_path))
    preview_image_path
  end


  def create_image
    WindowPreviewCreator.new(self).call
  end

  protected


  def delete_preview_image
    # delete the line image
    begin
      File.delete File.join(Rails.root, 'public', 'system', 'images', 'previews', "preview_#{id}.png")
    rescue
      # no problem if file does not exist
    end
  end

private
  def preview_image_path
    "/system/images/previews/preview_#{self.id}.png"
  end

end
