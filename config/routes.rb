Rails.application.routes.draw do
  root 'pages#home'
  
  namespace :api do
    resources :entries
    resources :dream_signs
  end 

  get '/*path' => 'pages#home'
end
