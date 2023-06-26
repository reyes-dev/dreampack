class EntrysController < ApplicationController
  def create
    entry = Entry.create(entry_params)
    
    if entry.save
      render json: entry 
    else
      render json: entry.errors
    end
  end

  private

  def entry_params 
    params.require(:entry).permit(:title, :body)
  end 
end
