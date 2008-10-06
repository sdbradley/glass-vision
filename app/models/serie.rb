class Serie < ActiveRecord::Base
  include Translatable

  #self.inheritance_column = "series_type"

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
end
