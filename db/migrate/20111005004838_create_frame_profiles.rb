class CreateFrameProfiles < ActiveRecord::Migration[7.0]
  def self.up
    create_table :frame_profiles, if_not_exists: true do |t|
      t.string :name
      t.string :photo_file_name
      t.string :photo_content_type
      t.integer :photo_file_size

      t.timestamps
    end
  end

  def self.down
    drop_table :frame_profiles, if_exists: true
  end
end
