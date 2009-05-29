class QuotationMailer < ActionMailer::Base
  include TranslationGet

  def created_notification(quotation, sent_at = Time.now)
    @admin_user = User.get_administrator
    recipients    @admin_user.email
    from          "info@glass-vision.net"
    subject       "[Glass Vision] #{trn_get('SUBJECT_NEW_QUOTATION_CREATED')}"
    body          :user => quotation.user, :admin_user => @admin_user,
                  :url => url_for(:host => "quotations.glass-vision.net", :controller => "quotation", :action => "show", :id => quotation.id)
    
    content_type = "text/html"
  end
  
end
