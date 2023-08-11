require 'rails_helper'

RSpec.describe 'API::ChatGPTResponses', type: :request do
  describe 'Calling OpenAI API' do
    it 'returns a text response from chatgpt', :vcr do
      entry = create(:entry, body: 'I dreamt of a yellow elephant.')
      post api_entry_interpretation_chatgpt_response_path(entry_id: entry.id), params: { entry_id: entry.id }
      expect(response).to have_http_status(200)
      expect(response.body).not_to be_empty
    end
  end
end
