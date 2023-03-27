class OptionsMinimumUnit < ApplicationRecord
  translates :description, :comments
  accepts_nested_attributes_for :translations
end
