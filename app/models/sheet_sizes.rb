class SheetSizes < ActiveRecord::Base

  validates_presence_of :minimum_width
  validates_presence_of :maximum_width
  validates_presence_of :minimum_height
  validates_presence_of :maximum_height
  validates_length_of   :description, :within => 1..256, :allow_nil => true
  validates_presence_of :price

  validates_numericality_of :minimum_width, :greater_than_or_equal_to => 0
  validates_numericality_of :maximum_width, :greater_than_or_equal_to => 0
  validates_numericality_of :minimum_height, :greater_than_or_equal_to => 0
  validates_numericality_of :maximum_height, :greater_than_or_equal_to => 0
  validates_numericality_of :price, :greater_than_or_equal_to => 0
  
protected  
  def validate
     errors.add(:maximum_width, "must be greater than minimum width")if !maximum_width.blank? and !minimum_width.blank? and minimum_width > maximum_width

     errors.add(:maximum_height, "must be greater than minimum height") if !maximum_height.blank? and !minimum_height.blank? and minimum_height > maximum_height

  end

  
end