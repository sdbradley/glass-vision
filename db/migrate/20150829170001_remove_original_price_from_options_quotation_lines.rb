class RemoveOriginalPriceFromOptionsQuotationLines < ActiveRecord::Migration[7.0]
  def self.up
    remove_column :options_quotation_lines, :original_price, if_exists: true
  end

  def self.down
    add_column :options_quotation_lines, :original_price, :float, if_not_exists: true
  end
end
