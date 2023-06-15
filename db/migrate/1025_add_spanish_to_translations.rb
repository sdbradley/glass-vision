class AddSpanishToTranslations < ActiveRecord::Migration[7.0]
  def self.up
    add_column :database_translations, :es, :text
    add_column :translations, :es, :text
  end

  def self.down
    remove_column :translations, :es
    remove_column :database_translations, :es
  end
end
