class OptionsQuotationLine < ActiveRecord::Base
  belongs_to :option
  belongs_to :quotation_line
end
