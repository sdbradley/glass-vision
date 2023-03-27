desc 'Loads mysql command prompt'
require 'erb'
task mysql: :environment do
  puts "\n\nLoading mysql in #{Rails.env} mode...\n"

  database_yml_path = "#{Rails.root}/config/database.yml"
  database_yml = YAML.safe_load(ERB.new(File.read(database_yml_path)).result)

  raise "Could not find environment #{Rails.env} in database.yml" unless database_yml[Rails.env]

  config = database_yml[Rails.env]
  username = config['username']
  password = config['password']
  database_name = config['database']
  host = config['host'] || 'localhost'
  port = config['port'] || 3306
  socket = config['socket'] || '/tmp/mysql.sock'

  unless username && database_name
    raise "Failed. Setup requires a user and database for environment #{environment} in '#{database_yml_path}'.\n\n#{database_yml.to_yaml}"
  end

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
