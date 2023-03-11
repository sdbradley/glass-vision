class DoorFrame < ActiveRecord::Base
  translates :name
  accepts_nested_attributes_for :translations
  include Priceable

  validates :name, :sections, :preview_image_name, presence: true

  has_many :door_combinations
end
