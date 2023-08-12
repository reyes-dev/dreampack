class API::WhisperTranscriptionsController < ApplicationController
  before_action :open_client

  def create
    audio = params[:audio_data].tempfile.path.to_s
    response = @client.transcribe(
      parameters: {
        model: 'whisper-1',
        file: File.open(audio, 'rb')

      }
    )
    render plain: response['text']
  end

  private

  def open_client
    @client = OpenAI::Client.new
  end
end
