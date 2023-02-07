GlassVision::Application.routes.draw do

  get "audit/index"

  resources :emails
  get '/signup', :to => 'users#new', :as => :signup
  get '/login', :to => 'session#new', :as => :login
  get '/logout', :to => 'session#destroy', :as => :logout
  get '/activate/:id', :to => 'accounts#show', :as => :activate
  get '/forgot_password', :to => 'passwords#new', :as => :forgot_password
  get '/reset_password/:id', :to => 'passwords#edit', :as => :reset_password
  get '/change_password', :to => 'accounts#edit', :as => :change_password
  get '/customers/search', :to => 'customers#search', :as => :search_customer
  get '/set_lang', :to => 'home#set_lang'
  get '/company/list', :to => 'company#list'
  get '/translation/list', :to => 'translation#list'

  resources :users do
    post :enable
    post :disable
    resource :account
    resources :roles
  end

  resources :audits, :only => :index
  resources :product_colors
  resources :shapes
  resources :openings
  resources :customers
  resources :options
  resources :option_categories do
    member do
      get :edit_options
      put :update_options
    end
  end
  resources :pricing_methods
  resources :roles
  resources :doors do
    collection do
      get 'configure_panels'
      get 'configure_panel_dimensions'
      get 'configure_glass_families'
      get 'configure_glasses'
      get 'configure_openings'
    end
  end
  resources :door_frames
  resources :door_combinations
  resources :frame_profiles
  resources :slab_materials
  resources :door_openings
  resources :door_glass_families do
    resources :door_glasses
  end
  resources :door_panel_families do
    resources :door_panels do
      resources :door_panel_dimensions
    end
  end
  resources :door_borings
  resources :door_sections
  resources :manual_lines

  resource :session, :controller => :session
  resource :passwords
  resources :quotations, :controller => :quotation do
    get :autocomplete_customer_name, :on => :collection
    collection do
        post :search
    end
    post :copy
    # get :print
    get :print_invoice
    get :print_calculations
    get :print_manifest
  end

  get '/quotation/print/:id', :to => 'quotation#print'
  post '/quotation_line/add', :to => 'quotation_line#add'
  post '/option_quotation/add', :to => 'option_quotation#add'
  
  resources :series do
    get :edit_prices
  end
  root :to => 'home#index'

  #match '/:controller(/:action(/:id))', via: [:get, :post]
end

