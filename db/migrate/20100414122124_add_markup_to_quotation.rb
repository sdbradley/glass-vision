class AddMarkupToQuotation < ActiveRecord::Migration[7.0]
  def self.up
    add_column :quotations, :markup, :float, :null => false, :default => 0
  end

  def self.down
    remove_column :quotations, :markup
  end
end
