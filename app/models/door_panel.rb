class DoorPanel < ApplicationRecord
  include Priceable
  translates :name
  accepts_nested_attributes_for :translations

  has_and_belongs_to_many :door_glasses
  has_and_belongs_to_many :door_sections
  belongs_to :door_panel_family
  has_many :door_panel_dimensions, -> { order(height: :asc, width: :asc) } # double check this
end
