load 'deploy' if respond_to?(:namespace) # cap2 differentiator
Dir['vendor/plugins/*/recipes/*.rb'].each { |plugin| load(plugin) }
load 'config/deploy'

require 'bundler/capistrano'

 # This is related to site5 too.

 desc "deploy to production"
 task :production do
   # The mandatory stuff
   set :application, "inline"

   set :user, "glass"
   set :deploy_to, "/home/#{user}/apps/#{application}"

   role :app, "glass-vision.net", :primary => true
   role :web, "glass-vision.net", :primary => true
   role :db,  "glass-vision.net", :primary => true
 end

 desc "deploy to development environment"
 task :development do
   # The mandatory stuff
   set :application, "glass-vision"

   set :user, "snowmoon"
   set :deploy_to, "/home/#{user}/clients/#{application}"

   role :app, "snowmoonsoftware.com", :primary => true
   role :web, "snowmoonsoftware.com", :primary => true
   role :db,  "snowmoonsoftware.com", :primary => true

 end



 namespace :db do
   desc "Backup production database"
   task :backup_production_data, :roles => :db, :only => { :primary => true } do
     require 'yaml'

     # Gets db yml from server, because we don't store it on dev boxes!
 #    get "#{current_path}/config/database.yml", "tmp/prod_database.yml"
     get "#{deploy_to}/#{shared_dir}/config/database.yml", "tmp/prod_database.yml"
     prod_config = YAML::load_file('tmp/prod_database.yml')
     local_config = YAML::load_file('config/database.yml')

     # Dump server sql
     filename = "prod-dump.#{Time.now.strftime '%Y-%m-%d_%H:%M:%S'}.sql"
     server_dump_file = "#{current_path}/tmp/#{filename}"
     on_rollback { delete server_dump_file }
     run "mysqldump -u #{prod_config['production']['username']} --password=#{prod_config['production']['password']} #{prod_config['production']['database']} > #{server_dump_file}" do |channel, stream, data|
       puts data
     end

     # Compress file for quicker transfer
     run "gzip #{server_dump_file}"
     get "#{server_dump_file}.gz", "tmp/#{filename}.gz"
   end

   desc "Load production data into development database"
   task :load_production_data, :roles => :db, :only => { :primary => true } do
     require 'yaml'

     # Gets db yml from server, because we don't store it on dev boxes!
     get "#{current_path}/config/database.yml", "tmp/prod_database.yml"
     prod_config = YAML::load_file('tmp/prod_database.yml')
     local_config = YAML::load_file('config/database.yml')

     # Dump server sql
     filename = "dump.#{Time.now.strftime '%Y-%m-%d_%H:%M:%S'}.sql"
     server_dump_file = "#{current_path}/tmp/#{filename}"
     on_rollback { delete server_dump_file }
     run "mysqldump -u #{prod_config['production']['username']} --password=#{prod_config['production']['password']} #{prod_config['production']['database']} > #{server_dump_file}" do |channel, stream, data|
       puts data
     end

     # Compress file for quicker transfer
     run "gzip #{server_dump_file}"
     get "#{server_dump_file}.gz", "tmp/#{filename}.gz"

     puts "Uncompressing local db dump file"
     `gunzip tmp/#{filename}.gz`
     puts "Loading locally..."
     `mysql -u #{local_config['development']['username']} --password=#{local_config['development']['password']} #{local_config['development']['database']} < tmp/#{filename}`
     puts "Cleaning up temp files"
     `rm -f tmp/#{filename}`
     `rm -f tmp/prod_database.yml`
   end

 end

 # In the deploy namespace we override some default tasks and we define
 # the site5 namespace.
 namespace :deploy do
   desc <<-DESC
     Deploys and starts a `cold' application. This is useful if you have not \
     deployed your application before, or if your application is (for some \
     other reason) not currently running. It will deploy the code, run any \
     pending migrations, and then instead of invoking `deploy:restart', it will \
     invoke `deploy:start' to fire up the application servers.
   DESC
   # NOTE: we kill public_html so be sure to have a backup or be ok with this application
   # being the default app for the domain.
   task :cold do
     update
     site5::link_public_html
     site5::kill_dispatch_fcgi
   end

   desc <<-DESC
     Site5 version of restart task.
   DESC
   task :restart do
     site5::kill_dispatch_fcgi
   end

   namespace :site5 do
     desc <<-DESC
       Links public_html to current_release/public
     DESC
     task :link_public_html do
 #      run "cd /home/#{user}/clients/www; rm -rf #{application}; ln -s #{current_path}/public ./#{application}"
     end

     desc <<-DESC
       Kills Ruby instances on Site5
     DESC
     task :kill_dispatch_fcgi do
       if #{"environment"} == 'production'
         run "touch #{current_path}/tmp/restart.txt"
       else
         run "skill -u #{user} -c ruby"
       end
     end

     desc "Ensure files and folders have correct permissions on site5"
     task :fix_permissions do
       run "find #{current_path}/public/ -type d -exec chmod 0755 {} \\;"
       run "find #{current_path}/public/ -type f -exec chmod 0644 {} \\;"
       run "chmod 0755 #{current_path}/public/dispatch.*"
       run "chmod -R 0755 #{current_path}/script/*"
       end
   end
 end

 task :after_deploy do
   deploy::site5::fix_permissions 
 end
 
 desc "Create database.yml in shared/config" 
 task :after_setup do
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

 desc "Link in the production database.yml" 
 task :after_update_code do
   run "ln -nfs #{deploy_to}/#{shared_dir}/config/database.yml #{release_path}/config/database.yml" 
 end
 