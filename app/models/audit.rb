# == Schema Information
#
# Table name: audits
#
#  id         :integer          not null, primary key
#  user_id    :integer
#  action     :string(255)
#  result     :string(255)
#  reason     :string(255)
#  created_at :datetime
#

class Audit < ActiveRecord::Base
  belongs_to :user

  def readonly?
    !new_record?
  end

  def before_destroy
    raise ActiveRecord::ReadOnlyRecord
  end

  # write an audit record
  #      t.integer :user_id
  #      t.string :action
  #      t.string :result
  #      t.string :reason
  def self.write_audit(who, what, result, why = nil)
    Audit.create(user_id: who.id, action: what, result: result, reason: why)
  end
end
