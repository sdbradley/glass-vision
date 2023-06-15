class AddPriceToDoorGlasses < ActiveRecord::Migration[7.0]
  def self.up
    add_column :door_glasses, :price, :float, :default => 0.0
  end

  def self.down
    remove_column :door_glasses, :price
  end
end
