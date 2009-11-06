ENV['GEM_PATH'] = '/home/glass/gems:/usr/lib/ruby/gems/1.8'
# Be sure to restart your web server when you modify this file.

# Uncomment below to force Rails into production mode when 
# you don't control web/app server and can't set it the proper way
ENV['RAILS_ENV'] ||= 'production'
#RAILS_ENV = ENV['RAILS_ENV']

# Specifies gem version of Rails to use when vendor/rails is not present
RAILS_GEM_VERSION = '2.3.4' unless defined? RAILS_GEM_VERSION

# Bootstrap the Rails environment, frameworks, and default configuration
require File.join(File.dirname(__FILE__), 'boot')

Rails::Initializer.run do |config|
  # Settings in config/environments/* take precedence over those specified here.
  # Application configuration should go into files in config/initializers
  # -- all .rb files in that directory are automatically loaded.

  # Add additional load paths for your own custom dirs
  # config.load_paths += %W( #{RAILS_ROOT}/extras )

  # Specify gems that this application depends on and have them installed with rake gems:install
  # config.gem "bj"
  # config.gem "hpricot", :version => '0.6', :source => "http://code.whytheluckystiff.net"
  # config.gem "sqlite3-ruby", :lib => "sqlite3"
  # config.gem "aws-s3", :lib => "aws/s3"
  config.gem 'mislav-will_paginate', :version => '~> 2.3.11', :lib => 'will_paginate', 
    :source => 'http://gems.github.com'

  config.gem 'thoughtbot-paperclip', :lib => 'paperclip', :source => 'http://gemcutter.org'
  config.gem 'formtastic', :source => 'http://gemcutter.org'
  config.gem "ruby-growl", :lib => "ruby-growl", :source => "http://gemcutter.org"
  config.gem 'bullet', :source => 'http://gemcutter.org'
  config.gem 'validation_reflection', :source => 'http://gemcutter.org'
  
  
  # Only load the plugins named here, in the order given (default is alphabetical).
  # :all can be used as a placeholder for all plugins not explicitly named
  # config.plugins = [ :exception_notification, :ssl_requirement, :all ]

  # Skip frameworks you're not going to use. To use Rails without a database,
  # you must remove the Active Record framework.
  # config.frameworks -= [ :active_record, :active_resource, :action_mailer ]

  # Activate observers that should always be running
  # config.active_record.observers = :cacher, :garbage_collector, :forum_observer# observers break a migrate from VERSION 0 - disable them for rake db:migrate
unless ( File.basename($0) == "rake" && ARGV.include?("db:migrate") ) 
  config.active_record.observers = :user_observer, :quotation_line_observer , :options_quotation_observer, :quotation_observer
end

  # Set Time.zone default to the specified zone and make Active Record auto-convert to this zone.
  # Run "rake -D time" for a list of tasks for finding time zone names.
  config.time_zone = 'UTC'

  config.action_controller.session_store = :active_record_store
  config.action_controller.session = { :key => "_glassvision_session", :secret => "fiberglass fenestrations" } 

  # The default locale is :en and all translations from config/locales/*.rb,yml are auto loaded.
  # config.i18n.load_path += Dir[Rails.root.join('my', 'locales', '*.{rb,yml}')]
  # config.i18n.default_locale = :de
  
  config.after_initialize do
    Bullet.enable = true 
    Bullet.alert = true
    Bullet.bullet_logger = true  
    Bullet.console = true
    Bullet.growl = true
    Bullet.rails_logger = true
    Bullet.disable_browser_cache = true
  end
  
end


# Include your application configuration below

# new methods for translation
class ActiveRecord::Base
  include Translatable
  cattr_accessor :lang
end


# Include your application configuration below

#require 'paperclip'
#require 'will_paginate'
