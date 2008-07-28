class Role < ActiveRecord::Base
  has_many :permissions
  has_many :users, :through => :permissions
  has_many :super_users, :through => :permissions, :source => :user, :class_name => 'User', :order => 'id DESC', :conditions => "rolename='administrator'"

 # the default admin is the user with role 'administrator' and lowest id
#  def self.get_administrator
#    self.roles.find_by_rolename('administrator')
#  end


  #def self.get_super_user
#    super_users.first
#  end  
end
