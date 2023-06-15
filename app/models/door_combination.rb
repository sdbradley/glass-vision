class DoorCombination < ApplicationRecord
  translates :name
  accepts_nested_attributes_for :translations
  include Priceable

  validates :name, :sections, :preview_image_name, presence: true

  belongs_to :door_frame
  has_and_belongs_to_many :door_openings, join_table: "door_combinations_door_openings"
end
