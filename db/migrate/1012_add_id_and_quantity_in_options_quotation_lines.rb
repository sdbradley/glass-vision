class AddIdAndQuantityInOptionsQuotationLines < ActiveRecord::Migration[7.0]
  def self.up
    add_column :options_quotation_lines, :quantity, :integer, :null => false, :default => 1, if_not_exists: true
  end

  def self.down
    remove_column :options_quotation_lines, :quantity, if_exists: true
  end
end
