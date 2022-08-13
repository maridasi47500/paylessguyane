class RentalcarsController < ApplicationController
  def categorie
    @car=Car.find(params[:id])
  end
end
