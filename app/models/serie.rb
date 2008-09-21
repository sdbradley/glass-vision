class Serie < ActiveRecord::Base
  include Translatable

  self.inheritance_column = "series_type"

  validates_presence_of :name
  validates_uniqueness_of :name

  has_many :widths, :order => "value"
  has_many :heights, :order => "value"
  has_many :quotation_lines, :dependent => :destroy
  has_and_belongs_to_many :options, :order => 'description'
  has_and_belongs_to_many :openings

  def standard_product?
    is_standard_product 
  end
end
