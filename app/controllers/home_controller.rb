class HomeController < ApplicationController
  skip_before_filter :login_required
  def index
  end

  def set_lang
    session[:lang] = params[:lang]
    redirect_to :back
  end
end
