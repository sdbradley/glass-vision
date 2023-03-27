class SeriePrice < ApplicationRecord
  belongs_to :width
  belongs_to :height
  belongs_to :opening

  validates :price, presence: true
  validates :price, numericality: true

  def display_string
    "#{width.value} x #{height.value}"
  end
end
