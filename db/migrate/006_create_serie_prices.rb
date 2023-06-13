class CreateSeriePrices < ActiveRecord::Migration[7.0]
  def self.up
    create_table :serie_prices do |t|
      t.column :width_id,             :integer,                     :null => false
      t.column :height_id,            :integer,                     :null => false
      t.column :opening_id,           :integer,                     :null => false
      t.column :price,                :float,                       :null => false
    end
  end

  def self.down
    drop_table :dimensions
  end
end
