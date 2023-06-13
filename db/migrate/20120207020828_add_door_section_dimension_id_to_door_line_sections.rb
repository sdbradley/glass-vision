class AddDoorSectionDimensionIdToDoorLineSections < ActiveRecord::Migration[7.0]
  def self.up
    add_column :door_line_sections, :door_section_dimension_id, :integer
  end

  def self.down
    remove_column :door_line_sections, :door_section_dimension_id
  end
end
