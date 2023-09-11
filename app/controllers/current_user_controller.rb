class CurrentUserController < ApplicationController
  def index
    if current_user
      render json: current_user, status: :ok
    else
      render json: {}, status: :no_content
    end
  end
end
