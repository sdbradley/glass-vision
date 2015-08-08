class DoorPanelFamily < ActiveRecord::Base
  belongs_to :slab_material
  has_many :door_panels, :dependent => :destroy

  translates :name
  accepts_nested_attributes_for :translations
end
