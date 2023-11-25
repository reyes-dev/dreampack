require 'rails_helper'

RSpec.describe 'DreamGoals', type: :request do
  describe 'GET /api/dream_goals' do
    it 'returns all dream goals' do
      get api_dream_goals_path
      expect(response).to have_http_status(200)
    end

    it 'returns a list of all dream goals' do
      first_dream_sign = create(:dream_goal, goal: 'Write a good test.')
      second_dream_sign = create(:dream_goal, goal: 'Pass all tests as green.')
      get api_dream_goals_path
      expect(json_body.count).to eq(2)
    end
  end

  describe 'POST /api/dream_goals' do
    it 'creates a new dream goal' do
      dream_goal_params = { dream_goal: attributes_for(:dream_goal) }

      post api_dream_goals_path, params: dream_goal_params

      expect(response).to have_http_status(201)
      expect(DreamGoal.last.goal).to eq dream_goal_params[:dream_goal][:goal]
    end
  end
end
