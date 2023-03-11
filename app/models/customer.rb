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

class Customer < ActiveRecord::Base
  belongs_to :user

  def self.create_from_quotation_if_new(quotation)
    # look for an existing customer record by name.
    # if no record found, create one.
    return false if quotation.customer_name.nil? || quotation.customer_name.blank?

    customer = find_by_name(quotation.customer_name)
    if customer.nil?
      customer = Customer.new
      customer.name = quotation.customer_name
      customer.address = quotation.customer_address if quotation.customer_address.present?
      customer.phone = quotation.customer_phone if quotation.customer_phone.present?
      customer.fax = quotation.customer_fax if quotation.customer_fax.present?
      customer.email = quotation.customer_email if quotation.customer_email.present?
      customer.save
      true
    else
      false
    end
  end
end
