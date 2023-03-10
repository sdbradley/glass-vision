class Translation < ActiveRecord::Base
  def self.get(key, lang = 'fr')
    if (translation = Translation.find_by_translation_key(key))
      translation[lang].blank? ? key : translation[lang]
    else
      key
    end
  end

  def self.geth(key, lang = 'fr')
    ActiveSupport::Inflector.humanize(if (translation = Translation.find_by_translation_key(key))
                                        translation[lang].blank? ? key : translation[lang]
                                      else
                                        key
                                      end)
  end

  def self.gett(key, lang = 'fr')
    ActiveSupport::Inflector.titleize(if (translation = Translation.find_by_translation_key(key))
                                        translation[lang].blank? ? key : translation[lang]
                                      else
                                        key
                                      end)
  end
end
