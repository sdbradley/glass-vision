class QuotationLinesOpening < ApplicationRecord
  belongs_to :quotation_line
  belongs_to :opening

  validates :sort_order, presence: true
end
