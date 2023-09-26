class API::WhisperTranscriptionsController < ApplicationController
  require 'streamio-ffmpeg'
  before_action :authenticate_user!
  before_action :open_client

  def create
    audio = params[:audio_data].tempfile.path.to_s
    movie = FFMPEG::Movie.new(audio)
    movie.transcode('/tmp/output_file.wav')

    unless @client.nil?
      @response = @client.transcribe(
        parameters: {
          model: 'whisper-1',
          file: File.open('/tmp/output_file.wav', 'rb')

        }
      )
    end

    @response = @response['text'] unless @response.nil?
    render plain: @response
  end

  private

  def open_client
    @empty_token = current_user.openai_token.nil? || current_user.openai_token.empty?
    return if @empty_token

    @client = OpenAI::Client.new(access_token: current_user.openai_token)
  end
end
