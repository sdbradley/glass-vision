class CreateSeries < ActiveRecord::Migration[7.0]
  def self.up
    create_table :series, :options => 'ENGINE=MyISAM DEFAULT CHARSET=utf8' do |t|
      t.column :name,                 :string,    :limit => 50,     :null => false
      t.column :description,          :string,    :limit => 255,    :null => false
      t.column :comments,             :text
    end
  end

  def self.down
    drop_table :series
  end
end