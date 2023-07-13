Rails.application.routes.draw do
  root 'pages#home'
  
  namespace :api do
    resources :entrys
    resources :dream_signs
  end 

  get '/*path' => 'pages#home'
end
