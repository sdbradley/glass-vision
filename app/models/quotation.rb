class Quotation < ActiveRecord::Base
  has_many :quotation_lines, :dependent => :destroy

  validates_presence_of :project_name
end
