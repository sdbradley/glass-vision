class AddMultiSelToOptionCategories < ActiveRecord::Migration
  def self.up
    add_column :option_categories, :multiselect, :boolean
  end

  def self.down
    remove_column :option_categories, :multiselect
  end
end
