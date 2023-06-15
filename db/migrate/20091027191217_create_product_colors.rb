class CreateProductColors < ActiveRecord::Migration[7.0]
  def self.up
    create_table :product_colors do |t|
      t.string :name
      t.string :value

      t.timestamps
    end
  end

  def self.down
    drop_table :product_colors
  end
end
