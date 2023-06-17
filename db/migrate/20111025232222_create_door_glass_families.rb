class CreateDoorGlassFamilies < ActiveRecord::Migration[7.0]
  def self.up
    create_table :door_glass_families, if_not_exists: true do |t|
      t.string :name

      t.timestamps
    end
  end

  def self.down
    drop_table :door_glass_families, if_exists: true
  end
end
