# == Schema Information
#
# Table name: door_panel_families
#
#  id               :integer          not null, primary key
#  name             :string(255)
#  slab_material_id :integer
#  created_at       :datetime
#  updated_at       :datetime
#

class DoorPanelFamily < ActiveRecord::Base
  belongs_to :slab_material
  has_many :door_panels, dependent: :destroy

  translates :name
  accepts_nested_attributes_for :translations
end
