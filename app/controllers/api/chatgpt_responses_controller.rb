class API::ChatGPTResponsesController < ApplicationController
  before_action :authenticate_user!
  before_action :open_client
  after_action :update_interpretation, unless: -> { @empty_token || @response.nil? }

  def create
    @entry = current_user.entries.find(params[:entry_id])
    prompt = "Without giving a preface or introduction of yourself or your
              capabilities, please interpret the following dream: #{@entry.body}"
    unless @client.nil?
      @response = @client.chat(
        parameters: {
          model: 'gpt-3.5-turbo', # Required.
          messages: [{ role: 'user', content: prompt }], # Required.
          temperature: 0.7
        }
      ).dig('choices', 0, 'message', 'content')
    end
    render plain: @response
  end

  private

  def open_client
    @empty_token = current_user.openai_token.nil? || current_user.openai_token.empty?
    return if @empty_token

    @client = OpenAI::Client.new(access_token: current_user.openai_token)
  end

  def update_interpretation
    @entry.interpretation.update(body: @response)
  end
end
