class AddDiscountToUser < ActiveRecord::Migration[7.0]
  def self.up
    add_column :users, :discount, :float, :default => 0.0, :null => true, if_not_exists: true
    # update existing rows here
    User.reset_column_information
    User.update_all("discount = 0.0")
    change_column :users, :discount, :float, :default => 0.0, :null => false
  end

  def self.down
  	remove_column :users, :discount, if_exists: true
  end

end
