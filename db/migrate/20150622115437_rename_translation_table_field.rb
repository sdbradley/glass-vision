class RenameTranslationTableField < ActiveRecord::Migration
  def self.up
    rename_column :database_translations, :table, :translation_table_name
    rename_column :database_translation_fields, :table, :translation_table_name
  end

  def self.down
    rename_column :database_translations, :translation_table_name, :table
    rename_column :database_translation_fields, :translation_table_name, :table
  end
end
