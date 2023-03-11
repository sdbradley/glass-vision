class SeriePrice < ActiveRecord::Base
  belongs_to :width
  belongs_to :height
  belongs_to :opening

  validates :width_id, :height_id, :price, :opening_id, presence: true
  validates :price, numericality: true

  def display_string
    "#{width.value} x #{height.value}"
  end
end
