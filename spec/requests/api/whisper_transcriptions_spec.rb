require 'rails_helper'

RSpec.describe 'API::WhisperTranscriptions', type: :request do
  describe 'Calling Whisper API' do
    it 'returns a text response', vcr: { record: :new_episodes } do
      uploaded_audio = fixture_file_upload("#{Rails.root}/spec/fake_data/audio.wav", 'audio/wav')
      post api_whisper_transcriptions_path, params: { audio_data: uploaded_audio }
      expect(response).to have_http_status(200)
      expect(response.body).not_to be_empty
    end
  end
end
