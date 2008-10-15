class AddViewFromOutsideTranslations < ActiveRecord::Migration
  def self.up
 	  execute("INSERT INTO `translations` VALUES (383, 'MSG_VIEW_FROM_OUTSIDE', 'Vue de l\'extérieur', '', 'View from outside');")
 end

  def self.down
    if RAILS_ENV == 'production'
      raise ActiveRecord::IrreversibleMigration, "Can't remove existing translations because they may have been modified by the user"
    else
      execute 'delete from translations where id = 383;'
    end
  end
end
