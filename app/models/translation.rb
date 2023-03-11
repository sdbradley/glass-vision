class Translation < ApplicationRecord
  def self.get(key, lang = 'fr')
    if (translation = Translation.find_by(translation_key: key))
      (translation[lang].presence || key)
    else
      key
    end
  end

  def self.geth(key, lang = 'fr')
    ActiveSupport::Inflector.humanize(if (translation = Translation.find_by(translation_key: key))
                                        (translation[lang].presence || key)
                                      else
                                        key
                                      end)
  end

  def self.gett(key, lang = 'fr')
    ActiveSupport::Inflector.titleize(if (translation = Translation.find_by(translation_key: key))
                                        (translation[lang].presence || key)
                                      else
                                        key
                                      end)
  end
end
