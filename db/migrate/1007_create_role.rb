class CreateRole < ActiveRecord::Migration[7.0]
  def self.up
    create_table "roles", :force => true do |t|
      t.column :rolename,                :string
    end
  end

  def self.down
    drop_table "roles"
  end
end
