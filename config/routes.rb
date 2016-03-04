Rails.application.routes.draw do
  root to: "sessions#new"

  resources :users, only: [:new, :create, :show]
  resource :session, only: [:new, :create, :destroy]
  post '/guest_login', to: 'sessions#guest_login'
  get '/current_user', to: 'sessions#get_current_user'
  post '/users/update_lesson', to: 'users#update_lesson'
  get '/lessons/:num', to: 'characters#get_lesson'
  get '/level/:num', to: 'characters#get_level'
  get '/current_lesson', to: 'characters#get_current_lesson'
  post '/add_reviewed_character', to: 'reviewed_characters#create'
  get '/review_characters', to: 'reviewed_characters#get_to_review'
  get '/user_stats', to: 'reviewed_characters#get_stats'
end
