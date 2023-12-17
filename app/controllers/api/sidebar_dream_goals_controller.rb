class API::SidebarDreamGoalsController < ApplicationController
  def index
    dream_goals = current_user.dream_goals.sidebar_goals
    render json: dream_goals.to_json
  end
end
