class AddDatesToQuotation < ActiveRecord::Migration[7.0]
  def self.up  
    add_column :quotations, :created_at, :datetime
    add_column :quotations, :updated_at, :datetime
  end

  def self.down
    remove_column :quotations, :updated_at
    remove_column :quotations, :created_at
  end
end
