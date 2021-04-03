Rails.application.routes.draw do
  root to: "home#index"

  devise_for :users, controllers: {
    sessions: 'users/sessions',
    passwords: 'users/passwords',
    registrations: 'users/registrations'
  }

  resources :category
  resources :subcategory
  resources :topic
  resources :comment
end
