class AddOriginalPriceToManualLines < ActiveRecord::Migration
  def self.up
    add_column :manual_lines, :original_price, :float, :null => true, :default => nil
  end

  def self.down
    remove_column :manual_lines, :original_price
  end
end
