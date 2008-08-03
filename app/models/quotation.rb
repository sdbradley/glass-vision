class Quotation < ActiveRecord::Base
  has_many :quotation_lines, :dependent => :destroy
  belongs_to  :user

  validates_presence_of :project_name
end
