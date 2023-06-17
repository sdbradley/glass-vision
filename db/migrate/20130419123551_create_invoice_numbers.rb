class CreateInvoiceNumbers < ActiveRecord::Migration[7.0]
  def self.up
    create_table :invoice_numbers, if_not_exists: true do |t|
      t.integer :year
      t.integer :invoice_number

      t.timestamps
    end
  end

  def self.down
    drop_table :invoice_numbers, if_exists: true
  end
end
