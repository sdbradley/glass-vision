class CreateOptionsQuotationLines < ActiveRecord::Migration[7.0]
  def self.up
    create_table :options_quotation_lines do |t|
      t.column :option_id,                   :integer,       :null => false
      t.column :quotation_line_id,           :integer,       :null => false
    end
  end

  def self.down
    drop_table :options_quotation_lines
  end
end
