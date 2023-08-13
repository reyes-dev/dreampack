require 'rails_helper'

RSpec.describe 'API::DreamSigns', type: :request do
  describe 'GET /api/dream_signs' do
    it 'returns all dream signs' do
      get api_dream_signs_path
      expect(response).to have_http_status(200)
    end

    it 'returns a list of all dream signs' do
      first_dream_sign = create(:dream_sign)
      second_dream_sign = create(:dream_sign, phrase: 'Pink dog')
      get api_dream_signs_path
      expect(json_body.count).to eq(2)
    end
  end

  describe 'POST /api/dream_signs' do
    it 'creates a new dream sign' do
      dream_sign_params = { dream_sign: attributes_for(:dream_sign) }

      post api_dream_signs_path, params: dream_sign_params

      expect(response).to have_http_status(201)
      expect(DreamSign.last.phrase).to eq dream_sign_params[:dream_sign][:phrase]
    end
  end
end
