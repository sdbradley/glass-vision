class DoorCombination < ActiveRecord::Base
  translates :name
  accepts_nested_attributes_for :translations
  include Priceable

  validates :name, :sections, :preview_image_name, :door_frame_id, presence: true

  belongs_to :door_frame
  has_and_belongs_to_many :door_openings
end
