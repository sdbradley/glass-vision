class CreateDoorPanelsDoorSections < ActiveRecord::Migration[7.0]
  def self.up
    create_table :door_panels_door_sections, if_not_exists: true do |t|
      t.integer :door_panel_id
      t.integer :door_section_id
    end
  end

  def self.down
    drop_table :door_panels_door_sections, if_exists: true
  end
end
