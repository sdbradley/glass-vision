class CreateDoorLines < ActiveRecord::Migration[7.0]
  def self.up
    create_table :door_lines, if_not_exists: true do |t|
      t.integer :quotation_id
      t.integer :door_frame_id
      t.integer :quantity
      t.float :price

      t.timestamps
    end
  end

  def self.down
    drop_table :door_lines
  end
end
