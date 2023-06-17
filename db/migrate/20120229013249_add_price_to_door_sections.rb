class AddPriceToDoorSections < ActiveRecord::Migration[7.0]
  def self.up
    add_column :door_sections, :price, :float, :default => 0.0, if_not_exists: true
  end

  def self.down
    remove_column :door_sections, :price, if_exists: true
  end
end
