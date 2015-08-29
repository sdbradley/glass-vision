class AddPricesToOptionsQuotations < ActiveRecord::Migration
  def self.up
    add_column :options_quotations, :unit_price, :float
    add_column :options_quotations, :original_price, :float
  end

  def self.down
    remove_column :options_quotations, :original_price
    remove_column :options_quotations, :unit_price
  end
end
