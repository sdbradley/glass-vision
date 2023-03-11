class QuotationLinesOpening < ActiveRecord::Base
  belongs_to :quotation_line
  belongs_to :opening

  validates :opening_id, :sort_order, presence: true
end
