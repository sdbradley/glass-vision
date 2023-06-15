class AddStandardProductTranslations < ActiveRecord::Migration[7.0]
  def self.up
    File.open("db/migrate/standard_product_translations.sql").each_line { |line|
      execute line unless line.empty?
    }
  end

  def self.down
    if RAILS_ENV == 'production'
      raise ActiveRecord::IrreversibleMigration, "Can't remove existing translations because they may have been modified by the user"
    else
      execute 'delete from translations where id >=378;'
    end
  end
end
