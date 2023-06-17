class AddLabelToOpenings < ActiveRecord::Migration[7.0]
  def self.up
    add_column :openings, :label, :string, if_not_exists: true
  end

  def self.down
    remove_column :openings, :label, if_exists: true
  end
end
