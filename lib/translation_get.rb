module TranslationGet
  def trn_get(key)
    Translation.get(key, ActiveRecord::Base.lang ) #session[:lang] ||= "fr")
  end

  def trn_geth(key)
    Translation.geth(key,  ActiveRecord::Base.lang ) #session[:lang] ||= "fr")
  end

  def trn_gett(key)
    Translation.gett(key,  ActiveRecord::Base.lang ) #session[:lang] ||= "fr")
  end
end
