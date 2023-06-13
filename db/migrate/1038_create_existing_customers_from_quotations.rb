class CreateExistingCustomersFromQuotations < ActiveRecord::Migration[7.0]
  def self.up
    quotations = Quotation.all()
    quotations.each do |quotation| 
      Customer.create_from_quotation_if_new(quotation)
    end
  end

  def self.down
  end
end
