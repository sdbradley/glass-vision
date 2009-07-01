class CreateExistingCustomersFromQuotations < ActiveRecord::Migration
  def self.up
    quotations = Quotation.find(:all)
    quotations.each do |quotation| 
      Customer.create_from_quotation_if_new(quotation)
    end
  end

  def self.down
  end
end
