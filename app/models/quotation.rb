class Quotation < ActiveRecord::Base
  has_many :quotation_lines, :dependent => :destroy
  has_many :options_quotations, :dependent => :destroy
  belongs_to  :user

  validates_presence_of :project_name

  def use_billing_address?
    if (customer_address.nil? || delivery_address.nil?)
     return false
    end

   return customer_address == delivery_address
  end

end
