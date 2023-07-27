require 'open-uri'

class API::DalleResponsesController < ApplicationController
  before_action :open_client
  after_action :grab_image

  def create
    @entry = Entry.find(params[:entry_id])
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

  def grab_image
    @entry.image.attach(io: URI.parse(@response).open, filename: 'whatever.png')
  end
end
