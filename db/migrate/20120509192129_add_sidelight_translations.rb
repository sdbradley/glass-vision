class AddSidelightTranslations < ActiveRecord::Migration[7.0]
  DATAFILE = __FILE__.gsub('.rb', '.sql')
  def self.up
    IO.readlines(DATAFILE).join.gsub("\r\n", "\n").split(";\n").each do |s|
      execute(s) unless s == "\n"
    end
  end

  def self.down
    execute 'delete from translations where id >= 506;'
  end

end
