module TranslationGet
  def trn_get(key)
    Translation.get(key, session[:lang] ||= "fr")
  end

  def trn_geth(key)
    Translation.geth(key, session[:lang] ||= "fr")
  end

  def trn_gett(key)
    Translation.gett(key, session[:lang] ||= "fr")
  end
end
