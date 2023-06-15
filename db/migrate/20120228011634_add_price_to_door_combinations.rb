class AddPriceToDoorCombinations < ActiveRecord::Migration[7.0]
  def self.up
    add_column :door_combinations, :price, :float, :default => 0.0
  end

  def self.down
    remove_column :door_combinations, :price
  end
end
