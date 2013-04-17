class Audit < ActiveRecord::Base

  has_many :users

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
    Audit.create(:user_id => who.id, :action => what, :result => result, :reason => why )
  end
end
