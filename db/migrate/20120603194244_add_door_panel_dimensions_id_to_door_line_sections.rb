class AddDoorPanelDimensionsIdToDoorLineSections < ActiveRecord::Migration[7.0]
  def self.up
    add_column :door_line_sections, :door_panel_dimension_id, :integer, if_not_exists: true
  end

  def self.down
    remove_column :door_line_sections, :door_panel_dimension_id, if_exists: true
  end
end
