class AddConsultantToQuotation < ActiveRecord::Migration
  DATAFILE = __FILE__.gsub('.rb', '.sql')

  LAST_TRANSLATION_ID = 485

  def self.up
    add_column :quotations, :consultant_id, :integer, :null => false, :default => 10
    IO.readlines(DATAFILE).join.gsub("\r\n", "\n").split(";\n").each do |s|
      execute(s) unless s == "\n"
    end
  end

  def self.down
    remove_column :quotations, :consultant_id
    execute 'delete from translations where id >= 485;'
  end
end
