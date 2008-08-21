class StandardSizes < ActiveRecord::Base

  validates_length_of   :description, :within => 1..256, :allow_nil => true
  validates_presence_of :price

  validates_numericality_of :price, :greater_than_or_equal_to => 0
  
end