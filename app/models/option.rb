class Option < ActiveRecord::Base
  include Translatable

  belongs_to :pricing_method
  belongs_to :options_minimum_unit
  has_and_belongs_to_many :series, :class_name => 'Serie' # :class_name should not be here, but 'series'.singularize = 'series' for rails, which is not correct
  has_many :options_quotation_lines
  has_many :options_quotations

  has_and_belongs_to_many :option_categories
#  has_many :option_categories, :class_name => "OptionCategory", :foreign_key => "option_category_id", :through => "option_categories_options"
#  belongs_to :option_categories

  validates_presence_of :description, :pricing_method_id, :price
  validates_numericality_of :price
  
  
  # find all options that are assigned to a category
#   o = Option.find(:all, :include => :option_categories, :conditions =>['not ISNULL(option_categories_options.option_category_id)'])
  # find all options that are NOT assigned to a category
#   o = Option.find(:all, :include => :option_categories, :conditions =>['ISNULL(option_categories_options.option_category_id)'])


  
  # returns true if this option has been assigned to any categories
  def categorized?
    !option_categories.empty?
  end
end
