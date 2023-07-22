class API::ChatGPTResponsesController < ApplicationController
  before_action :open_client
  after_action :update_interpretation

  def create
    @entry = Entry.find(params[:entry_id])
    prompt = "Without giving a preface or introduction of yourself or your
              capabilities, please interpret the following dream: #{@entry.body}"
    @response = @client.chat(
      parameters: {
        model: 'gpt-3.5-turbo', # Required.
        messages: [{ role: 'user', content: prompt }], # Required.
        temperature: 0.7
      }
    ).dig('choices', 0, 'message', 'content')
  end

  private

  def open_client
    @client = OpenAI::Client.new
  end

  def update_interpretation
    @entry.interpretation.update(body: @response)
  end
end
