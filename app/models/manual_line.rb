class ManualLine < ActiveRecord::Base
  belongs_to :quotation, :touch => true
end
