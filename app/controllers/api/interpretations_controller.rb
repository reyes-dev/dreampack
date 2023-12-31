class API::InterpretationsController < ApplicationController
  before_action :authenticate_user!

  def show
    interpretation = current_user.entries.find(params[:entry_id]).interpretation

    render json: interpretation
  end

  def create
    interpretation = Interpretation.create(interpretation_params)

    if interpretation.save
      render json: interpretation
    else
      render json: interpretation.errors
    end
  end

  def update
    interpretation = current_user.entries.find(params[:entry_id]).interpretation

    if interpretation
      interpretation.update!(interpretation_params)
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
