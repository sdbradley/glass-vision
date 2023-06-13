class CreateOpeningsSeries < ActiveRecord::Migration[7.0]
  def self.up
    create_table :openings_series, :id => false do |t|
      t.column :opening_id,         :integer,       :null => false
      t.column :serie_id,           :integer,       :null => false
    end
  end

  def self.down
    drop_table :openings_series
  end
end
