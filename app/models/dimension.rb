class Dimension < ApplicationRecord
  belongs_to :series

  validates :serie_id, presence: true
  validates :value, presence: true
end
