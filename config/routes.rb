Rails.application.routes.draw do
  root to: "home#index"

  devise_for :users, controllers: {
    sessions: 'users/sessions',
    passwords: 'users/passwords',
    registrations: 'users/registrations'
  }

  resources :category, except: ['show'] do
    resources :subcategory, except: ['show'] do
      resources :topic do
        resources :comment, except: %w[index show]
      end
    end
  end
end
