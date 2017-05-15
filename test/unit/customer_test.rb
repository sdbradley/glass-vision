# == Schema Information
#
# Table name: customers
#
#  id         :integer          not null, primary key
#  name       :string(150)      not null
#  address    :string(200)
#  phone      :string(50)
#  fax        :string(50)
#  email      :string(50)
#  created_at :datetime
#  updated_at :datetime
#  user_id    :integer
#

require File.dirname(__FILE__) + '/../test_helper'

class CustomerTest < Test::Unit::TestCase
  fixtures :customers

  # Replace this with your real tests.
  def test_truth
    assert true
  end
end
