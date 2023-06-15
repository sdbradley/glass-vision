class AddLabelToOpenings < ActiveRecord::Migration[7.0]
  def self.up
    add_column :openings, :label, :string
  end

  def self.down
    remove_column :openings, :label
  end
end
