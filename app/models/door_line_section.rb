# == Schema Information
#
# Table name: door_line_sections
#
#  id                      :integer          not null, primary key
#  door_line_id            :integer
#  sort_order              :integer
#  door_section_id         :integer
#  door_panel_id           :integer
#  door_glass_id           :integer
#  created_at              :datetime
#  updated_at              :datetime
#  door_panel_dimension_id :integer
#

class DoorLineSection < ApplicationRecord
  belongs_to :door_line
  belongs_to :door_section
  belongs_to :door_panel
  belongs_to :door_glass
  belongs_to :door_panel_dimension

  def price
    p = 0

    # door section
    p += door_section.price

    # door panel
    p += door_panel.price if door_panel

    # door glass
    p += door_glass.price if door_glass

    # section dimension
    p += door_panel_dimension.price

    p
  end
end
