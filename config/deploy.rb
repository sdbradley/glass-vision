# Necessary to run on Site5
require 'erb'
set :use_sudo, false
set :group_writable, false
 
# Less releases, less space wasted
set :keep_releases, 2
 
set :repository,  "--no-auth-cache svn://dev.atnetsend.net/clients/glass-vision.net/inline"
 
# SCM information
set :scm_username, "paquette"
#set :scm_password, Proc.new { CLI.password_prompt "SVN Password: "}
set :scm_password, "wintermute"

default_run_options[:pty] = true
