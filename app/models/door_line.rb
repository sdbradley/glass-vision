require 'erb'
require 'RMagick'
include Magick

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
  belongs_to :standard_interior_color, :class_name => "ProductColor"
  belongs_to :standard_exterior_color, :class_name => "ProductColor"

  ARROW_SIZE = 5.0
  PIXELS_PER_INCH = 3

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
    width
  end

  def total_height
    height = 0
    height = door_line_sections.first.door_panel_dimension.height + 2 * frame_profile.width + frame_profile.gap_slab + frame_profile.sill
    height
  end

  def create_image
    temp_file_name = File.join(Rails.root, 'tmp', "image_#{id}.svg")
    final_file_name = File.join(Rails.root, 'public', 'system', 'images', 'doors', "preview_#{id}.png")

    # define canvas for final image
    image_width = (total_width + 30) * PIXELS_PER_INCH
    image_height = (total_height + 35) * PIXELS_PER_INCH
    canvas = Image.new(image_width, image_height)

    # intialize coordinates
    currentx = frame_profile.width
    currenty = frame_profile.width + frame_profile.gap_slab / 2

    # loop on sections
    door_line_sections.each do |door_line_section|
      currentx += frame_profile.send(:"gap_#{door_line_section.door_panel.gap}") / 2 if door_line_section.door_panel

      # get the file to be painted
      if door_line_section.door_panel
        src_image = File.join(Rails.root, 'public', 'images', 'door_panels', File.basename(door_line_section.door_panel.preview_image_name))
      else
        src_image = File.join(Rails.root, 'public', 'images', 'door_panels', door_line_section.door_section.code + '.png')
      end

      # load section image
      section_image = Image.read(src_image)[0]

      # render the glass here if any
      if door_line_section.door_glass
        src_image = door_line_section.door_glass.photo.url(:normal)
        src_image = src_image.gsub(File.basename(src_image), 'rendered.png')
        src_image = File.join(Rails.root, 'public', src_image)
        if File.exist?(src_image)
          glass_image = Image.read(src_image)[0]
          section_image.composite! glass_image, 0, 0, OverCompositeOp
        end
      end

      # resize the section image to fit the dimensions
      section_image.resize! door_line_section.door_panel_dimension.width * PIXELS_PER_INCH, door_line_section.door_panel_dimension.height * PIXELS_PER_INCH

      # define offset to paint section
      offsetx_px = currentx * PIXELS_PER_INCH
      offsety_px = currenty * PIXELS_PER_INCH

      # paint the image on canvas
      canvas.composite! section_image, offsetx_px, offsety_px, OverCompositeOp
      section_image.destroy!

      # print horizontal size
      draw_horizontal_measurement(canvas, door_line_section.door_panel_dimension.width, currentx)

      # update coordinates
      currentx += door_line_section.door_panel_dimension.width
      currentx += frame_profile.send(:"gap_#{door_line_section.door_panel.gap}") / 2 if door_line_section.door_panel
      currentx += (door_line_section.id == door_line_sections.last.id ? frame_profile.width : frame_profile.separator_width)
    end

    # global frame
    frame = Draw.new
    frame.fill_opacity 0
    frame.stroke_width 1
    frame.stroke 'black'
    frame.rectangle 0, 0, total_width * PIXELS_PER_INCH - 1, total_height * PIXELS_PER_INCH - 1
    frame.draw canvas

    # print vertical size
    draw_vertical_measurement(canvas, total_height, 0)

    # print total horizontal size
    draw_horizontal_measurement(canvas, total_width, 0, 50)

    # write final image
    canvas.write final_file_name
    canvas.destroy!

    # delete temp file
    begin
      File.delete temp_file_name
    rescue
      # don't care
    end
  end

  def get_image_size
    return (total_width + 30) * PIXELS_PER_INCH, (total_height + 35) * PIXELS_PER_INCH
  end

  private ####################################################################

  def draw_vertical_measurement(canvas, section_height, currenty)
    arrow_offset = 15
    arrow_width = 20
    text_offset = 5
    gc = Draw.new
    gc.stroke 'black'
    # top line
    gc.line total_width * PIXELS_PER_INCH + arrow_offset, currenty * PIXELS_PER_INCH, total_width * PIXELS_PER_INCH + arrow_offset + arrow_width, currenty * PIXELS_PER_INCH
    # bottom line
    gc.line total_width * PIXELS_PER_INCH + arrow_offset, (currenty + section_height) * PIXELS_PER_INCH, total_width * PIXELS_PER_INCH + arrow_offset + arrow_width, (currenty + section_height) * PIXELS_PER_INCH
    # vertical line
    gc.line total_width * PIXELS_PER_INCH + arrow_offset + arrow_width / 2, currenty * PIXELS_PER_INCH, total_width * PIXELS_PER_INCH + arrow_offset + arrow_width / 2, (currenty + section_height) * PIXELS_PER_INCH
    # top arrow
    gc.line total_width * PIXELS_PER_INCH + arrow_offset, currenty * PIXELS_PER_INCH + arrow_width / 2, total_width * PIXELS_PER_INCH + arrow_offset + arrow_width / 2, currenty * PIXELS_PER_INCH
    gc.line total_width * PIXELS_PER_INCH + arrow_offset + arrow_width / 2, currenty * PIXELS_PER_INCH, total_width * PIXELS_PER_INCH + arrow_offset + arrow_width, currenty * PIXELS_PER_INCH + arrow_width / 2
    # bottom arrow
    gc.line total_width * PIXELS_PER_INCH + arrow_offset, (currenty + section_height) * PIXELS_PER_INCH - arrow_width / 2, total_width * PIXELS_PER_INCH + arrow_offset + arrow_width / 2, (currenty + section_height) * PIXELS_PER_INCH
    gc.line total_width * PIXELS_PER_INCH + arrow_offset + arrow_width / 2, (currenty + section_height) * PIXELS_PER_INCH, total_width * PIXELS_PER_INCH + arrow_offset + arrow_width, (currenty + section_height) * PIXELS_PER_INCH - arrow_width / 2
    # text
    gc.stroke 'transparent'
    gc.fill 'black'
    gc.pointsize 16
    gc.text total_width * PIXELS_PER_INCH + arrow_offset + arrow_width / 2 + text_offset, (currenty + section_height / 2) * PIXELS_PER_INCH, section_height.to_s

    gc.draw canvas
  end

  def draw_horizontal_measurement(canvas, section_width, currentx, extra_offset = 0)
    arrow_offset = 15
    arrow_height = 20
    text_offset_x = -20
    text_offset_y = -5
    gc = Draw.new
    gc.stroke 'black'
    # left line
    gc.line currentx * PIXELS_PER_INCH, total_height * PIXELS_PER_INCH + arrow_offset + extra_offset, currentx * PIXELS_PER_INCH, total_height * PIXELS_PER_INCH + arrow_offset + extra_offset + arrow_height
    # right line
    gc.line((currentx + section_width) * PIXELS_PER_INCH, total_height * PIXELS_PER_INCH + arrow_offset + extra_offset, (currentx + section_width) * PIXELS_PER_INCH, total_height * PIXELS_PER_INCH + arrow_offset + extra_offset + arrow_height)
    # horizontal line
    gc.line currentx * PIXELS_PER_INCH, total_height * PIXELS_PER_INCH + arrow_offset + extra_offset + arrow_height / 2, (currentx + section_width) * PIXELS_PER_INCH, total_height * PIXELS_PER_INCH + arrow_offset + extra_offset + arrow_height / 2
    # top arrow
    gc.line currentx * PIXELS_PER_INCH + arrow_height / 2, total_height * PIXELS_PER_INCH + arrow_offset + extra_offset, currentx * PIXELS_PER_INCH, total_height * PIXELS_PER_INCH + arrow_offset + extra_offset + arrow_height / 2
    gc.line currentx * PIXELS_PER_INCH, total_height * PIXELS_PER_INCH + arrow_offset + extra_offset + arrow_height / 2, currentx * PIXELS_PER_INCH + arrow_height / 2, total_height * PIXELS_PER_INCH + arrow_offset + extra_offset + arrow_height
    # bottom arrow
    gc.line((currentx + section_width) * PIXELS_PER_INCH - arrow_height / 2, total_height * PIXELS_PER_INCH + arrow_offset + extra_offset, (currentx + section_width) * PIXELS_PER_INCH, total_height * PIXELS_PER_INCH + arrow_offset + extra_offset + arrow_height / 2)
    gc.line((currentx + section_width) * PIXELS_PER_INCH, total_height * PIXELS_PER_INCH + arrow_offset + extra_offset + arrow_height / 2, (currentx + section_width) * PIXELS_PER_INCH - arrow_height / 2, total_height * PIXELS_PER_INCH + arrow_offset + extra_offset + arrow_height)
    # text
    gc.stroke 'transparent'
    gc.fill 'black'
    gc.pointsize 16
    gc.text((currentx + section_width / 2) * PIXELS_PER_INCH + text_offset_x, total_height * PIXELS_PER_INCH + arrow_offset + extra_offset + arrow_height / 2 + text_offset_y, section_width.to_s)

    gc.draw canvas
  end

end

