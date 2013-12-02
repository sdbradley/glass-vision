class Shape < ActiveRecord::Base
  include Translatable
  has_attached_file :photo, :default_style => :original,
                    :whiny_thumbnails => true,
                    :styles => {
                        :thumb => '32x32',
                        :normal => '150x150',
                        :original => '300x300'
                    },
                    :url => '/system/:class/:attachment/:id/:style_:basename.:extension',
                    :path => ':rails_root/public/system/:class/:attachment/:id/:style_:basename.:extension',
                    :default_url => '/images/shapes/missing_:style.png'

  validates_presence_of :name, :sections_width, :sections_height, :corners
  validates_numericality_of :sections_width, :sections_height
  has_and_belongs_to_many :series, :class_name => 'Serie'
end
