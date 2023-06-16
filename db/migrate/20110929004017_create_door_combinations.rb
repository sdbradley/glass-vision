class CreateDoorCombinations < ActiveRecord::Migration[7.0]
  def self.up
    create_table :door_combinations, if_not_exists: true do |t|
      t.string :name
      t.string :sections
      t.string :preview_image_name
      t.integer :door_frame_id

      t.timestamps
    end
  end

  def self.down
    drop_table :door_combinations
  end
end
