# Filters added to this controller will be run for all controllers in the application.
# Likewise, all the methods added will be available for all controllers.
class ApplicationController < ActionController::Base
  include TranslationGet
  include AuthenticatedSystem

  helper :all # include all helpers, all the time
  protect_from_forgery # See ActionController::RequestForgeryProtection for details

  # Scrub sensitive parameters from your log
    filter_parameter_logging :password  

  before_filter do |c|
    ActiveRecord::Base.lang = c.session[:lang] ||= "fr"
  end
  # require authenticated user for all actions (have to exclude signup and login right?)
  before_filter :login_required

  def debug_log(text)
    logger.info  "####################\n#{text}\n####################"
  end
end
