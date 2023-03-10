desc 'Regenerates Opening images'
require 'erb'
require 'RMagick'
include Magick

FRAME_THICKNESS = 3.0
ARROW_SIZE = 5.0
PIXELS_PER_INCH = 1
WINDOW_FILL_COLOR = '#C9DAE7'


task :regen_openings do

  # binding for erb file
  # constants
  frame_thickness = FRAME_THICKNESS
  arrow_size = ARROW_SIZE
  window_fill_color = WINDOW_FILL_COLOR

  section_height2 = 0

  # for each file in components/openings/*.svg
  Dir.glob(File.join(Rails.root, 'components', 'openings', '*.svg')) do |svg_file|
    # do work on files ending in .rb in the desired directory

    puts "Processing #{svg_file}"
    image_base_name = File.basename(svg_file, '.svg') + '.png'
    image_file_name = File.join(Rails.root, 'public', 'images', 'openings', image_base_name)
    output_file_name = File.join(Rails.root, image_base_name)

  #    img = Image.read(image_file_name).first
  #    section_width = img.columns - 1
  #    section_height = img.rows - 1

    section_width = 150
    section_height = 75
    temp_file_name = File.join(Rails.root, 'tmp', File.basename(svg_file))

  #   load file, run through erb
    File.open(temp_file_name, 'w') do |f|
      f.write ERB.new(File.read(svg_file)).result(binding)
    end
  #   convert to png
    File.unlink(output_file_name) if File.exist?(output_file_name)
    system("rsvg-convert -a #{temp_file_name} -o #{output_file_name}")
  end
end

task :regen_triangles do
  # binding for erb file
  # constants
  frame_thickness = FRAME_THICKNESS
  arrow_size = ARROW_SIZE
  window_fill_color = WINDOW_FILL_COLOR

  section_height2 = 0

  # for each file in components/openings/*.svg
  Dir.glob(File.join(Rails.root, 'components', 'openings', '*.svg')) do |svg_file|
    # do work on files ending in .rb in the desired directory

    next unless svg_file =~ /triangle/
    puts "Processing #{svg_file}"
    image_base_name = File.basename(svg_file, '.svg') + '.png'
    image_file_name = File.join(Rails.root, 'public', 'images', 'openings', image_base_name)
    output_file_name = File.join(Rails.root, image_base_name)

  #    img = Image.read(image_file_name).first
  #    section_width = img.columns - 1
  #    section_height = img.rows - 1

    section_width = 76
    section_height = 38
    temp_file_name = File.join(Rails.root, 'tmp', File.basename(svg_file))

  #   load file, run through erb
    File.open(temp_file_name, 'w') do |f|
      f.write ERB.new(File.read(svg_file)).result(binding)
    end
  #   convert to png
    File.unlink(output_file_name) if File.exist?(output_file_name)
    system("rsvg-convert -a #{temp_file_name} -o #{output_file_name}")
  end
end

