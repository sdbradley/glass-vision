class CreateManualLines < ActiveRecord::Migration[7.0]
  def self.up
    create_table :manual_lines, if_not_exists: true do |t|
      t.text :description
      t.integer :quantity
      t.float :unit_price
      t.integer :quotation_id

      t.timestamps
    end
  end

  def self.down
    drop_table :manual_lines, if_exists: true
  end
end
