class AddOriginalPriceToLineItems < ActiveRecord::Migration[7.0]
  def self.up
    add_column :quotation_lines, :original_price, :float, :null => true, :default => nil, if_not_exists: true
    add_column :door_lines, :original_price, :float, :null => true, :default => nil, if_not_exists: true
    add_column :options_quotation_lines, :original_price, :float, :null => true, :default => nil, if_not_exists: true
  end

  def self.down
    remove_column :options_quotation_lines, :original_price, if_exists: true
    remove_column :door_lines, :original_price, if_exists: true
    remove_column :quotation_lines, :original_price, if_exists: true
  end
end
