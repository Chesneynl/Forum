Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'posts/index'
      post 'posts/create'
      get 'show/:id', to: 'posts#show'
      delete 'destroy/:id', to: 'posts#destroy'
    end
  end
  get 'account/edit-profile', to: 'account#edit'
  get 'account', to: 'account#index'
  get 'post/:id', to: 'post#index'
  get 'login' => 'login#index'
  get 'logout' => 'logout#index'
  get 'create-post' => 'post#create'
  get "register", to: "register#index"
  get '*path' => 'home#index'
  post "login", to: "login#login"
  post "register", to: "register#create"
  root 'home#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
