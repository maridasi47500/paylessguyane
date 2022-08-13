class GuyaneController < ApplicationController
  before_action :setarticle, only: [:show, :edit, :update]
  layout 'app', only: [:all]
  def index
    @articles=Article.all
  end
  def all
    @articles=Article.all
  end
  private
  def setarticle
    @article=Article.findbytitle(params[:id])
  end
end
