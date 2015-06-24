class AddSecondaryDimensionToShape < ActiveRecord::Migration
  def self.up
    add_column :shapes, :has_secondary_dimension, :boolean
    add_column :quotation_lines, :secondary_height, :float, :default => 0.0, :null => false
  end

  def self.down
    remove_column :shapes, :has_secondary_dimension
    remove_column :quotation_lines, :secondary_height
  end
end
