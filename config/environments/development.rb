GlassVision::Application.configure do
  # Settings specified here will take precedence over those in config/application.rb
  config.eager_load = false

  # Debug mode disables concatenation and preprocessing of assets.
  # This option may cause significant delays in view rendering with a large
  # number of complex assets.
  config.assets.debug = true

  # Suppress logger output for asset requests.
  config.assets.quiet = true

  # separate local assets from production assets, so Propshaft can
  # track changes and hot-reload assets when you make changes.
  config.assets.prefix = '/dev-assets'

  # In the development environment your application's code is reloaded on
  # every request.  This slows down response time but is perfect for development
  # since you don't have to restart the webserver when you make code changes.
  config.cache_classes = false

  # Log error messages when you accidentally call methods on nil.
  config.whiny_nils = true

  # Show full error reports and disable caching
  config.consider_all_requests_local       = true
  # config.action_view.debug_rjs             = true
  config.action_controller.perform_caching = false

  # Don't care if the mailer can't send
  config.action_mailer.raise_delivery_errors = false

  # Print deprecation notices to the Rails logger
  config.active_support.deprecation = :log

  # Only use best-standards-support built into browsers
  config.action_dispatch.best_standards_support = :builtin

  config.action_mailer.delivery_method = :smtp
  config.action_mailer.raise_delivery_errors = true
  config.action_mailer.smtp_settings = {
    address: 'mail.snowmoonsoftware.com',
    port: 25,
    domain: 'snowmoonsoftware.com',
    authentication: :login,
    user_name: 'jeff@snowmoonsoftware.com',
    password: 't9ohqa'
  }
  # TODO: not sure this is valid for deploy on snowmoonsoftware.com
  #  config.action_mailer.default_url_options[:host] = "clients.snowmoonsoftware.com/glass-vision"
  #   config.action_mailer.default_url_options[:host] = "localhost:3000"
end
