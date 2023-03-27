# == Schema Information
#
# Table name: module_types
#
#  id         :integer          not null, primary key
#  name       :string(255)
#  gender     :string(255)
#  created_at :datetime
#  updated_at :datetime
#

class ModuleType < ApplicationRecord
  has_and_belongs_to_many :users
  translates :name
end
