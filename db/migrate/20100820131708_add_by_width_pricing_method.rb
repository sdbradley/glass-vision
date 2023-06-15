class AddByWidthPricingMethod < ActiveRecord::Migration[7.0]
  def self.up
    execute "INSERT INTO pricing_methods VALUES (8, 'prix par largeur totale', '', false);"
  end

  def self.down
    execute "delete from pricing_methods where id=8;"
  end
end
