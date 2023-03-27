# == Schema Information
#
# Table name: door_panel_dimensions
#
#  id            :integer          not null, primary key
#  door_panel_id :integer
#  width         :float
#  height        :float
#  price         :float
#  created_at    :datetime
#  updated_at    :datetime
#

class DoorPanelDimension < ApplicationRecord
  include Priceable

  belongs_to :door_panel
end
