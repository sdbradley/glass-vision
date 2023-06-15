class AddQuantifiableInPricingMethods < ActiveRecord::Migration[7.0]
  def self.up
    add_column :pricing_methods, :quantifiable, :boolean,  :default => false
  end

  def self.down
  	remove_column :pricing_methods, :quantifiable
  end
end
