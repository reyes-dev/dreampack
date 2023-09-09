class CurrentUserController < ApplicationController
  def index
    if current_user
      render json: current_user, status: :ok
    else
      head :no_content
    end
  end
end
