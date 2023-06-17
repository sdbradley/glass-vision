class AddAttachmentPhotoToShape < ActiveRecord::Migration[7.0]
  def self.up
    add_column :shapes, :photo_file_name, :string, if_not_exists: true
    add_column :shapes, :photo_content_type, :string, if_not_exists: true
    add_column :shapes, :photo_file_size, :integer, if_not_exists: true
    add_column :shapes, :photo_updated_at, :datetime, if_not_exists: true
  end

  def self.down
    remove_column :shapes, :photo_file_name, if_exists: true
    remove_column :shapes, :photo_content_type, if_exists: true
    remove_column :shapes, :photo_file_size, if_exists: true
    remove_column :shapes, :photo_updated_at, if_exists: true
  end

end
