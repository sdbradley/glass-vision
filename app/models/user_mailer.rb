class UserMailer < ActionMailer::Base
  
  include TranslationGet
  def signup_notification(user)
    setup_email(user)
    @subject    += trn_get('ACCOUNT_NEEDS_ACTIVATION_SUBJECT')  
    @body[:url]  = "http://quotations.glass-vision.net/activate/#{user.activation_code}"
  end
  
  def activation_to_admin(user)
    @admin_user = User.get_administrator
    setup_email(@admin_user)
    @subject    += trn_get('ACCOUNT_ACTIVATED_ADMIN_SUBJECT')
    @body[:url]  = "http://quotations.glass-vision.net/users/edit/#{user.id}"    
    @body[:admin_user] = @admin_user
    @body[:user] = user
  end
  
  def activation(user)
    setup_email(user)
    @subject    += trn_get('ACCOUNT_ACTIVATED_SUBJECT')
    @body[:url]  = "http://quotations.glass-vision.net/"
  end
  
  def forgot_password(user)
    setup_email(user)
    @subject    += trn_get('ACCOUNT_CHANGE_PASSWORD_SUBJECT')
    @body[:url]  = "http://quotations.glass-vision.net/reset_password/#{user.password_reset_code}"
  end
 
  def reset_password(user)
    setup_email(user)
    @subject    += trn_get('ACCOUNT_PASSWORD_RESET_SUBJECT')
  end

  def email(from, email)
    @from        = from.email
    @subject     = "[Glass Vision] " + email.subject
    @sent_on     = Time.now
    @body[:text] = email.body

    if (from.has_role?("administrator"))
      @recipients = User.all.select {|u| !u.has_role?("administrator") }.map {|u| u.email}
    else
      @recipients = User.all.select {|u| u.has_role?("administrator") }.map {|u| u.email}
    end
  end


  protected
    def setup_email(user)
      @recipients  = "#{user.email}"
      @from        = "info@glass-vision.net"
      @subject     = "[Glass Vision] "
      @sent_on     = Time.now
      @body[:user] = user
    end
end
