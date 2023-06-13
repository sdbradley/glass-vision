class CreateQuotationLines < ActiveRecord::Migration[7.0]
  def self.up
    create_table :quotation_lines do |t|
      t.column :quotation_id,         :integer,       :null => false
      t.column :serie_id,             :integer,       :null => false
      t.column :shape_id,             :integer,       :null => false
      t.column :width,                :float,         :null => false
      t.column :height,               :float,         :null => false
      t.column :quantity,             :integer,       :null => false
      t.column :price,                :float,         :null => false
    end
  end

  def self.down
    drop_table :quotation_lines
  end
end
