class AddLabelToOpenings < ActiveRecord::Migration
  def self.up
    add_column :openings, :label, :string
  end

  def self.down
    remove_column :openings, :label
  end
end
