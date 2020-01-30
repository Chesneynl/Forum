Rails.application.routes.draw do

  # posts
  namespace :api do
    namespace :v1 do
      get 'posts', to: 'posts#index'
      post 'posts/create'
      delete 'destroy/:id', to: 'posts#destroy'
    end
  end

  # admin
  namespace :admin do
    resources :posts
    get 'create-category' => 'category#index'
    post 'categories' => 'category#create'
  end

  #likes / dislikes
  post "like-dislike", to: "like#like_dislike"
  get 'likes-and-dislikes', to: "like#index" 

  # post
  get 'post/:id', to: 'post#index'
  
  # categories
  get 'categories' => 'category#index'
  get 'category/:id' => 'category#show'

  # account
  get 'account/edit-profile', to: 'account#edit'
  get 'account/my-posts', to: 'account#index'
  get 'account/create-post', to: 'post#create'
  get 'login' => 'account'
  get 'logout' => 'account'
  get "register", to: "account#register"
  post "login", to: "login#login"
  post "register", to: "account#register_user"

  get '*path' => 'home#page_not_found'
  root 'home#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
