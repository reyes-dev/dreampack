class CurrentUserController < ApplicationController
  def index
    if current_user
      render json: { isLoggedIn: true }.to_json, status: :ok
    else
      render json: { isLoggedIn: false }.to_json, status: :ok
    end
  end
end
