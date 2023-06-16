class SetUnitPriceQuantifiable < ActiveRecord::Migration[7.0]
  def self.up
    execute "UPDATE pricing_methods
             SET quantifiable = true
             WHERE id = 6"
  end

  def self.down
  	execute "UPDATE pricing_methods
             SET quantifiable = false
             WHERE id = 6"
  end
end
