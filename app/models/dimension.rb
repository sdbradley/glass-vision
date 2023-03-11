class Dimension < ActiveRecord::Base
  belongs_to :series

  validates :serie_id, presence: true
  validates :value, presence: true
end
