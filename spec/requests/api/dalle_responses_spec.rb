require 'rails_helper'

RSpec.describe 'API::DalleResponses', type: :request do
  describe 'Calling DallE2 API' do
    it 'returns a text url response', :vcr do
      allow_any_instance_of(API::DalleResponsesController).to receive(:grab_image)
      entry = create(:entry, body: 'A blue backpack')

      post api_entry_dalle_responses_path(entry_id: entry.id), params: { entry_id: entry.id, _json: entry.body }

      expect(response).to have_http_status(200)
      expect(response.body).not_to be_empty
    end
  end
end
