class AddModuleTypeTranslations < ActiveRecord::Migration[7.0]
  def self.up
    m = ModuleType.find(1)
    m.translations.destroy_all
    m.translations.create(:name => 'Window', :locale => :en)
    m.translations.create(:name => 'Fenêtre', :locale => :fr)
    m.translations.create(:name => 'Ventana', :locale => :es)
    m.update_attributes(:name => 'Window')

    m = ModuleType.find(2)
    m.translations.destroy_all
    m.translations.create(:name => 'Door', :locale => :en)
    m.translations.create(:name => 'Porte', :locale => :fr)
    m.translations.create(:name => 'Puerta', :locale => :es)
    m.update_attributes(:name => 'Door')

  end

  def self.down
    ModuleType.all.each do |m|
      m.translations.destroy_all
    end
  end
end
