class AddTaxNumbersToCompany < ActiveRecord::Migration[7.0]
  DATAFILE = __FILE__.gsub('.rb', '.sql')

  def self.up
    add_column :companies, :gst_number, :string, if_not_exists: true
    add_column :companies, :pst_number, :string, if_not_exists: true

    IO.readlines(DATAFILE).join.gsub("\r\n", "\n").split(";\n").each do |s|
      execute(s) unless s == "\n"
    end

  end

  def self.down
    remove_column :companies, :pst_number, if_exists: true
    remove_column :companies, :gst_number, if_exists: true
    execute 'delete from translations where id >= 494;'
  end
end
