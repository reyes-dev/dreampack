class API::NotesController < ApplicationController
  before_action :authenticate_user!

  def show
    note = current_user.entries.find(params[:entry_id]).note

    render json: note
  end

  def create
    note = Note.create(note_params)

    if note.save
      render json: note
    else
      render json: note.errors
    end
  end

  def update
    note = current_user.entries.find(params[:entry_id]).note

    if note
      note.update!(note_params)
      render json: note
    else
      render json: note.errors
    end
  end

  private

  def note_params
    params.require(:note).permit(:body)
  end
end
