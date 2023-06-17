class AddSlugToQuotation < ActiveRecord::Migration[7.0]
  def self.up
    add_column :quotations, :slug, :string, if_not_exists: true
    execute("UPDATE quotations set slug=id;")
    add_index :quotations, [:slug], :name => "quotations_slug_index", :unique => true
  end

  def self.down
    remove_index :quotations, :slug
    remove_column :quotations, :slug, if_exists: true
  end
end
