
class DoorLine < ActiveRecord::Base
  belongs_to :quotation, :touch => true
  belongs_to :door_frame
  belongs_to :door_combination
  belongs_to :frame_profile
  belongs_to :slab_material
  has_many :door_line_sections, :order => 'sort_order', :dependent => :destroy
  belongs_to :door_opening
  belongs_to :door_boring
  has_many :door_line_options, :dependent => :destroy
  belongs_to :standard_interior_color, :class_name => 'ProductColor'
  belongs_to :standard_exterior_color, :class_name => 'ProductColor'

  before_destroy :delete_preview_image

  def update_price
    self.price = 0

    # door frame
    self.price += door_frame.price

    # door combination
    self.price += door_combination.price

    # frame profile
    self.price += frame_profile.price

    # slab material
    self.price += slab_material.price

    # door opening
    self.price += door_opening.price

    # door boring
    self.price += door_boring.price

    # door line sections
    door_line_sections.each do |door_line_section|
      self.price += door_line_section.price
    end

    # door line options
    door_line_options.each do |door_line_option|
      self.price += door_line_option.price
    end

    self.save
  end

  def total_width
    width = 0
    door_line_sections.each do |door_line_section|
      width += door_line_section.door_panel_dimension.width
      width += frame_profile.send(:"gap_#{door_line_section.door_panel.gap}") if door_line_section.door_panel
    end
    width += 2 * frame_profile.width
    width += (door_line_sections.count - 1) * frame_profile.separator_width
  end

  def total_height
    height = 0
    height = door_line_sections.first.door_panel_dimension.height + 2 * frame_profile.width + frame_profile.gap_slab + frame_profile.sill
  end


  def get_image_size
    return (total_width + 30) * PIXELS_PER_INCH, (total_height + 35) * PIXELS_PER_INCH
  end

  def create_image
    DoorPreviewCreator.new(self).call
  end

  def delete_preview_image
    # delete the line image
    begin
      File.delete File.join(Rails.root, 'public', 'system', 'images', 'previews', "preview_#{id}.png")
    rescue
      # no problem if file does not exist
    end
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

end

