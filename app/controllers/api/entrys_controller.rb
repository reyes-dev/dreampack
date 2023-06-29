class API::EntrysController < ApplicationController
  def index
    entry = Entry.all.order(created_at: :desc)
    render json: entry 
  end

  def create
    entry = Entry.create(entry_params)
    
    if entry.save
      render json: entry 
    else
      render json: entry.errors
    end
  end

  def show
    entry = Entry.find(params[:id])
    render json: entry
  end

  def update
    entry = Entry.find(params[:id])
    entry.update!(entry_params)
  end

  private

  def entry_params 
    params.require(:entry).permit(:title, :body)
  end 
end
