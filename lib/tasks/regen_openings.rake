desc 'Regenerates Opening images'
require 'erb'
require 'RMagick'
include Magick

FRAME_THICKNESS = 3.0
ARROW_SIZE = 5.0
PIXELS_PER_INCH = 1
WINDOW_FILL_COLOR = '#C9DAE7'.freeze

task regen_openings: :environment do
  # binding for erb file
  # constants
  frame_thickness = FRAME_THICKNESS
  arrow_size = ARROW_SIZE
  window_fill_color = WINDOW_FILL_COLOR

  section_height2 = 0

  # for each file in components/openings/*.svg
  Rails.root.glob('components/openings/*.svg') do |svg_file|
    # do work on files ending in .rb in the desired directory

    puts "Processing #{svg_file}"
    image_base_name = "#{File.basename(svg_file, '.svg')}.png"
    image_file_name = Rails.public_path.join('images', 'openings', image_base_name)
    output_file_name = Rails.root.join(image_base_name)

    #    img = Image.read(image_file_name).first
    #    section_width = img.columns - 1
    #    section_height = img.rows - 1

    section_width = 150
    section_height = 75
    temp_file_name = Rails.root.join('tmp', File.basename(svg_file))

    #   load file, run through erb
    File.write(temp_file_name, ERB.new(File.read(svg_file)).result(binding))
    #   convert to png
    FileUtils.rm_f(output_file_name)
    system("rsvg-convert -a #{temp_file_name} -o #{output_file_name}")
  end
end

task regen_triangles: :environment do
  # binding for erb file
  # constants
  frame_thickness = FRAME_THICKNESS
  arrow_size = ARROW_SIZE
  window_fill_color = WINDOW_FILL_COLOR

  section_height2 = 0

  # for each file in components/openings/*.svg
  Rails.root.glob('components/openings/*.svg') do |svg_file|
    # do work on files ending in .rb in the desired directory

    next unless svg_file =~ /triangle/

    puts "Processing #{svg_file}"
    image_base_name = "#{File.basename(svg_file, '.svg')}.png"
    image_file_name = Rails.public_path.join('images', 'openings', image_base_name)
    output_file_name = Rails.root.join(image_base_name)

    #    img = Image.read(image_file_name).first
    #    section_width = img.columns - 1
    #    section_height = img.rows - 1

    section_width = 76
    section_height = 38
    temp_file_name = Rails.root.join('tmp', File.basename(svg_file))

    #   load file, run through erb
    File.write(temp_file_name, ERB.new(File.read(svg_file)).result(binding))
    #   convert to png
    FileUtils.rm_f(output_file_name)
    system("rsvg-convert -a #{temp_file_name} -o #{output_file_name}")
  end
end
