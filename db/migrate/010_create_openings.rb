class CreateOpenings < ActiveRecord::Migration[7.0]
  def self.up
    create_table :openings do |t|
      t.column :name,                 :string,        :limit => 50,     :null => false
      t.column :abbreviation,         :string,        :limit => 5,      :null => false
    end
  end

  def self.down
    drop_table :openings
  end
end
