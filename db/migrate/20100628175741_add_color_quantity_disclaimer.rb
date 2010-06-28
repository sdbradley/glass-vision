class AddColorQuantityDisclaimer < ActiveRecord::Migration
  DATAFILE = __FILE__.gsub('.rb', '.sql')

  LAST_TRANSLATION_ID = 483
  def self.up
    IO.readlines(DATAFILE).join.gsub("\r\n", "\n").split(";\n").each do |s|
      execute(s) unless s == "\n"
    end
  end

  def self.down
    if RAILS_ENV == 'production'
      raise ActiveRecord::IrreversibleMigration, "Can't remove existing translations because they may have been modified by the user"
    else
      execute 'delete from translations where id > 483;'
    end
  end
end
