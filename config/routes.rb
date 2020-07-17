Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  
  namespace :api, defaults: {format: :json} do
    namespace :v0 do
      resources :sessions, only: [:create]
      resources :registrations, only: [:create, :destroy]
      delete :logout, to: 'sessions#logout'
      patch 'update/:id', to: 'registrations#update'
      resources :comics
    end  
  end
end
