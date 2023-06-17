class AddSidelightsToShape < ActiveRecord::Migration[7.0]
  def self.up
    add_column :shapes, :has_left_sidelight, :boolean, :default => false, if_not_exists: true
    add_column :shapes, :has_right_sidelight, :boolean, :default => false, if_not_exists: true
  end

  def self.down
    remove_column :shapes, :has_left_sidelight, if_exists: true
    remove_column :shapes, :has_right_sidelight, if_exists: true
  end
end
