class AddPricesToOptionsQuotations < ActiveRecord::Migration[7.0]
  def self.up
    add_column :options_quotations, :unit_price, :float, if_not_exists: true
    add_column :options_quotations, :original_price, :float, if_not_exists: true
  end

  def self.down
    remove_column :options_quotations, :original_price, if_exists: true
    remove_column :options_quotations, :unit_price, if_exists: true
  end
end
