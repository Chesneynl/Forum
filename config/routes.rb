Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'posts/index'
      post 'posts/create'
      get '/show/:id', to: 'posts#show'
      delete '/destroy/:id', to: 'posts#destroy'
    end
  end
  root 'post#index'
  get '/*path' => 'post#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
