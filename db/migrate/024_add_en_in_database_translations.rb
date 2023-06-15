class AddEnInDatabaseTranslations < ActiveRecord::Migration[7.0]
  def self.up
    add_column :database_translations, :en, :text
  end

  def self.down
    remove_column :database_translations, :en
  end
end
