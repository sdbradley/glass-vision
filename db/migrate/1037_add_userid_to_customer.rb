class AddUseridToCustomer < ActiveRecord::Migration[7.0]
  def self.up
    add_column :customers, :user_id, :integer
  end

  def self.down
    remove_column :customers, :user_id
  end
end
