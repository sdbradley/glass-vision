class Customer < ActiveRecord::Base

  def self.create_from_quotation_if_new(quotation)
    # look for an existing customer record by name.
    # if no record found, create one.
    customer = find_by_name(quotation.customer_name)
    if (customer.nil?)
      customer = Customer.new
      customer.name = quotation.customer_name
      customer.address = quotation.customer_address 
      customer.phone = quotation.customer_phone
      customer.fax = quotation.customer_fax
      customer.email = quotation.customer_email
      customer.save
      true
    end
    false
  end

end
