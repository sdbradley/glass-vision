class OptionsQuotation < ActiveRecord::Base
  belongs_to :option
  belongs_to :quotation, touch: true

  after_find :update_original_price

  def has_price_override?
    unit_price != original_price
  end

  def update_original_price
    self.unit_price = option.price if unit_price.nil?
    self.original_price = unit_price if original_price.nil?
  end

  def compute_final_price
    if has_price_override?
      # if the price has been overridden do not apply the discount
      unit_price * (1 + (quotation.markup / 100.0))
    else
      unit_price * (1 - (quotation.discount / 100.0)) * (1 + (quotation.markup / 100.0))
    end
  end
end
