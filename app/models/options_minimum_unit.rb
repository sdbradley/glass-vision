class OptionsMinimumUnit < ActiveRecord::Base
  translates :description, :comments
  accepts_nested_attributes_for :translations
end
