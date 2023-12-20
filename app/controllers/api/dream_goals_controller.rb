class API::DreamGoalsController < ApplicationController
  before_action :authenticate_user!

  def index
    dream_goals = current_user.dream_goals.where(achieved: false).order(created_at: :desc).all
    render json: dream_goals.to_json
  end

  def create
    dream_goal = current_user.dream_goals.create!(dream_goal_params)

    if dream_goal.save!
      render json: dream_goal, status: :created
    else
      render json: dream_goal.errors
    end
  end

  def update
    dream_goal = current_user.dream_goals.find(params[:id])
    dream_goal.update!(dream_goal_params)
  end

  def destroy
    dream_goal = current_user.dream_goals.find(params[:id])
    dream_goal.destroy

    render json: { message: 'Dream goal deleted!' }
  end

  private

  def dream_goal_params
    params.require(:dream_goal).permit(:goal, :achieved)
  end
end
