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
                    :default_url => '/images/shapes/missing_:style.png',
                    :convert_options => { :all => '-trim' }

  validates_presence_of :name, :sections_width, :sections_height, :corners
  validates_numericality_of :sections_width, :sections_height
#  validates_attachment_presence :photo
#  validates_attachment_content_type :photo, :content_type => %w(image/jpg image/gif image/png),
#                                    :message => 'file must be of filetype png, jpg or gif'

  has_and_belongs_to_many :series, :class_name => 'Serie'


end
