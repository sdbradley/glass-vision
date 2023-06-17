class AddDimensionsToFrameProfiles < ActiveRecord::Migration[7.0]
  def self.up
    add_column :frame_profiles, :width, :float, :default => 0.0, if_not_exists: true
    add_column :frame_profiles, :separator_width, :float, :default => 0.0, if_not_exists: true
    add_column :frame_profiles, :gap, :float, :default => 0.0, if_not_exists: true
  end

  def self.down
    remove_column :frame_profiles, :width, if_exists: true
    remove_column :frame_profiles, :separator_width, if_exists: true
    remove_column :frame_profiles, :gap, if_exists: true
  end
end
