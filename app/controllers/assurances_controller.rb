class AssurancesController < ApplicationController
  before_action :set_assurance, only: %i[ show edit update destroy ]
   layout 'app'

  # GET /assurances or /assurances.json
  def index
    @assurances = Assurance.all
  end

  # GET /assurances/1 or /assurances/1.json
  def show
  end

  # GET /assurances/new
  def new
    @assurance = Assurance.new
  end

  # GET /assurances/1/edit
  def edit
  end

  # POST /assurances or /assurances.json
  def create
    @assurance = Assurance.new(assurance_params)

    respond_to do |format|
      if @assurance.save
        format.html { redirect_to @assurance, notice: "Assurance was successfully created." }
        format.json { render :show, status: :created, location: @assurance }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @assurance.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /assurances/1 or /assurances/1.json
  def update
    respond_to do |format|
      if @assurance.update(assurance_params)
        format.html { redirect_to @assurance, notice: "Assurance was successfully updated." }
        format.json { render :show, status: :ok, location: @assurance }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @assurance.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /assurances/1 or /assurances/1.json
  def destroy
    @assurance.destroy
    respond_to do |format|
      format.html { redirect_to assurances_url, notice: "Assurance was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_assurance
      @assurance = Assurance.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def assurance_params
      params.require(:assurance).permit(:name, :price,:content)
    end
end
