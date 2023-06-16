class CreateQuotationLinesOpenings < ActiveRecord::Migration[7.0]
  def self.up
    create_table :quotation_lines_openings do |t|
      t.column :quotation_line_id,              :integer,             :null => false
      t.column :opening_id,                     :integer,             :null => false
      t.column :sort_order,                     :integer,             :null => false
    end
  end

  def self.down
    drop_table :quotation_lines_openings
  end
end
