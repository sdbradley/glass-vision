class CreateDoorCombinationsDoorOpenings < ActiveRecord::Migration[7.0]
  def self.up
    create_table :door_combinations_door_openings, if_not_exists: true do |t|
      t.integer :door_combination_id
      t.integer :door_opening_id
    end
  end

  def self.down
    drop_table :door_combinations_door_openings, if_exists: true
  end
end
