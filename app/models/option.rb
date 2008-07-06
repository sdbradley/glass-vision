class Option < ActiveRecord::Base
  include Translatable

  belongs_to :pricing_method
  belongs_to :options_minimum_unit
  has_and_belongs_to_many :series, :class_name => 'Serie' # :class_name should not be here, but 'series'.singularize = 'series' for rails, which is not correct
  has_and_belongs_to_many :quotation_lines

  validates_presence_of :description, :pricing_method_id, :price
end
