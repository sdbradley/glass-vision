class AddFrameProfileToDoorLine < ActiveRecord::Migration[7.0]
  def self.up
    add_column :door_lines, :frame_profile_id, :integer, if_not_exists: true
  end

  def self.down
    remove_column :door_lines, :frame_profile_id, if_exists: true
  end
end
