class CreateShapes < ActiveRecord::Migration[7.0]
  def self.up
    create_table :shapes do |t|
      t.column :name,                 :string,        :limit => 50,     :null => false
      t.column :sections_width,       :integer,                         :null => false
      t.column :sections_height,      :integer,                         :null => false
    end
  end

  def self.down
    drop_table :shapes
  end
end
