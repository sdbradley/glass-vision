# Filters added to this controller will be run for all controllers in the application.
# Likewise, all the methods added will be available for all controllers.
class ApplicationController < ActionController::Base
  include TranslationGet
  include AuthenticatedSystem
  # include SortableTable::App::Controllers::ApplicationController

  helper :all # include all helpers, all the time
  protect_from_forgery # See ActionController::RequestForgeryProtection for details

  layout proc { |c| c.request.xhr? ? false : 'application' }

  before_action do |c|
    ActiveRecord::Base.lang = c.session[:lang] ||= request.cookies['lang'] ||= 'fr'
    I18n.locale = ActiveRecord::Base.lang == 'fr' ? 'fr-CA' : ActiveRecord::Base.lang
  end
  # require authenticated user for all actions (have to exclude signup and login right?)
  before_action :login_required

  def debug_log(text, value = nil)
    logger.error  "#################### #{text} ####################"
    return unless value

    logger.error value.inspect
    logger.error '------------------------------------------------'
  end
end
