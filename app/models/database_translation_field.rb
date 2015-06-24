class DatabaseTranslationField < ActiveRecord::Base
  validates_presence_of :translation_table_name, :translation_field_name
end
