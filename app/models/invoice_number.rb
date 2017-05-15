# == Schema Information
#
# Table name: invoice_numbers
#
#  id             :integer          not null, primary key
#  year           :integer
#  invoice_number :integer
#  created_at     :datetime
#  updated_at     :datetime
#

class InvoiceNumber < ActiveRecord::Base
  DEFAULT_INVOICE_NUMBER = 101

  def self.get_next_invoice_number
    year = Date.today.year
    last_invoice = nil
    ActiveRecord::Base.transaction do
      last_invoice = InvoiceNumber.where(:year => year).lock(true).first
      if last_invoice.nil?
        last_invoice = InvoiceNumber.new(:year => year, :invoice_number => DEFAULT_INVOICE_NUMBER)
      else
        last_invoice.invoice_number += 1
      end
      last_invoice.save
    end
    "#{year - 2000}-%.4d" % last_invoice.invoice_number
  end
end
