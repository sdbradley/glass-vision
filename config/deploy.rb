set :application, 'glass-vision'

set :scm, :git
set :repo_url, 'git@github.com:snowmoonsoftware/glass-vision.net.git'
set :repository, 'git@github.com:snowmoonsoftware/glass-vision.net.git'
set :use_sudo, false
set :group_writable, false


# If you have previously been relying upon the code to start, stop
# and restart your mongrel application, or if you rely on the database
# migration code, please uncomment the lines you require below

# If you are deploying a rails app you probably need these:

#load 'ext/rails-database-migrations.rb'
#load 'ext/rails-shared-directories.rb'

# There are also new utility libaries shipped with the core these
# include the following, please see individual files for more
# documentation, or run `cap -vT` with the following lines commented
# out to see what they make available.

# load 'ext/spinner.rb'              # Designed for use with script/spin
# load 'ext/passenger-mod-rails.rb'  # Restart task for use with mod_rails
# load 'ext/web-disable-enable.rb'   # Gives you web:disable and web:enable

# If you aren't deploying to /u/apps/#{application} on the target
# servers (which is the default), you can specify the actual location
# via the :deploy_to variable:
# set :deploy_to, "/var/www/#{application}"

# If you aren't using Subversion to manage your source code, specify
# your SCM below:
# set :scm, :subversion
# see a full list by running "gem contents capistrano | grep 'scm/'"

 # This is related to site5 too.

 desc 'deploy to production'
 task :production do
   # The mandatory stuff
   set :application, 'glass-vision'

   set :user, 'deploy'
   set :deploy_to, "/home/#{user}/apps/#{application}"

   role :app, 'quotations.glass-vision.net', :primary => true
   role :web, 'quotations.glass-vision.net', :primary => true
   role :db, 'quotations.glass-vision.net', :primary => true
 end

 desc 'deploy to development environment'
 task :development do
   # The mandatory stuff
   set :application, 'glass-vision'

   set :user, 'snowmoon'
   set :deploy_to, "/home/#{user}/clients/#{application}"

   role :app, 'snowmoonsoftware.com', :primary => true
   role :web, 'snowmoonsoftware.com', :primary => true
   role :db, 'snowmoonsoftware.com', :primary => true

 end

 desc 'deploy to staging environment'
 task :staging do
#   set :bundle_cmd, '. $HOME/.bash_profile && bundle'
   # The mandatory stuff
   set :application, 'glass-vision'

   set :user, 'deploy'
   set :deploy_to, "/home/#{user}/apps/#{application}"

   role :app, 'glass-vision.snowmoonsoftware.com', :primary => true
   role :web, 'glass-vision.snowmoonsoftware.com', :primary => true
   role :db, 'glass-vision.snowmoonsoftware.com', :primary => true

 end

namespace :deploy do

  after :deploy, :restart_passenger
  after :setup, :generate_database_config
  after :after_update_code, :link_database_config
#  after :fix_permissions, :restart_passenger

#task :after_deploy do
#  deploy::site5::fix_permissions
#end

desc 'Create database.yml in shared/config'
task :generate_database_config do
  database_configuration = ERB.new <<-EOF
login: &login
  adapter: mysql
  host: localhost
  host: 127.0.0.1
  encoding: utf8

development:
  database: snowmoon_inlinedev
  username: snowmoon_inlined
  password: inln16ed
  <<: *login

staging:
  database: snowmoon_inlinedev
  username: snowmoon_inlined
  password:
  <<: *login


test:
  database: inline_test
  username: root
  password: t9ohqa
  <<: *login

production:
  database: glass_inlineproduction
  username: glass_inline
  password: inline
  <<: *login
EOF

  run "mkdir -p #{deploy_to}/#{shared_dir}/config"
  put database_configuration.result(binding), "#{deploy_to}/#{shared_dir}/config/database.yml"
end

  desc 'Link in the production database.yml'
  task :link_database_config do
    run "ln -nfs #{deploy_to}/#{shared_dir}/config/database.yml #{release_path}/config/database.yml"
  end

  desc "Kills Ruby instances on Site5"
  task :restart_passenger do
   run "touch #{current_path}/tmp/restart.txt"
  end

  desc 'Ensure files and folders have correct permissions on site5'
  task :fix_permissions do
    run "find #{current_path}/public/ -type d -exec chmod 0755 {} \\;"
    run "find #{current_path}/public/ -type f -exec chmod 0644 {} \\;"
    run "chmod 0755 #{current_path}/public/dispatch.*"
    run "chmod -R 0755 #{current_path}/script/*"
  end

  namespace :deploy do
    desc "Restarting passenger with restart.txt"
    task :restart, :roles => :app, :except => { :no_release => true } do
      run "touch #{current_path}/tmp/restart.txt"
    end

    [:start, :stop].each do |t|
      desc "#{t} task is a no-op with mod_rails"
      task t, :roles => :app do ; end
    end
  end

end




