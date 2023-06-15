class AddCompanyToQuotation < ActiveRecord::Migration[7.0]
  def self.up
    add_column :quotations, :company_id, :integer

    default_company = Company.find_by_name('Glass-Vision')
    if default_company.nil?
      default_company = Company.first
    end
    Quotation.all().each do |q|
      q.company = default_company
      q.save!
    end
  end

  def self.down
    remove_column :quotations, :company_id
  end
end
