class PaymentController < ApplicationController
  protect_from_forgery except: [:index]
  layout 'paiment'
  def index
  end
end
