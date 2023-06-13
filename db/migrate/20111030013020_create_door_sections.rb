class CreateDoorSections < ActiveRecord::Migration[7.0]
  def self.up
    create_table :door_sections do |t|
      t.string :name
      t.string :code

      t.timestamps
    end
  end

  def self.down
    drop_table :door_sections
  end
end
