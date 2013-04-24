class CreateAudits < ActiveRecord::Migration
  def self.up
    create_table :audits do |t|
      t.integer :user_id
      t.string :action
      t.string :result
      t.string :reason

      t.datetime :created_at
    end
  end

  def self.down
    drop_table :audits
  end
end
