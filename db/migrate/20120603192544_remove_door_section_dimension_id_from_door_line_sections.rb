class RemoveDoorSectionDimensionIdFromDoorLineSections < ActiveRecord::Migration[7.0]
  def self.up
    remove_column :door_line_sections, :door_section_dimension_id
  end

  def self.down
    add_column :door_line_sections, :door_section_dimension_id, :integer
  end
end
