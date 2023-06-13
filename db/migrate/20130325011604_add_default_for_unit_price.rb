class AddDefaultForUnitPrice < ActiveRecord::Migration[7.0]
  def self.up
    change_column :manual_lines, :unit_price, :float, :default => 0.0
  end

  def self.down
    change_column_default(:manual_lines, :unit_price, nil)
  end
end
