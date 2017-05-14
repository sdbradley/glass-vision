# == Schema Information
#
# Table name: roles
#
#  id       :integer          not null, primary key
#  rolename :string(255)
#

require File.dirname(__FILE__) + '/../test_helper'

class RoleTest < Test::Unit::TestCase
  fixtures :roles

  # Replace this with your real tests.
  def test_truth
    assert true
  end
end
