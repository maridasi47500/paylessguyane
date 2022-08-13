Rails.application.routes.draw do
  get 'bons-plans/all', to: 'bonsplans#all'
  resources :articles
  resources :bonplans, controller: 'bonplans' do
    collection do
      get 'all'
    end
  end
  resources :articles, controller: 'guyane', path: 'guyane' do
    collection do
      get 'all'
    end
  end

  resources :prestations
  get 'rentalcars/categorie'
  resources :assurances
  resources :options
  resources :cars
  get "/rental-cars/categorie/:id/:cat", to: "rentalcars#categorie", as: :rentalcarcat
  get 'payment/index'
  get 'guyane/index'
  get 'payless/index'
  get 'contact/index'
  get 'bonsplans/index'
  get 'reservation/index'
  get 'vehicule/index'
  get 'welcome/index'
  get 'saved_resource.html', to: "welcome#save"
  get 'reservation/:id', to:'reservation#show', as: :reservcar


  get 'paiement/banque', to:'payment#index'

  get 'reservation', to:'reservation#index'



  post 'reservation/validation', to:'reservation#savedetails'
  post 'reservation/:id', to:'reservation#reserver', as: :reservthecar#, constraints => {id: /\d+/}
  post 'reservation/:id/tarif', to:'reservation#tarif', as: :tarifdelalocation#, constraints => {id: /\d+/}




  get 'contact', to: 'contact#index'
  get 'vehicule', to: 'vehicule#index'
  get 'bons-plans', to: 'bonsplans#index'
  get 'bons-plans/:title', to: 'bonsplans#show', as: :bplan
  get 'bons-plans/:id/edit', to: 'bonsplans#edit'
  get 'bons-plans/all', to: 'bonsplans#all'

  get 'contact', to: 'payless#index'
  get 'plus-payless', to: 'payless#index'
  get 'guyane', to: 'guyane#index'
  root to: "welcome#index"
end
