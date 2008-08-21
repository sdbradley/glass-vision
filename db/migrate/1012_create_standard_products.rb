class CreateStandardProducts < ActiveRecord::Migration
  def self.up
    # standard sized products are of a fixed price and defined 
    # like so: "72x80 Solid Wood Frame", "$1000"
    create_table :standard_sizes do |t|
      t.column :description, :string, :limit => 256, :default => "",  :null => false
      t.column :price,      :float,        :default => 0.0, :null => false
    end
    
    # sheet size goods must be within certain constrained sizes
    # this table is the definition of a particular sheet 
    create_table :sheet_sizes do |t|
      t.column :description, :string, :limit => 256, :default => "",  :null => false
      t.column :minimum_width, :integer, :default => 0, :null => false
      t.column :maximum_width, :integer, :default => 0, :null => false
      t.column :minimum_height, :integer, :default => 0, :null => false
      t.column :maximum_height, :integer, :default => 0, :null => false
      t.column :price,      :float,        :default => 0.0, :null => false
      t.column :sheet_product_id, :integer, :null => false
    end

    # these columns link a series to the new sized products    
    add_column :series, :standard_size_id, :integer,  :null => true
    add_column :series, :sheet_size_id, :integer, :null => true;
    add_column :series, :series_type, :text, :limit => 32
    
    # these columns link a quotation_line to the new products
    add_column :quotation_lines, :standard_size_id, :integer, :null => true
    
    # don't need a column for sheet_size as it's defined when the line is added in the quotation line itself
    
    # now modify all existing Series to set type as 'Serie' -- might change this later to CustomProduct
    ## not neccesary if Serie is the base class -- only needed if record type is not same as table name
#    say_with_time "Updating existing series" do
#      Serie.reset_column_information
#      Serie.find(:all).each do |s|
#        s.update_attribute :series_type, 'Serie'
#      end
#    end
  end

  def self.down
    # remove tables
    drop_table :standard_sizes
    drop_table :sheet_sizes

    #remove columns
    remove_column :series, :standard_size_id
    remove_column :series, :sheet_size_id
    remove_column :series, :series_type
  
    remove_column :quotation_lines, :standard_size_id
    
  end
end
