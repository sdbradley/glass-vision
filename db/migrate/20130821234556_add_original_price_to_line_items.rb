class AddOriginalPriceToLineItems < ActiveRecord::Migration[7.0]
  def self.up
    add_column :quotation_lines, :original_price, :float, :null => true, :default => nil
    add_column :door_lines, :original_price, :float, :null => true, :default => nil
    add_column :options_quotation_lines, :original_price, :float, :null => true, :default => nil
  end

  def self.down
    remove_column :options_quotation_lines, :original_price
    remove_column :door_lines, :original_price
    remove_column :quotation_lines, :original_price
  end
end
