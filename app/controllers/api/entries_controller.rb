class API::EntriesController < ApplicationController
  def index
    entry = Entry.all.order(created_at: :desc)
    render json: entry
  end

  def create
    entry = Entry.create(entry_params)

    if entry.save
      render json: entry, status: :created
    else
      render json: entry.errors
    end
  end

  def show
    entry = Entry.find(params[:id])
    render json: entry, serializer: EntrySerializer
  end

  def update
    entry = Entry.find(params[:id])
    entry.update!(entry_params)
  end

  def destroy
    entry = Entry.find(params[:id])
    entry.destroy

    render json: { message: 'Entry deleted!' }
  end

  private

  def entry_params
    params.require(:entry).permit(:title, :body, :image)
  end
end
