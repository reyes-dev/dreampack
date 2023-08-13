class API::DreamSignsController < ApplicationController
  def index
    dream_signs = DreamSign.all.map { |sign| sign.phrase }
    render json: dream_signs
  end

  def create
    dream_sign = DreamSign.create(dream_sign_params)

    if dream_sign.save
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
