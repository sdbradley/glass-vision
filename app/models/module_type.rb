class ModuleType < ActiveRecord::Base
  has_and_belongs_to_many :users
  translates :name

end
