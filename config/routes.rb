Rails.application.routes.draw do
  root 'pages#home'

  namespace :api do
    resources :entries do
      resource :interpretation do
        resource :chatgpt_response, only: [:create]
      end
    end
    resources :dream_signs
  end

  get '/*path' => 'pages#home'
end
