Rails.application.routes.draw do
  root 'pages#home'

  get '/current_user', to: 'current_user#index'

  devise_for :users, path: '', path_names: {
                                 sign_in: 'login',
                                 sign_out: 'logout',
                                 registration: '/registration'
                               },
                     controllers: {
                       sessions: 'users/sessions',
                       registrations: 'users/registrations'
                     }

  namespace :api do
    resources :entries do
      collection do
        get '/page/:page', action: :index
        get '/count', action: :count
      end
      resource :interpretation do
        resource :chatgpt_response, only: [:create]
      end
      resources :dalle_responses, only: [:create]
      resource :note
    end
    resources :dream_signs
    resources :dream_goals
    resources :whisper_transcriptions, only: [:create]
    resources :sidebar_entry_links, only: [:index]
  end

  get '*all', to: 'pages#home', constraints: lambda { |req|
                                               req.path.exclude? 'rails/active_storage'
                                             }
end
