class API::EntriesController < ApplicationController
  before_action :authenticate_user!

  def index
    current_page = params[:page].to_i
    entry = current_user.entries.truncated_entries(current_page)
    render json: entry.to_json
  end

  def count
    entry_count = Entry.where(user_id: current_user.id).count
    render json: entry_count.to_json
  end

  def create
    entry = current_user.entries.create!(entry_params)

    if entry.save!
      render json: entry, status: :created
    else
      render json: entry.errors
    end
  end

  def show
    entry = current_user.entries.find(params[:id])
    render json: entry, serializer: EntrySerializer
  end

  def update
    entry = current_user.entries.find(params[:id])
    entry.update!(entry_params)
  end

  def destroy
    entry = current_user.entries.find(params[:id])
    entry.destroy

    render json: { message: 'Entry deleted!' }
  end

  private

  def entry_params
    params.require(:entry).permit(:title, :body, :image)
  end
end
