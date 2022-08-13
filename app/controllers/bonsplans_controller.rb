class BonsplansController < ApplicationController
  before_action :set_bonplan, only: %i[ show edit update destroy ]
 layout 'app', only: [:all]
  # GET /bonsplans or /bonsplans.json
 def all
 end
  def index
    @bonplans = Bonplan.all
  end

  # GET /bonsplans/1 or /bonsplans/1.json
  def show
  end

  # GET /bonsplans/new
  def new
    @bonplan = Bonplan.new
  end

  # GET /bonsplans/1/edit
  def edit
  end

  # POST /bonsplans or /bonsplans.json
  def create
    @bonplan = Bonplan.new(bonplan_params)

    respond_to do |format|
      if @bonplan.save
        format.html { redirect_to @bonplan, notice: "Bonsplan was successfully created." }
        format.json { render :show, status: :created, location: @bonplan }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @bonplan.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /bonsplans/1 or /bonsplans/1.json
  def update
    respond_to do |format|
      if @bonplan.update(bonplan_params)
        format.html { redirect_to @bonplan, notice: "Bonsplan was successfully updated." }
        format.json { render :show, status: :ok, location: @bonplan }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @bonplan.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /bonsplans/1 or /bonsplans/1.json
  def destroy
    @bonplan.destroy
    respond_to do |format|
      format.html { redirect_to bonplans_url, notice: "Bonsplan was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_bonplan
      if params[:id]
      @bonplan = Bonplan.find(params[:id])
      elsif params[:title]
      @bonplan = Bonplan.findbytitle(params[:title])
      end
    end

    # Only allow a list of trusted parameters through.
    def bonplan_params
      params.require(:bonplan).permit(:title, :image, :content)
    end
end
