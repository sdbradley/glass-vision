# == Schema Information
#
# Table name: door_glass_families
#
#  id         :integer          not null, primary key
#  name       :string(255)
#  created_at :datetime
#  updated_at :datetime
#

class DoorGlassFamily < ActiveRecord::Base
  translates :name
  accepts_nested_attributes_for :translations
  has_many :door_glasses, :dependent => :destroy
end
