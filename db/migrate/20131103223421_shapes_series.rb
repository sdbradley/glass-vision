class ShapesSeries < ActiveRecord::Migration[7.0]
  def self.up
    create_table :series_shapes, if_not_exists: true do |t|
      t.references :shape, :null => false
      t.references :series, :null => false
    end

    add_index(:series_shapes, [:shape_id, :serie_id], :unique => false)

    all_shapes = Shape.all
    Serie.all.each do |s|
      s.shapes = all_shapes
      s.save
    end
  end

  def self.down
    drop_table :series_shapes, if_exists: true
  end
end
