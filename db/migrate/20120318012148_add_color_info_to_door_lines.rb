class AddColorInfoToDoorLines < ActiveRecord::Migration[7.0]
  def self.up
    add_column :door_lines, :exterior_color, :string, :null => true, if_not_exists: true
    add_column :door_lines, :interior_color, :string, :null => true, if_not_exists: true
    add_column :door_lines, :standard_interior_color_id, :integer, if_not_exists: true
    add_column :door_lines, :standard_exterior_color_id, :integer, if_not_exists: true
  end

  def self.down
    remove_column :door_lines, :standard_exterior_color_id, if_exists: true
    remove_column :door_lines, :standard_interior_color_id, if_exists: true
    remove_column :door_lines, :exterior_color, if_exists: true
    remove_column :door_lines, :interior_color, if_exists: true
  end
end
