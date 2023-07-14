class API::DreamSignsController < ApplicationController
  def create
    dream_sign = DreamSign.create(dream_sign_params)

    if dream_sign.save
      render json: dream_sign
    else
      render json: dream_sign.errors
    end
  end
 
  private

  def dream_sign_params 
    params.require(:dream_sign).permit(:phrase, :description)
  end 
end
