class AddFrameProfileToDoorLine < ActiveRecord::Migration[7.0]
  def self.up
    add_column :door_lines, :frame_profile_id, :integer
  end

  def self.down
    remove_column :door_lines, :frame_profile_id
  end
end
