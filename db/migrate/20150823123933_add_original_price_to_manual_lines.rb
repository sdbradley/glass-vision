class AddOriginalPriceToManualLines < ActiveRecord::Migration[7.0]
  def self.up
    add_column :manual_lines, :original_price, :float, :null => true, :default => nil
  end

  def self.down
    remove_column :manual_lines, :original_price
  end
end
