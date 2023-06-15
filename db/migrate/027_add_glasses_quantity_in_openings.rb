class AddGlassesQuantityInOpenings < ActiveRecord::Migration[7.0]
  def self.up
    add_column :openings, :glasses_quantity, :integer, :null => false, :default => 1
  end

  def self.down
    remove_column :openings, :glasses_quantity
  end
end
