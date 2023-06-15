class AddDoorBoringToDoorLine < ActiveRecord::Migration[7.0]
  def self.up
    add_column :door_lines, :door_boring_id, :integer
  end

  def self.down
    remove_column :door_lines, :door_boring_id
  end
end
