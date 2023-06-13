class CreateOptionsSeries < ActiveRecord::Migration[7.0]
  def self.up
    create_table :options_series, :id => false do |t|
      t.column :option_id,          :integer,       :null => false
      t.column :serie_id,           :integer,       :null => false
    end
  end

  def self.down
    drop_table :options_series
  end
end
