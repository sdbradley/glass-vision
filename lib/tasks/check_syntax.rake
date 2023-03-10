require 'erb'
require 'open3'
require 'yaml'

task check_syntax: %i[check_ruby check_erb check_yaml]

task :check_erb do
  (Dir['**/*.erb'] + Dir['**/*.rhtml']).each do |file|
    next if file.match('vendor/rails')

    Open3.popen3('ruby -c') do |stdin, stdout, stderr|
      stdin.puts(ERB.new(File.read(file), trim_mode: '-').src)
      stdin.close
      if (error = (begin
        stderr.readline
      rescue StandardError
        false
      end))
        puts file + error[1..]
      end
      begin
        stdout.close
      rescue StandardError
        false
      end
      begin
        stderr.close
      rescue StandardError
        false
      end
    end
  end
end

task :check_ruby do
  Dir['**/*.rb'].each do |file|
    next if file.match('vendor/rails')
    next if file.match('vendor/plugins/.*/generators/.*/templates')

    Open3.popen3("ruby -c #{file}") do |stdin, stdout, stderr|
      if (error = (begin
        stderr.readline
      rescue StandardError
        false
      end))
        puts error
      end
      begin
        stdin.close
      rescue StandardError
        false
      end
      begin
        stdout.close
      rescue StandardError
        false
      end
      begin
        stderr.close
      rescue StandardError
        false
      end
    end
  end
end

task :check_yaml do
  Dir['**/*.yml'].each do |file|
    next if file.match('vendor/rails')

    begin
      YAML.load_file(file)
    rescue StandardError => e
      puts "#{file}:#{begin
        "#{e.message.match(/on line (\d+)/)[1]}:"
      rescue StandardError
        nil
      end} #{e.message}"
    end
  end
end
