class UserMailer < ApplicationMailer
  include TranslationGet
  default from: 'info@glass-vision.net'

  def signup_notification(user)
    @user = user
    @url = activate_url(id: user.activation_code, host: 'quotations.glass-vision.net')
    mail(to: user.email, subject: "[Glass Vision] #{trn_get('ACCOUNT_NEEDS_ACTIVATION_SUBJECT')}")
  end

  def activation_to_admin(user)
    @admin_user = User.get_administrator.first
    @url  = edit_user_url(user.id, host: 'quotations.glass-vision.net')
    @user = user
    mail(to: @admin_user.email, subject: "[Glass Vision] #{trn_get('ACCOUNT_ACTIVATED_ADMIN_SUBJECT')}")
  end

  def activation(user)
    @url = root_url(host: 'quotations.glass-vision.net')
    @user = user
    mail(to: user.email, subject: "[Glass Vision] #{trn_get('ACCOUNT_ACTIVATED_SUBJECT')}")
  end

  def forgot_password(user)
    @url  = reset_password_url(id: user.password_reset_code, host: 'quotations.glass-vision.net')
    @user = user
    mail(to: user.email, subject: "[Glass Vision] #{trn_get('ACCOUNT_CHANGE_PASSWORD_SUBJECT')}")
  end

  def reset_password(user)
    @user = user
    mail(to: user.email, subject: "[Glass Vision] #{trn_get('ACCOUNT_PASSWORD_RESET_SUBJECT')}")
  end

  def email(from, email)
    @text = email.body

    @recipients = if from.has_role?('administrator')
                    User.all.reject { |u| u.has_role?('administrator') }.map(&:email).join(', ')
                  else
                    User.all.select { |u| u.has_role?('administrator') }.map(&:email).join(', ')
                  end
    mail(from: from.email, to: @recipients, subject: "[Glass Vision] #{email.subject}")
  end
end
