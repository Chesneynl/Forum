Rails.application.routes.draw do

  # posts
  namespace :api do
    namespace :v1 do
      get 'posts', to: 'posts#index'
      post 'posts/create'
      delete 'destroy/:id', to: 'posts#destroy'
      get 'categories', to: 'posts#categories'
      get 'category/:id', to: 'posts#posts_by_category'
      post "like-dislike", to: "posts#like_dislike"
      get 'likes-and-dislikes', to: "posts#get_likes" 
    end
  end

  # admin
  namespace :admin do
    resources :posts
    get 'create-category', to: 'category#index'
    post 'create-category', to: 'category#create'
  end

  # post
  get 'post/:id', to: 'post#index'

  # account
  post "login", to: "account#login_user"
  post "register", to: "account#register_user"

  root 'home#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
