class DoorFrame < ActiveRecord::Base
  translates :name
  accepts_nested_attributes_for :translations
  include Priceable

  validates_presence_of :name, :sections, :preview_image_name

  has_many :door_combinations
end
