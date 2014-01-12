class AddImagesForShapes < ActiveRecord::Migration
  def self.up
    base_path = File.expand_path('../../shape_images',  __FILE__)
    Shape.find_by_name('1 Section').update_attribute(:photo, File.new(File.join(base_path, 'one-by-one.png'), 'rb'))
    Shape.find_by_name('2 Sections').update_attribute(:photo, File.new(File.join(base_path, 'two-by-one.png'), 'rb'))
    Shape.find_by_name('3 Sect. / 3 Sect.').update_attribute(:photo, File.new(File.join(base_path, 'three-over-three.png'), 'rb'))
    Shape.find_by_name('3 Sections').update_attribute(:photo, File.new(File.join(base_path, 'three-by-one.png'), 'rb'))
    Shape.find_by_name('4 Sections').update_attribute(:photo, File.new(File.join(base_path, 'four-by-one.png'), 'rb'))
    Shape.find_by_name('3 Sect. / 2 Sect.').update_attribute(:photo, File.new(File.join(base_path, 'three-over-two.png'), 'rb'))
    Shape.find_by_name('Sect. / Sect.').update_attribute(:photo, File.new(File.join(base_path, 'one-over-one.png'), 'rb'))
    Shape.find_by_name('2 Sect. / 3 Sect.').update_attribute(:photo, File.new(File.join(base_path, 'two-over-three.png'), 'rb'))
    Shape.find_by_name('2 Sect. / 2 Sect.').update_attribute(:photo, File.new(File.join(base_path, 'two-over-two.png'), 'rb'))
    Shape.find_by_name('Sect. / Sect. / Sect.').update_attribute(:photo, File.new(File.join(base_path, 'one-by-three.png'), 'rb'))
    Shape.find_by_name('2 Sect. / 4 Sect.').update_attribute(:photo, File.new(File.join(base_path, 'two-over-four.png'), 'rb'))
    Shape.find_by_name('Sect. / Sect. / Sect. / Sect.').update_attribute(:photo, File.new(File.join(base_path, 'one-by-four.png'), 'rb'))
    Shape.find_by_name('3 Sect. / 4 Sect.').update_attribute(:photo, File.new(File.join(base_path, 'three-over-four.png'), 'rb'))
    Shape.find_by_name('4 Sect. / 2 Sect.').update_attribute(:photo, File.new(File.join(base_path, 'four-over-two.png'), 'rb'))
    Shape.find_by_name('4 Sect. / 3 Sect.').update_attribute(:photo, File.new(File.join(base_path, 'four-over-three.png'), 'rb'))
    Shape.find_by_name('4 Sect. / 4 Sect.').update_attribute(:photo, File.new(File.join(base_path, 'four-over-four.png'), 'rb'))
    Shape.find_by_name('5 sections').update_attribute(:photo, File.new(File.join(base_path, 'five-by-one.png'), 'rb'))
    Shape.find_by_name('6 sections').update_attribute(:photo, File.new(File.join(base_path, 'six-by-one.png'), 'rb'))
    Shape.find_by_name('Fenetre en baie').update_attribute(:photo, File.new(File.join(base_path, 'bay-window.png'), 'rb'))
    Shape.find_by_name('6 Sect. / 2 Sect.').update_attribute(:photo, File.new(File.join(base_path, 'six-over-two.png'), 'rb'))
    Shape.find_by_name('5 Sect. / 2 Sect').update_attribute(:photo, File.new(File.join(base_path, 'five-over-two.png'), 'rb'))
    Shape.find_by_name('1 section sur 2 sections').update_attribute(:photo, File.new(File.join(base_path, 'one-over-two.png'), 'rb'))
    Shape.find_by_name('Sect. / Sect. / Sect./ Sect. /Sect.').update_attribute(:photo, File.new(File.join(base_path, 'one-by-five.png'), 'rb'))
    Shape.find_by_name('2 sections sur 1 section').update_attribute(:photo, File.new(File.join(base_path, 'two-over-one.png'), 'rb'))
    Shape.find_by_name('Sidelight + 1 Sec / 1 Sec').update_attribute(:photo, File.new(File.join(base_path, 'one-and-two.png'), 'rb'))
    Shape.find_by_name('Sidelight + 1 Sec / 1 Sec + Upper Transom').update_attribute(:photo, File.new(File.join(base_path, 'one-and-two-upper-transom.png'), 'rb'))
    Shape.find_by_name('Sec/Sec + SL').update_attribute(:photo, File.new(File.join(base_path, 'two-and-one.png'), 'rb'))
    Shape.find_by_name('SL+Sec/Sec + SL').update_attribute(:photo, File.new(File.join(base_path, 'one-two-one.png'), 'rb'))
    Shape.find_by_name('2 Sect. / 1 Sect').update_attribute(:photo, File.new(File.join(base_path, 'two-over-one.png'), 'rb'))
    Shape.find_by_name('1 sec / 3 sec').update_attribute(:photo, File.new(File.join(base_path, 'one-over-three.png'), 'rb'))
    Shape.find_by_name('SDL /Sect. / Sect. / Sect.').update_attribute(:photo, File.new(File.join(base_path, 'three-by-one-sidelight.png'), 'rb'))


      Shape.all.each do |instance|
      instance.photo.reprocess!
    end
  end

  def self.down
    Shape.all.each do |shape|
      shape.photo.destroy
    end
  end
end
