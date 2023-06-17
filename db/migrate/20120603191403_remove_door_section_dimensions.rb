class RemoveDoorSectionDimensions < ActiveRecord::Migration[7.0]
  def self.up
    drop_table :door_section_dimensions, if_exists: true
  end

  def self.down
    create_table :door_section_dimensions, if_not_exists: true do |t|
      t.integer :door_section_id
      t.float :value

      t.timestamps
    end
  end
end
