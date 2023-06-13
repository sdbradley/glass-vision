class AddMultiSelToOptionCategories < ActiveRecord::Migration[7.0]
  def self.up
    add_column :option_categories, :multiselect, :boolean
    execute 'update option_categories set multiselect=true;'
  end

  def self.down
    remove_column :option_categories, :multiselect
  end
end
