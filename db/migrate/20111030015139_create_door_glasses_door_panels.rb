class CreateDoorGlassesDoorPanels < ActiveRecord::Migration[7.0]
  def self.up
    create_table :door_glasses_door_panels, if_not_exists: true do |t|
      t.integer :door_glass_id
      t.integer :door_panel_id
    end
  end

  def self.down
    drop_table :door_glasses_door_panels, if_exists: true
  end
end
