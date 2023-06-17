class AddDoorOpeningToDoorLine < ActiveRecord::Migration[7.0]
  def self.up
    add_column :door_lines, :door_opening_id, :integer, if_not_exists: true
  end

  def self.down
    remove_column :door_lines, :door_opening_id, if_exists: true
  end
end
