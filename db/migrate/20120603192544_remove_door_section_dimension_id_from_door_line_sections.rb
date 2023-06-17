class RemoveDoorSectionDimensionIdFromDoorLineSections < ActiveRecord::Migration[7.0]
  def self.up
    remove_column :door_line_sections, :door_section_dimension_id, if_exists: true
  end

  def self.down
    add_column :door_line_sections, :door_section_dimension_id, :integer, if_not_exists: true
  end
end
