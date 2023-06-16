class RemoveIdFromCompaniesUsers < ActiveRecord::Migration[7.0]
  def self.up
    remove_column :companies_users, :id, if_exists: true
  end

  def self.down
    add_column :companies_users, :id, :integer, if_not_exists: true
  end
end
