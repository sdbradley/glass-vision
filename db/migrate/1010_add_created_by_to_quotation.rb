class AddCreatedByToQuotation < ActiveRecord::Migration[7.0]
  def self.up
    add_column :quotations, :user_id, :integer,  :null => true
  end

  def self.down
  	remove_column :quotations, :user_id
  end
end
