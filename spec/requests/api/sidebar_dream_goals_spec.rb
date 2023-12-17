require 'rails_helper'

RSpec.describe 'SidebarDreamGoals', type: :request do
  describe 'GET /index' do
    it 'returns 3 dream goals' do
      get api_dream_goals_path
      expect(response).to have_http_status(200)
    end
  end
end
