require 'open-uri'

class API::DalleResponsesController < ApplicationController
  before_action :authenticate_user!
  before_action :open_client
  after_action :grab_image, unless: -> { @empty_token || @response.nil? }

  def create
    @entry = current_user.entries.find(params[:entry_id])
    @prompt = params[:_json]
    unless @client.nil?
      @response = @client.images.generate(
        parameters: {
          prompt: @prompt,
          size: '256x256'
        }
      ).dig('data', 0, 'url')
    end
    render plain: @response
  end

  private

  def open_client
    @empty_token = current_user.openai_token.nil? || current_user.openai_token.empty?
    return if @empty_token

    @client = OpenAI::Client.new(access_token: current_user.openai_token)
  end

  def grab_image
    @entry.image.attach(io: URI.parse(@response).open, filename: 'whatever.png')
  end
end
