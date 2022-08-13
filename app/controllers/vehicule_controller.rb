class VehiculeController < ApplicationController
  def index
    @cars = Car.all
  end
end
