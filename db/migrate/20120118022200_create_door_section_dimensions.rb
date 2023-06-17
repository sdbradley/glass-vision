class CreateDoorSectionDimensions < ActiveRecord::Migration[7.0]
  def self.up
    create_table :door_section_dimensions, if_not_exists: true do |t|
      t.integer :door_section_id
      t.float :value

      t.timestamps
    end
  end

  def self.down
    drop_table :door_section_dimensions, if_exists: true
  end
end
