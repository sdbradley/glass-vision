# == Schema Information
#
# Table name: emails
#
#  id         :integer          not null, primary key
#  subject    :string(255)
#  body       :text
#  sent       :boolean
#  created_at :datetime
#  updated_at :datetime
#

require 'test_helper'

class EmailTest < ActiveSupport::TestCase
  # Replace this with your real tests.
  test "the truth" do
    assert true
  end
end
