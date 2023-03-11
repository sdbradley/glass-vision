# == Schema Information
#
# Table name: roles
#
#  id       :integer          not null, primary key
#  rolename :string(255)
#

class Role < ApplicationRecord
  has_many :permissions
  has_many :users, through: :permissions
  # has_many :super_users, :through => :permissions, :source => :user, :class_name => 'User', :conditions => "rolename='administrator'"
end
