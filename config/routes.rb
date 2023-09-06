Rails.application.routes.draw do
  get 'private/test'
  get '/current_user', to: 'current_user#index'
  root 'pages#home'
  devise_for :users, path: '', path_names: {
                                 sign_in: 'login',
                                 sign_out: 'logout',
                                 registration: 'signup'
                               },
                     controllers: {
                       sessions: 'users/sessions',
                       registrations: 'users/registrations'
                     }

  namespace :api do
    resources :entries do
      resource :interpretation do
        resource :chatgpt_response, only: [:create]
      end
      resources :dalle_responses, only: [:create]
    end
    resources :dream_signs
    resources :whisper_transcriptions, only: [:create]
  end
  get '*all', to: 'pages#home', constraints: lambda { |req|
                                               req.path.exclude? 'rails/active_storage'
                                             }
end
