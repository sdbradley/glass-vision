class AddNotes < ActiveRecord::Migration[7.0]
  def self.up
	add_column :quotations, :notes, :text
  end

  def self.down
  	remove_column :quotations, :notes
  end
end
