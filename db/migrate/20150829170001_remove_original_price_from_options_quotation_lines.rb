class RemoveOriginalPriceFromOptionsQuotationLines < ActiveRecord::Migration[7.0]
  def self.up
    remove_column :options_quotation_lines, :original_price
  end

  def self.down
    add_column :options_quotation_lines, :original_price, :float
  end
end
