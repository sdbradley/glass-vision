class CreateDoorLinesOptions < ActiveRecord::Migration[7.0]
  def self.up
    create_table :door_line_options, if_not_exists: true do |t|
      t.integer :door_line_id
      t.integer :option_id
      t.float :quantity
      t.timestamps
    end
  end

  def self.down
    drop_table :door_line_options, if_exists: true
  end
end
