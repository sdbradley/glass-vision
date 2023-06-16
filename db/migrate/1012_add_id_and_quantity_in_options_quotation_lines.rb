class AddIdAndQuantityInOptionsQuotationLines < ActiveRecord::Migration[7.0]
  def self.up
    execute "ALTER TABLE options_quotation_lines
             ADD COLUMN id INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY AFTER quotation_line_id,
             ADD COLUMN quantity INTEGER  NOT NULL DEFAULT 1 AFTER id,
             ADD PRIMARY KEY (id)"
  end

  def self.down
    execute "ALTER TABLE options_quotation_lines DROP COLUMN id,
             DROP COLUMN quantity"
  end
end
