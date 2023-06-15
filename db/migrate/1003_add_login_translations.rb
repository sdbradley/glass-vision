class AddLoginTranslations < ActiveRecord::Migration[7.0]
  def self.up
    File.open("db/migrate/login-translations.sql").each_line { |line|
      execute line
    }
  end

  def self.down
    raise ActiveRecord::IrreversibleMigration, "Can't remove existing translations because they may have been modified by the user"
  end
end
