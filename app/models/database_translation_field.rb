class DatabaseTranslationField < ActiveRecord::Base
  validates :translation_table_name, :translation_field_name, presence: true
end
