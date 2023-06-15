class PopulateDatabaseTranslationFields < ActiveRecord::Migration[7.0]
  def self.up
    File.open("db/migrate/025_database_translation_fields.sql").each_line { |line|
      execute line
    }
  end

  def self.down
    execute "TRUNCATE TABLE database_translation_fields;"
  end
end
