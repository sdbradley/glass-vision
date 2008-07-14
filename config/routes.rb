ActionController::Routing::Routes.draw do |map|
  
  map.signup '/signup', :controller => 'users',   :action => 'new'
  map.login  '/login',  :controller => 'session', :action => 'new'
  map.logout '/logout', :controller => 'session', :action => 'destroy'
  map.activate '/activate/:id', :controller => 'accounts', :action => 'show'
  map.forgot_password '/forgot_password', :controller => 'passwords', :action => 'new'
  map.reset_password '/reset_password/:id', :controller => 'passwords', :action => 'edit'
  map.change_password '/change_password', :controller => 'accounts', :action => 'edit'

#  map.resources :users
#  map.resource :session

  map.resources :users, :member => { :enable => :put } do |users|
    users.resource :account
    users.resources :roles
  end
  
  map.resource :session
  map.resource :password  

  # The priority is based upon order of creation: first created -> highest priority.
  
  # Sample of regular route:
  # map.connect 'products/:id', :controller => 'catalog', :action => 'view'
  # Keep in mind you can assign values other than :controller and :action

  # Sample of named route:
  # map.purchase 'products/:id/purchase', :controller => 'catalog', :action => 'purchase'
  # This route can be invoked with purchase_url(:id => product.id)

  # You can have the root of your site routed by hooking up '' 
  # -- just remember to delete public/index.html.
  map.connect '', :controller => "home"

  # Allow downloading Web Service WSDL as a file with an extension
  # instead of a file named 'wsdl'
  map.connect ':controller/service.wsdl', :action => 'wsdl'

  # Install the default route as the lowest priority.
  map.connect ':controller/:action/:id'
end

#   map.root :controller => "pages", :action => "index"
#   map.signup '/signup', :controller => 'users', :action => 'new'
#   map.login '/login', :controller => 'sessions', :action => 'new'
#   map.logout '/logout', :controller => 'sessions', :action => 'destroy'
#   map.activate '/activate/:id', :controller => 'accounts', :action => 'show'
#   map.forgot_password '/forgot_password', :controller => 'passwords', :action => 'new'
#   map.reset_password '/reset_password/:id', :controller => 'passwords', :action => 'edit'
#   map.change_password '/change_password', :controller => 'accounts', :action => 'edit'
#   
#   # See how all your routes lay out with "rake routes"
#   map.resources :pages
#  
#   map.resources :users, :member => { :enable => :put } do |users|
#     users.resource :account
#     users.resources :roles
#   end
#   
#   map.resource :session
#   map.resource :password
#   
#   # Install the default routes as the lowest priority.
#   map.connect ':controller/:action/:id'
#   map.connect ':controller/:action/:id.:format'
# end
