class CreatePricingMethods < ActiveRecord::Migration[7.0]
  def self.up
    create_table :pricing_methods, :options => 'ENGINE=MyISAM DEFAULT CHARSET=utf8' do |t|
      t.column :description,          :string,      :limit => 50,       :null => false
      t.column :comments,             :text
    end
  end

  def self.down
    drop_table :pricing_methods
  end
end
