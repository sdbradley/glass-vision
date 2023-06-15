class AddOpeningsOpenable < ActiveRecord::Migration[7.0]
  def self.up
    add_column :openings, :openable, :boolean, :null => false, :default => false
  end

  def self.down
    remove_column :openings, :openable
  end
end
