class ManualLine < ActiveRecord::Base
  belongs_to :quotation, :touch => true

  after_find :update_original_price


  def has_price_override?
    self.unit_price != self.original_price
  end

  def update_original_price
    self.original_price = self.unit_price if self.original_price.nil?
  end

  def compute_final_price
    if has_price_override?
      # if the price has been overridden do not apply the discount
      self.unit_price * (1 + self.quotation.markup / 100.0)
    else
      self.unit_price * (1 - self.quotation.discount / 100.0) * (1 + self.quotation.markup / 100.0)
    end
  end
end
