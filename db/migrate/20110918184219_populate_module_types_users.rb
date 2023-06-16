class PopulateModuleTypesUsers < ActiveRecord::Migration[7.0]
  def self.up
    module_type = ModuleType.where(name: 'Fenêtre')&.first
    User.all.each do |user|
      user.module_types << module_type unless module_type.nil?
    end
  end

  def self.down
    User.all.each do |user|
      user.module_types.clear
    end
  end
end
