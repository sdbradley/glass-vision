class SetUnitPriceQuantifiable < ActiveRecord::Migration[7.0]
  def self.up
    execute "UPDATE pricing_methods
             SET quantifiable = 1
             WHERE id = 6"
  end

  def self.down
  	execute "UPDATE pricing_methods
             SET quantifiable = 0
             WHERE id = 6"
  end
end
