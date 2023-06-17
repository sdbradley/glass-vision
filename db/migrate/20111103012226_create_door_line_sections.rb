class CreateDoorLineSections < ActiveRecord::Migration[7.0]
  def self.up
    create_table :door_line_sections, if_not_exists: true do |t|
      t.integer :door_line_id
      t.integer :sort_order
      t.integer :door_section_id
      t.integer :door_panel_id
      t.integer :door_glass_id

      t.timestamps
    end
  end

  def self.down
    drop_table :door_line_sections, if_exists: true
  end
end
