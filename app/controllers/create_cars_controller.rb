class CreateCarsController < ApplicationController
  before_action :set_create_car, only: %i[ show edit update destroy ]

  # GET /create_cars or /create_cars.json
  def index
    @create_cars = CreateCar.all
  end

  # GET /create_cars/1 or /create_cars/1.json
  def show
  end

  # GET /create_cars/new
  def new
    @create_car = CreateCar.new
  end

  # GET /create_cars/1/edit
  def edit
  end

  # POST /create_cars or /create_cars.json
  def create
    @create_car = CreateCar.new(create_car_params)

    respond_to do |format|
      if @create_car.save
        format.html { redirect_to @create_car, notice: "Create car was successfully created." }
        format.json { render :show, status: :created, location: @create_car }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @create_car.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /create_cars/1 or /create_cars/1.json
  def update
    respond_to do |format|
      if @create_car.update(create_car_params)
        format.html { redirect_to @create_car, notice: "Create car was successfully updated." }
        format.json { render :show, status: :ok, location: @create_car }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @create_car.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /create_cars/1 or /create_cars/1.json
  def destroy
    @create_car.destroy
    respond_to do |format|
      format.html { redirect_to create_cars_url, notice: "Create car was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_create_car
      @create_car = CreateCar.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def create_car_params
      params.require(:create_car).permit(:name, :image, :categorie, :bagages, :clim, :manuelle, :essence, :portes, :places, :min_price)
    end
end
