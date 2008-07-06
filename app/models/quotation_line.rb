require 'RMagick'
require 'erb'
include Magick

class QuotationLine < ActiveRecord::Base
  belongs_to :quotation
  belongs_to :serie
  belongs_to :shape
  has_many :quotation_lines_openings, :order => 'sort_order', :dependent => :destroy
  has_and_belongs_to_many :options
  has_many :section_heights, :dependent => :destroy
  has_many :section_widths, :dependent => :destroy

  validates_presence_of :width, :height, :serie_id, :quantity
  validates_numericality_of :width, :height, :quantity

  # constants for drawing
  FRAME_THICKNESS = 3.0
  ARROW_SIZE = 5.0
  PIXELS_PER_INCH = 2

  def create_image
    temp_file_name = File.join(RAILS_ROOT, 'tmp', "image_#{id}.svg")
    final_file_name = File.join(RAILS_ROOT, 'public', 'images', 'previews', "preview_#{id}.png")

    # binding for erb file
    # constants
    frame_thickness = FRAME_THICKNESS
    arrow_size = ARROW_SIZE

    # define canvas for final image
    image_width = (width + 30) * PIXELS_PER_INCH
    image_height = (height + 20) * PIXELS_PER_INCH
    canvas = Image.new(image_width, image_height)
    # section counter
    cpt_opening = 0

    # coordinates
    currenty = 0

    # loop on rows
    section_heights.each { |h|

      # intialize coordinates
      currentx = 0

      # loop on columns
      section_widths.each { |w|

        # define section dimensions for binding in erb
        section_width = w.value
        section_height = h.value

        # load erb file for section and generate scaled svg file
        image_file_name = File.basename(quotation_lines_openings[cpt_opening].opening.preview_image_name, '.png') + '.svg'
        File.open(temp_file_name, 'w') do |f|
          f.write ERB.new(File.read(File.join(RAILS_ROOT, 'components', 'openings', image_file_name))).result(binding)
        end

        # load svg file
        section_image = Image.read(temp_file_name)[0]

        # define offset to paint section
        offsetx_px = currentx * PIXELS_PER_INCH
        offsety_px = currenty * PIXELS_PER_INCH

        # paint the image on canvas
        canvas.composite! section_image, offsetx_px, offsety_px, OverCompositeOp
        
        # next opening
        cpt_opening += 1

        # update coordinates
        currentx += w.value
      }

      # update coordinates
      currenty += h.value
    }

    # initialize offset
    currenty = 0

    # print vertical sizes
    section_heights.each { |h|

      # define values for binding
      section_height = h.value

      # load erb file and generate svg
      File.open(temp_file_name, 'w') do |f|
        f.write ERB.new(File.read(File.join(RAILS_ROOT, 'components', 'misc', 'vertical_size.svg'))).result(binding)
      end

      #load svg file
      size_image = Image.read(temp_file_name)[0]

      # define offset to paint section
      offsetx_px = (width + 1) * PIXELS_PER_INCH
      offsety_px = currenty * PIXELS_PER_INCH

      # paint the image on canvas
      canvas.composite! size_image, offsetx_px, offsety_px, OverCompositeOp

      # update coordinates
      currenty += h.value
    }

    # initialize offset
    currentx = 0

    # print horizontal sizes
    section_widths.each { |w|

      # define values for binding
      section_width = w.value

      # load erb file and generate svg
      File.open(temp_file_name, 'w') do |f|
        f.write ERB.new(File.read(File.join(RAILS_ROOT, 'components', 'misc', 'horizontal_size.svg'))).result(binding)
      end

      #load svg file
      size_image = Image.read(temp_file_name)[0]

      # define offset to paint section
      offsetx_px = currentx * PIXELS_PER_INCH
      offsety_px = (height + 1) * PIXELS_PER_INCH

      # paint the image on canvas
      canvas.composite! size_image, offsetx_px, offsety_px, OverCompositeOp

      # update coordinates
      currentx += w.value
    }

    # write final image
    canvas.write final_file_name

    # delete temp file
    begin
      File.delete temp_file_name
    rescue
      # don't care
    end
  end

  def get_image_size
    return (width + 30) * PIXELS_PER_INCH, (height + 20) * PIXELS_PER_INCH
  end

  protected

  def before_destroy
    # delete the line image
    begin
      File.delete File.join(RAILS_ROOT, 'public', 'images', 'previews', "preview_#{id}.png")
    rescue
      # no problem if file does not exist
    end
  end
end
