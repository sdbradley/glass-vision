class ShapesSeries < ActiveRecord::Migration
  def self.up
    create_table :series_shapes, :id => false do |t|
      t.references :shape, :null => false
      t.references :serie, :null => false
    end

    add_index(:series_shapes, [:shape_id, :serie_id], :unique => false)

    all_shapes = Shape.all
    Serie.all.each do |s|
      s.shapes = all_shapes
      s.save
    end
  end

  def self.down
    drop_table :series_shapes
  end
end
