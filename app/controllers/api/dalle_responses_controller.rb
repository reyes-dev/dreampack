class API::DalleResponsesController < ApplicationController
  before_action :open_client

  def create
    @prompt = params[:_json]
    @response = @client.images.generate(
      parameters: {
        prompt: @prompt,
        size: '256x256'
      }
    ).dig('data', 0, 'url')
    render plain: @response
  end

  private

  def open_client
    @client = OpenAI::Client.new
  end
end
