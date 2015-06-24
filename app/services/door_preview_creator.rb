require 'erb'
require 'RMagick'
include Magick

class DoorPreviewCreator

  def initialize(door_line)
    @door_line = door_line
  end

  def call
    create_image
  end


  private


  def frame_profile
    @door_line.frame_profile
  end

  def total_width
    @door_line.total_width
  end

  def total_height
    @door_line.total_height
  end

  def door_line_sections
    @door_line.door_line_sections
  end

  def create_image
    temp_file_name = File.join(Rails.root, 'tmp', "image_#{@door_line.id}.svg")
    final_file_name = File.join(Rails.root, 'public', 'system', 'images', 'doors', "preview_#{@door_line.id}.png")

    # define canvas for final image
    image_width = (total_width + 30) * PIXELS_PER_INCH
    image_height = (total_height + 35) * PIXELS_PER_INCH
    canvas = Image.new(image_width, image_height)

    # initialize coordinates
    current_x = frame_profile.width
    current_y = frame_profile.width + frame_profile.gap_slab / 2

    # loop on sections
    door_line_sections.each do |door_line_section|
      current_x += frame_profile.send(:"gap_#{door_line_section.door_panel.gap}") / 2 if door_line_section.door_panel

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
      offsetx_px = current_x * PIXELS_PER_INCH
      offsety_px = current_y * PIXELS_PER_INCH

      # paint the image on canvas
      canvas.composite! section_image, offsetx_px, offsety_px, OverCompositeOp
      section_image.destroy!

      # print horizontal size
      draw_horizontal_measurement(canvas, door_line_section.door_panel_dimension.width, current_x)

      # update coordinates
      current_x += door_line_section.door_panel_dimension.width
      current_x += frame_profile.send(:"gap_#{door_line_section.door_panel.gap}") / 2 if door_line_section.door_panel
      current_x += (door_line_section.id == door_line_sections.last.id ? frame_profile.width : frame_profile.separator_width)
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
    draw_horizontal_measurement(canvas, total_width, 0, 50)   if door_line_sections.length > 1

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



  def draw_vertical_measurement(canvas, section_height, current_y)
    arrow_offset = 15
    arrow_width = 20
    text_offset = 5
    gc = Draw.new
    gc.stroke 'black'
    # top line
    gc.line total_width * PIXELS_PER_INCH + arrow_offset, current_y * PIXELS_PER_INCH, total_width * PIXELS_PER_INCH + arrow_offset + arrow_width, current_y * PIXELS_PER_INCH
    # bottom line
    gc.line total_width * PIXELS_PER_INCH + arrow_offset, (current_y + section_height) * PIXELS_PER_INCH, total_width * PIXELS_PER_INCH + arrow_offset + arrow_width, (current_y + section_height) * PIXELS_PER_INCH
    # vertical line
    gc.line total_width * PIXELS_PER_INCH + arrow_offset + arrow_width / 2, current_y * PIXELS_PER_INCH, total_width * PIXELS_PER_INCH + arrow_offset + arrow_width / 2, (current_y + section_height) * PIXELS_PER_INCH
    # top arrow
    gc.line total_width * PIXELS_PER_INCH + arrow_offset, current_y * PIXELS_PER_INCH + arrow_width / 2, total_width * PIXELS_PER_INCH + arrow_offset + arrow_width / 2, current_y * PIXELS_PER_INCH
    gc.line total_width * PIXELS_PER_INCH + arrow_offset + arrow_width / 2, current_y * PIXELS_PER_INCH, total_width * PIXELS_PER_INCH + arrow_offset + arrow_width, current_y * PIXELS_PER_INCH + arrow_width / 2
    # bottom arrow
    gc.line total_width * PIXELS_PER_INCH + arrow_offset, (current_y + section_height) * PIXELS_PER_INCH - arrow_width / 2, total_width * PIXELS_PER_INCH + arrow_offset + arrow_width / 2, (current_y + section_height) * PIXELS_PER_INCH
    gc.line total_width * PIXELS_PER_INCH + arrow_offset + arrow_width / 2, (current_y + section_height) * PIXELS_PER_INCH, total_width * PIXELS_PER_INCH + arrow_offset + arrow_width, (current_y + section_height) * PIXELS_PER_INCH - arrow_width / 2
    # text
    gc.stroke 'transparent'
    gc.fill 'black'
    gc.pointsize 16
    gc.text total_width * PIXELS_PER_INCH + arrow_offset + arrow_width / 2 + text_offset, (current_y + section_height / 2) * PIXELS_PER_INCH, section_height.to_s

    gc.draw canvas
  end

  def draw_horizontal_measurement(canvas, section_width, current_x, extra_offset = 0)
    arrow_offset = 15
    arrow_height = 20
    text_offset_x = -20
    text_offset_y = -5
    gc = Draw.new
    gc.stroke 'black'
    # left line
    gc.line current_x * PIXELS_PER_INCH, total_height * PIXELS_PER_INCH + arrow_offset + extra_offset, current_x * PIXELS_PER_INCH, total_height * PIXELS_PER_INCH + arrow_offset + extra_offset + arrow_height
    # right line
    gc.line((current_x + section_width) * PIXELS_PER_INCH, total_height * PIXELS_PER_INCH + arrow_offset + extra_offset, (current_x + section_width) * PIXELS_PER_INCH, total_height * PIXELS_PER_INCH + arrow_offset + extra_offset + arrow_height)
    # horizontal line
    gc.line current_x * PIXELS_PER_INCH, total_height * PIXELS_PER_INCH + arrow_offset + extra_offset + arrow_height / 2, (current_x + section_width) * PIXELS_PER_INCH, total_height * PIXELS_PER_INCH + arrow_offset + extra_offset + arrow_height / 2
    # top arrow
    gc.line current_x * PIXELS_PER_INCH + arrow_height / 2, total_height * PIXELS_PER_INCH + arrow_offset + extra_offset, current_x * PIXELS_PER_INCH, total_height * PIXELS_PER_INCH + arrow_offset + extra_offset + arrow_height / 2
    gc.line current_x * PIXELS_PER_INCH, total_height * PIXELS_PER_INCH + arrow_offset + extra_offset + arrow_height / 2, current_x * PIXELS_PER_INCH + arrow_height / 2, total_height * PIXELS_PER_INCH + arrow_offset + extra_offset + arrow_height
    # bottom arrow
    gc.line((current_x + section_width) * PIXELS_PER_INCH - arrow_height / 2, total_height * PIXELS_PER_INCH + arrow_offset + extra_offset, (current_x + section_width) * PIXELS_PER_INCH, total_height * PIXELS_PER_INCH + arrow_offset + extra_offset + arrow_height / 2)
    gc.line((current_x + section_width) * PIXELS_PER_INCH, total_height * PIXELS_PER_INCH + arrow_offset + extra_offset + arrow_height / 2, (current_x + section_width) * PIXELS_PER_INCH - arrow_height / 2, total_height * PIXELS_PER_INCH + arrow_offset + extra_offset + arrow_height)
    # text
    gc.stroke 'transparent'
    gc.fill 'black'
    gc.pointsize 16
    gc.text((current_x + section_width / 2) * PIXELS_PER_INCH + text_offset_x, total_height * PIXELS_PER_INCH + arrow_offset + extra_offset + arrow_height / 2 + text_offset_y, section_width.to_s)

    gc.draw canvas
  end

end
