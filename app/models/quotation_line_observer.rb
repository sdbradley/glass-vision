class QuotationLineObserver < ActiveRecord::Observer
  def after_save(line)
    line.quotation.update_attribute(:updated_at, Time.zone.now)
  end
end
