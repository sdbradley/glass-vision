class CreateStandardProducts < ActiveRecord::Migration[7.0]
  def self.up
    # these columns link a series to the new sized products    
    add_column :series, :series_type,      :text, :limit => 32
  end

  def self.down
    remove_column :series, :series_type  
  end
end
