class QuotationObserver < ActiveRecord::Observer
  
  def after_create(quotation)
    QuotationMailer.deliver_created_notification(quotation)
  end
  
end
