class BonplansController < ApplicationController
  before_action :set_bonplan, only: %i[ show edit update destroy ]
  layout 'app' 
  def all
    @bonplans = Bonplan.all
  end

  # GET /bonplans or /bonplans.json
  def index
    @bonplans = Bonplan.all
  end

  # GET /bonplans/1 or /bonplans/1.json
  def show
    render 'bonsplans/show'
  end

  # GET /bonplans/new
  def new
    @bonplan = Bonplan.new
  end

  # GET /bonplans/1/edit
  def edit
    render 'bonsplans/edit'
  end

  # POST /bonplans or /bonplans.json
  def create
    @bonplan = Bonplan.new(bonplan_params)

    respond_to do |format|
      if @bonplan.save
        format.html { redirect_to @bonplan, notice: "Bonplan was successfully created." }
        format.json { render :show, status: :created, location: @bonplan }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @bonplan.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /bonplans/1 or /bonplans/1.json
  def update
    respond_to do |format|
      if @bonplan.update(bonplan_params)
        format.html { redirect_to @bonplan, notice: "Bonplan was successfully updated." }
        format.json { render :show, status: :ok, location: @bonplan }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @bonplan.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /bonplans/1 or /bonplans/1.json
  def destroy
    @bonplan.destroy
    respond_to do |format|
      format.html { redirect_to bonplans_url, notice: "Bonplan was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_bonplan
      @bonplan = Bonplan.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def bonplan_params
      params.require(:bonplan).permit(:title, :content, :image,:othertitle)
    end
end
