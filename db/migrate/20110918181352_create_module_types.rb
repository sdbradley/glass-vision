class CreateModuleTypes < ActiveRecord::Migration[7.0]
  def self.up
    create_table :module_types do |t|
      t.string :name
      t.string :gender

      t.timestamps
    end
  end

  def self.down
    drop_table :module_types
  end
end
