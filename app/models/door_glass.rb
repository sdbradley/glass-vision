class DoorGlass < ActiveRecord::Base
  include Priceable
  translates :name
  accepts_nested_attributes_for :translations

  belongs_to :door_glass_family
  has_and_belongs_to_many :door_panels

  has_attached_file :photo,
                    :url => '/system/:class/:attachment/:id/:style_:basename.:extension',
                    :path => ":rails_root/public/system/:class/:attachment/:id/:style_:basename.:extension",
                    :default_url => "/images/:class/missing_:style.png",
                    :default_style => :original,
                    :whiny_thumbnails => true,
                    :styles => {
                       :thumb => "32x32#",
                       :normal  => "100x100>",
#                       :original => "300x300"
                    }

  validates_attachment_size :photo, :less_than => 1.megabyte
  validates_attachment_content_type :photo, content_type: /\Aimage\/.*\Z/

end
