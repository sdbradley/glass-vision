class AddAttachmentPhotoToShape < ActiveRecord::Migration[7.0]
  def self.up
    add_column :shapes, :photo_file_name, :string
    add_column :shapes, :photo_content_type, :string
    add_column :shapes, :photo_file_size, :integer
    add_column :shapes, :photo_updated_at, :datetime
  end

  def self.down
    remove_column :shapes, :photo_file_name
    remove_column :shapes, :photo_content_type
    remove_column :shapes, :photo_file_size
    remove_column :shapes, :photo_updated_at
  end

end
