require 'digest/sha1'
class User < ApplicationRecord
  # Virtual attribute for the unencrypted password
  attr_accessor :password

  validates :login, length: { within: 3..40 }
  validates :login, :email, presence: true
  validates :login, :email, uniqueness: { case_sensitive: false }
  validates :password, presence: { if: :password_required? }
  validates :password, length: { within: 4..40, if: :password_required? }
  validates :password, confirmation: { if: :password_required? }
  validates :password_confirmation, presence: { if: :password_required? }
  validates :email, length: { within: 3..100 }
  validates :email, format: { with: /(^([^@\s]+)@((?:[-_a-z0-9]+\.)+[a-z]{2,})$)|(^$)/i }
  validates :discount, presence: true
  validates :discount, numericality: true
  validates :discount, inclusion: { in: 0..100, message: 'must be between 0 and 100' }

  before_save :encrypt_password
  before_create :make_activation_code

  # add relationships for roles and users
  has_many :permissions, dependent: :destroy
  has_many :roles, through: :permissions
  has_many :quotations
  has_many :customers
  has_and_belongs_to_many :companies
  has_and_belongs_to_many :module_types

  scope :enabled, lambda {
    where(enabled: true)
  }

  # prevents a user from submitting a crafted form that bypasses activation
  # anything else you want your user to change should be added here.
  # attr_accessible :login, :email, :password, :password_confirmation, :discount

  

  before_create :set_company

  def set_company
    return unless companies.empty?

    companies << Company.find_or_create_by!(name: 'Glass Vision')
  end

  #
  # Raises:
  #  +User::ActivationCodeNotFound+ if there is no user with the corresponding activation code
  #  +User::AlreadyActivated+ if the user with the corresponding activation code has already activated their account
  def self.find_and_activate!(activation_code)
    raise ArgumentError if activation_code.nil?

    user = find_by(activation_code: activation_code)
    raise ActivationCodeNotFound if user.nil?
    raise AlreadyActivated, user if user.active?

    user.send(:activate!)
    user
  end

  # Authenticates a user by their login name and unencrypted password.  Returns the user or nil.
  def self.authenticate(login, password)
    u = User.where(login: login).first # need to get the salt
    is_authenticated = u&.authenticated?(password)
    Audit.write_audit(u, 'login', 'Failure', 'invalid credentials') if u && !is_authenticated
    is_authenticated ? u : nil
  end

  # Encrypts some data with the salt.
  def self.encrypt(password, salt)
    Digest::SHA1.hexdigest("--#{salt}--#{password}--")
  end

  def self.find_for_forget(email)
    User.where('email = ? and activated_at IS NOT NULL', email).first
  end

  def self.get_administrator
    @administrators = User.joins('INNER JOIN permissions on permissions.user_id = users.id INNER JOIN roles on roles.id = permissions.role_id').select('users.*').order('id ASC')
  end
  private_class_method(:get_administrator)

  def active?
    # the existence of an activation code means they have not activated yet
    activation_code.nil?
  end

  # Encrypts the password with the user salt
  def encrypt(password)
    self.class.encrypt(password, salt)
  end

  def authenticated?(password)
    crypted_password == encrypt(password)
  end

  def remember_token?
    remember_token_expires_at && Time.now.utc < remember_token_expires_at
  end

  # These create and unset the fields required for remembering users between browser closes
  def remember_me
    remember_me_for 2.weeks
  end

  def remember_me_for(time)
    remember_me_until time.from_now.utc
  end

  def remember_me_until(time)
    self.remember_token_expires_at = time
    self.remember_token            = encrypt("#{email}--#{remember_token_expires_at}")
    save(validate: false)
  end

  def forget_me
    self.remember_token_expires_at = nil
    self.remember_token            = nil
    save!
  end

  # Returns true if the user has just been activated.
  def recently_activated?
    @activated
  end

  def forgot_password
    @forgotten_password = true
    make_password_reset_code
  end

  def reset_password
    # First update the password_reset_code before setting the
    # reset_password flag to avoid duplicate email notifications.
    update_attribute(:password_reset_code, nil)
    @reset_password = true
  end

  # used in user_observer
  def recently_forgot_password?
    @forgotten_password
  end

  def recently_reset_password?
    @reset_password
  end

  def has_role?(rolename)
    roles.find_by(rolename: rolename) ? true : false
  end

  def admin?
    has_role?('administrator')
  end

  def active_companies
    if admin?
      Company.order('name asc')
    else
      companies
    end
  end

  def can_create?(module_name)
    I18n.with_locale(:en) do
      return module_types.collect(&:name).include?(module_name)
    end
  end

  protected

  # before filter
  def encrypt_password
    return if password.blank?

    self.salt = Digest::SHA1.hexdigest("--#{Time.zone.now}--#{login}--") if new_record?
    self.crypted_password = encrypt(password)
  end

  def password_required?
    crypted_password.blank? || password.present?
  end

  def make_activation_code
    self.activation_code = Digest::SHA1.hexdigest(Time.zone.now.to_s.chars.sort_by { rand }.join)
  end

  def make_password_reset_code
    self.password_reset_code = Digest::SHA1.hexdigest(Time.zone.now.to_s.chars.sort_by { rand }.join)
  end

private

  def activate!
    update(activated_at: Time.now.utc)
  end

  class ActivationCodeNotFound < StandardError; end

  class AlreadyActivated < StandardError
    attr_reader :user, :message

    def initialize(user, message = nil)
      @message = message
      @user = user
    end
  end
end
