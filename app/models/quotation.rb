class Quotation < ActiveRecord::Base
  has_many :quotation_lines, :dependent => :destroy
  has_many :options_quotations, :dependent => :destroy
  belongs_to  :user

  validates_presence_of :project_name
end
