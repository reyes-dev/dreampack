class API::DreamSignsController < ApplicationController
  before_action :authenticate_user!

  def index
    dream_signs = current_user.dream_signs.phrases
    render json: dream_signs.to_json
  end

  def create
    dream_sign = current_user.dream_signs.create(dream_sign_params)

    if dream_sign.save!
      render json: dream_sign, status: :created
    else
      render json: dream_sign.errors
    end
  end

  private

  def dream_sign_params
    params.require(:dream_sign).permit(:phrase, :description)
  end
end
