class OptionCategory < ActiveRecord::Base
  include Translatable
  validates_presence_of :name
  validates_uniqueness_of :name

end
