Rails.application.routes.draw do

  # Confirmed
  resources :registrations, only: :create
  resources :sessions, only: :create
  resources :accounts, only: :show do
    resources :trips, only: [:show, :index]
  end

  # Review


  resources :trips, only: [:create, :update] do
    resources :activities, except: [:new, :edit] do
      resources :comments, only: [:create]
    end
  end
  resources :activities, only: :create

  post '/friends', to: 'accounts#friends'
  post '/location', to: 'locations#location'
  get '/set-account', to: 'accounts#set_account'
  post '/searchactivities', to: 'activities#fetch'
  post '/change-date', to: 'trips#change_date'
  post '/leavetrip', to: 'trips#leave'
  post '/deletetrip', to: 'trips#delete'
end
