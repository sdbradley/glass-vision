class AddPriceToDoorFrames < ActiveRecord::Migration[7.0]
  def self.up
    add_column :door_frames, :price, :float, :default => 0.0
  end

  def self.down
    remove_column :door_frames, :price
  end
end
