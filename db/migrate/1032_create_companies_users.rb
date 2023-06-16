class CreateCompaniesUsers < ActiveRecord::Migration[7.0]
  def self.up
     create_table :companies_users, if_not_exists: true do |t|
          t.column :company_id, :integer
          t.column :user_id, :integer
      end
    end
    
  def self.down
    drop_table :companies_users, if_exists: true
  end
end
