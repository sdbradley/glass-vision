class CreateQuotations < ActiveRecord::Migration[7.0]
  def self.up
    create_table :quotations do |t|
      t.column :description,          :string,      :limit => 50,       :null => false
      t.column :comments,             :text
    end
  end

  def self.down
    drop_table :quotations
  end
end
