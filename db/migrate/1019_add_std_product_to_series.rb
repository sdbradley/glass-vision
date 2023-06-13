class AddStdProductToSeries < ActiveRecord::Migration[7.0]
  def self.up
    add_column :series, :is_standard_product, :boolean,  :default => false    
  end

  def self.down
    remove_column :series, :is_standard_product
  end
end
