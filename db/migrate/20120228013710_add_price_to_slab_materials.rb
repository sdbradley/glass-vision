class AddPriceToSlabMaterials < ActiveRecord::Migration[7.0]
  def self.up
    add_column :slab_materials, :price, :float, :default => 0.0
  end

  def self.down
    remove_column :slab_materials, :price
  end
end
