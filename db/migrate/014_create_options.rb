class CreateOptions < ActiveRecord::Migration[7.0]
  def self.up
    create_table :options do |t|
      t.column :description,          :string,      :limit => 50,       :null => false
      t.column :comments,             :text
      t.column :pricing_method_id,    :integer,     :null => false
      t.column :price,                :float,       :null => false
    end
  end

  def self.down
    drop_table :options
  end
end
