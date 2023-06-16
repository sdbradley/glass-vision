class AddLogoUploadFields < ActiveRecord::Migration[7.0]
  def self.up
    rename_column :companies, :logo, :logo_file_name, if_exists: true
    add_column :companies, :logo_content_type, :string, if_not_exists: true # Mime type
    add_column :companies, :logo_file_size, :integer, if_not_exists: true # File size in bytes
  end

  def self.down
    rename_column :companies, :logo_file_name, :logo
    remove_column :companies, :logo_content_type
    remove_column :companies, :logo_file_size
  end
end
