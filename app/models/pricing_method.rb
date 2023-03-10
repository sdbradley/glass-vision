class PricingMethod < ActiveRecord::Base
  PRICING_METHODS = [
    PER_SQ_FOOT = 1,
    PER_PERIMETER_FOOT = 2,
    PER_SECTION = 3,
    PER_OPENABLE_SECTION = 4,
    PER_FIXED_SECTION = 5,
    UNIT_PRICE = 6, # maybe PER_EACH is better?
    PER_CORNER = 7,
    PER_TOTAL_WIDTH = 8
  ]

  translates :comments, :description
  accepts_nested_attributes_for :translations

  has_many :options
end
