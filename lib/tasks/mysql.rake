desc "Loads mysql command prompt"
require 'erb'
task :mysql do
  puts "\n\nLoading mysql in RAILS_ENV=#{RAILS_ENV}...\n"

  database_yml_path = "#{RAILS_ROOT}/config/database.yml"
  database_yml = YAML.load(ERB.new(File.read(database_yml_path)).result)

  raise "Could not find environment #{RAILS_ENV} in database.yml" unless database_yml[RAILS_ENV]

  config = database_yml[RAILS_ENV]
  username = config['username']
  password = config['password']
  database_name = config['database']
  host = config['host'] || 'localhost'
  port = config['port'] || 3306
  socket = config['socket'] || '/tmp/mysql.sock'

  raise "Failed. Setup requires a user and database for environment #{environment} in '#{database_yml_path}'.\n\n#{database_yml.to_yaml}" unless username and database_name

  args = "-u #{username}"
  args << " -p#{password}" unless password.to_s.strip.empty?
  args << " -h #{host}" unless host.to_s.strip.empty?
  args << " #{database_name}"

  command = []
  command << "mysql #{args}"

  puts <<-EOS
    Executing: #{command.join(' ')}\n
  EOS
  system command.join(' ')
end
