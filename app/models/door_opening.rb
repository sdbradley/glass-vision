class DoorOpening < ActiveRecord::Base
  include Priceable
  translates :name
  accepts_nested_attributes_for :translations

  has_and_belongs_to_many :door_combinations
end
