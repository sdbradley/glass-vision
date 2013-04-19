class CreateInvoiceNumbers < ActiveRecord::Migration
  def self.up
    create_table :invoice_numbers do |t|
      t.integer :year
      t.integer :invoice_number

      t.timestamps
    end
  end

  def self.down
    drop_table :invoice_numbers
  end
end
