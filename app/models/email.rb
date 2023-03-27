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

class Email < ApplicationRecord
end
