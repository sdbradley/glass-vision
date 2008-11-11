class Translation < ActiveRecord::Base
  def self.get(key, lang = "fr")
    (translation = Translation.find_by_translation_key(key)) ? (translation[lang].blank? ? key : translation[lang]): key
  end
  
  def self.geth(key, lang = "fr")
    Inflector.humanize((translation = Translation.find_by_translation_key(key)) ? (translation[lang].blank? ? key : translation[lang]): key)
  end
  
  def self.gett(key, lang = "fr")
    Inflector.titleize((translation = Translation.find_by_translation_key(key)) ? (translation[lang].blank? ? key : translation[lang]): key)
  end
end
