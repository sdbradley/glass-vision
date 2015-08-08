class DoorGlassFamily < ActiveRecord::Base
  translates :name
  accepts_nested_attributes_for :translations
  has_many :door_glasses, :dependent => :destroy
end
