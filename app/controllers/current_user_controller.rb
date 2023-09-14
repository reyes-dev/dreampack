class CurrentUserController < ApplicationController
  def index
    if current_user
      render json: { email: current_user.email }, status: :ok
    else
      render json: {}, status: :no_content
    end
  end
end
