Rails.application.routes.draw do
  root 'pages#home'
  
  namespace :api do
    resources :entrys
  end 

  get '/*path' => 'pages#home'
end
