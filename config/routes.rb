Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api, defaults: {format: :jason} do
    resources :users
    resources :projects
    resources :tags
    resource :session, only: [:create, :destroy]

  end
  root "static_pages#root"
end

