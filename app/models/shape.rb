class Shape < ApplicationRecord
  include Translatable
  has_attached_file :photo, default_style: :original,
                            whiny_thumbnails: true,
                            styles: {
                              thumb: '32x32',
                              small: '100x100',
                              normal: '150x150',
                              original: '300x300'
                            },
                            url: '/system/:class/:attachment/:id/:style_:basename.:extension',
                            path: ':rails_root/public/system/:class/:attachment/:id/:style_:basename.:extension',
                            default_url: 'shapes/missing_:style.png',
                            convert_options: { all: '-trim' }

  validates :name, :sections_width, :sections_height, :corners, presence: true
  validates :sections_width, :sections_height, numericality: true
  #  validates_attachment_presence :photo
  #  validates_attachment_content_type :photo, :content_type => %w(image/jpg image/gif image/png),
  #                                    :message => 'file must be of filetype png, jpg or gif'

  has_and_belongs_to_many :series, class_name: 'Serie'

  # @return [int] total number of sections in this shape . Does not include transoms
  def total_sections
    sections_width * sections_height
  end
end
