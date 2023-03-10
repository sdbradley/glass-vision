class DoorSection < ActiveRecord::Base
  include Priceable
  translates :name
  accepts_nested_attributes_for :translations

  has_and_belongs_to_many :door_panels

  def openable?
    %w[SL SLO].include? code
  end
end
