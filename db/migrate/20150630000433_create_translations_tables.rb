class CreateTranslationsTables < ActiveRecord::Migration

  def self.up
    DoorBoring.create_translation_table!({:name => :string}, {:migrate_data => false})
    DoorCombination.create_translation_table!({:name => :string})
    DoorFrame.create_translation_table!({:name => :string})
    DoorGlass.create_translation_table!({:name => :string})
    DoorGlassFamily.create_translation_table!({:name => :string})
    DoorOpening.create_translation_table!({:name => :string})
    DoorPanel.create_translation_table!({:name => :string})
    DoorPanelFamily.create_translation_table!({:name => :string})
    DoorSection.create_translation_table!({:name => :string})
    FrameProfile.create_translation_table!({:name => :string})
    Opening.create_translation_table!({:abbreviation => :string, :name => :string})
    Option.create_translation_table!({:description => :string})
    OptionsMinimumUnit.create_translation_table!({:description => :string, :comments => :string})
    OptionCategory.create_translation_table!({:description => :string,:name => :string})
    PricingMethod.create_translation_table!({:comments => :string})
    ProductColor.create_translation_table!({:name => :string})
    Serie.create_translation_table!({:comments => :string})

    migrate_data(DoorBoring,         {:name => :string})
    migrate_data(DoorCombination,    {:name => :string})
    migrate_data(DoorFrame,          {:name => :string})
    migrate_data(DoorGlass,          {:name => :string})
    migrate_data(DoorGlassFamily,    {:name => :string})
    migrate_data(DoorOpening,        {:name => :string})
    migrate_data(DoorPanel,          {:name => :string})
    migrate_data(DoorPanelFamily,    {:name => :string})
    migrate_data(DoorSection,        {:name => :string})
    migrate_data(FrameProfile,       {:name => :string})
    migrate_data(Opening,            {:abbreviation => :string, :name => :string})
    migrate_data(Option,             {:description => :string})
    migrate_data(OptionsMinimumUnit, {:description => :string, :comments => :string})
    migrate_data(OptionCategory,     {:description => :string,:name => :string})
    migrate_data(PricingMethod,      {:comments => :string})
    migrate_data(ProductColor,       {:name => :string})
    migrate_data(Serie,              {:comments => :string})

  end

  def self.down
    DoorBoring.drop_translation_table!
    DoorCombination.drop_translation_table!
    DoorFrame.drop_translation_table!
    DoorGlass.drop_translation_table!
    DoorGlassFamily.drop_translation_table!
    DoorOpening.drop_translation_table!
    DoorPanel.drop_translation_table!
    DoorPanelFamily.drop_translation_table!
    DoorSection.drop_translation_table!
    FrameProfile.drop_translation_table!
    Opening.drop_translation_table!
    Option.drop_translation_table!
    OptionsMinimumUnit.drop_translation_table!
    OptionCategory.drop_translation_table!
    PricingMethod.drop_translation_table!
    ProductColor.drop_translation_table!
    Serie.drop_translation_table!
  end

  private
  def self.migrate_data(object, fields)
    say "migrating data for  #{object}"

    table_name = object.table_name
    fk = object.table_name.singularize + '_id'
    [:en, :es, :fr].each do |lang|
      fields.each_key do |field_name|
        execute "insert into #{object.translations_table_name} (#{fk}, #{field_name}, locale, created_at, updated_at) select record_id, #{lang}, '#{lang}', utc_timestamp, utc_timestamp from database_translations where database_translations.translation_table_name='#{table_name}' and database_translations.translation_field_name='#{field_name}' and #{lang} != '' order by record_id;"
      end
    end
  end

end
