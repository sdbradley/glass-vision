class Serie < ActiveRecord::Base
  include Translatable

  validates_presence_of :name
  validates_uniqueness_of :name

  has_many :widths, :order => "value"
  has_many :heights, :order => "value"
  has_many :quotation_lines, :dependent => :destroy
  has_and_belongs_to_many :options, :order => 'description'
  has_and_belongs_to_many :openings

  def standard_product?
    series_type == "StandardProduct" 
  end
  
  def priced_by_area?
    series_type == "PerSqFtProduct"
  end
  
  def self.categorize_options(options)
     # take the list of options, and rearrange it to be organized by category.
     # lets do this with a hash of hashes
     categorized_options = {}
     options.each { |opt| 
        opt.option_categories.each { |cat|
          cat_name = cat.tr_name
          categorized_options[cat_name] ||= []
          categorized_options[cat_name] << opt
          }
     }
     categorized_options
   end
end
