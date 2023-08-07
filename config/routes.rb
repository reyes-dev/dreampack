Rails.application.routes.draw do
  root 'pages#home'

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
