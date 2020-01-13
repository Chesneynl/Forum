Rails.application.routes.draw do

  # posts
  namespace :api do
    namespace :v1 do
      get 'posts', to: 'posts#index'
      post 'posts/create'
      get 'show/:id', to: 'posts#show'
      delete 'destroy/:id', to: 'posts#destroy'
    end
  end

  # admin
  namespace :admin do
    resources :posts
    get 'create-category' => 'category#index'
    post 'categories' => 'category#create'
  end

  # categories
  get 'categories' => 'category#index'
  get 'category/:id' => 'category#show'
  
  # account routes
  get 'account/edit-profile', to: 'account#edit'
  get 'account/my-posts', to: 'account#index'
  get 'account/create-post' => 'post#create'

  # post
  get 'post/:id', to: 'post#index'

  # login / register / logout
  get 'login' => 'login#index'
  get 'logout' => 'logout#index'
  get "register", to: "register#index"
  post "login", to: "login#login"
  post "register", to: "register#create"

  get '*path' => 'home#page_not_found'
  root 'home#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
