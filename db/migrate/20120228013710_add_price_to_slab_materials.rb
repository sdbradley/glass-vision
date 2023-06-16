class AddPriceToSlabMaterials < ActiveRecord::Migration[7.0]
  def self.up
    add_column :slab_materials, :price, :float, :default => 0.0, if_not_exists: true
  end

  def self.down
    remove_column :slab_materials, :price, if_exists: true
  end
end
