class API::InterpretationsController < ApplicationController
  def create
    interpretation = Interpretation.create(interpretation_params)

    if interpretation.save
      render json: interpretation
    else
      render json: interpretation.errors
    end
  end

  private

  def interpretation_params
    params.require(:interpretation).permit(:body)
  end
end
