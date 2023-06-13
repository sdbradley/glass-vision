class CreateDatabaseTranslationFields < ActiveRecord::Migration[7.0]
  def self.up
    create_table :database_translation_fields do |t|
      t.column :table,                :string,    :limit => 50,   :null => false
      t.column :field,                :string,    :limit => 50,   :null => false
    end
  end

  def self.down
    drop_table :database_translation_fields
  end
end