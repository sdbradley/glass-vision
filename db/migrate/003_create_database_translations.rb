class CreateDatabaseTranslations < ActiveRecord::Migration[7.0]
  def self.up
    create_table :database_translations do |t|
      t.column :record_id,            :integer,                   :null => false
      t.column :table,                :string,    :limit => 50,   :null => false
      t.column :field,                :string,    :limit => 50,   :null => false
      t.column :fr,                   :text
    end
  end

  def self.down
    drop_table :database_translations
  end
end