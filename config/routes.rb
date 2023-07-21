Rails.application.routes.draw do
  root 'pages#home'

  namespace :api do
    resources :entries do
      resource :interpretation
    end
    resources :dream_sign
  end

  get '/*path' => 'pages#home'
end
