class AddLabelInQuotationLines < ActiveRecord::Migration[7.0]
  def self.up
    add_column :quotation_lines, :label, :string, :limit => 255
  end

  def self.down
    remove_column :quotation_lines, :label
  end
end
