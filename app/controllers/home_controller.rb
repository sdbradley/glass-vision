class HomeController < ApplicationController
  def index
  end

  def set_lang
    session[:lang] = params[:lang]
    redirect_to :back
  end
end
