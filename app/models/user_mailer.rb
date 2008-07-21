class UserMailer < ActionMailer::Base
  
  include TranslationGet
  def signup_notification(user)
    setup_email(user)
    @subject    += trn_get('ACCOUNT_NEEDS_ACTIVATION_SUBJECT')
  
    @body[:url]  = "http://clients.snowmoonsoftware.com/inline/activate/#{user.activation_code}"
  
  end
  
  def activation(user)
    setup_email(user)
    @subject    += trn_get('ACCOUNT_ACTIVATED_SUBJECT')
    @body[:url]  = "http://clients.snowmoonsoftware.com/inline/"
  end
  
  def forgot_password(user)
    setup_email(user)
    @subject    += trn_get('ACCOUNT_CHANGE_PASSWORD_SUBJECT')
    @body[:url]  = "http://clients.snowmoonsoftware.com/inline/reset_password/#{user.password_reset_code}"
  end
 
  def reset_password(user)
    setup_email(user)
    @subject    += trn_get('ACCOUNT_PASSWORD_RESET_SUBJECT')
  end
  
  protected
    def setup_email(user)
      @recipients  = "#{user.email}"
      @from        = "jeff@snowmoonsoftware.com"
      @subject     = "[Glass Vision] "
      @sent_on     = Time.now
      @body[:user] = user
    end
end
