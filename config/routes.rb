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

  # admin post routes
  namespace :admin do
    post 'create-category', to: 'category#create'
  end

  #admin get routes
  scope :admin do
    get 'create-category', to: 'static#index'
    get 'check-posts', to: 'static#index'
  end

  #categories
  get 'categories', to: 'static#index'
  get 'category/:id', to: 'static#index'

  # post
  get 'post/:id', to: 'post#index'

  scope :account do
    get 'create-post', to: 'static#index'
  end
  
  # account
  get 'login', to: 'static#index'
  post 'login', to: 'account#login_user'
  get 'register', to: 'static#index'
  post "register", to: "account#register_user"

  root 'static#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
