class ReservationController < ApplicationController
  layout 'selectcar'
  protect_from_forgery except: [:reserver]
  def savedetails
    @user=User.new(user_params)
    if @user.save
      redirect_to paiement_banque_path
    end

  end
  def validation


  end
  def reserver
    @user=User.new(user_params)

    @contract=Userhavecar.createnewoptions(params[:options], params[:id])
  end
  def show
    @car=Car.find(params[:id])
    @car.typecommande=params[:type]
  end
  def index
    @cars=Car.dispo
  end
  private
  def user_params
    params.permit(:email,:nom, :prenom, :telephone, :adresse, :cp, :ville, :pays, :naissance_at, :observation, :cgv, :newsletter)
  end
end
