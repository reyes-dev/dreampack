require 'rails_helper'

RSpec.describe 'API::Notes', type: :request do
  describe 'GET /api/entries/:id/interpretation' do
    it 'GETs a specific entry note' do
      entry = create(:entry)

      get api_entry_note_path(entry_id: entry.id)

      expect(response).to have_http_status(200)
      expect(json_body).to include({
                                     'id' => entry.note.id,
                                     'entry_id' => entry.id,
                                     'body' => entry.note.body
                                   })
    end
  end

  describe 'POST /api/entries/:id/note' do
    it 'creates the note' do
      entry = create(:entry)

      expect(Note.where(entry_id: entry.id)).to exist
    end
  end

  describe 'PUT /api/entries/:id/note' do
    it 'updates the note' do
      entry = create(:entry)
      updated_note_body = 'I forgot to write tests the night before this dream.'

      put api_entry_note_path(entry_id: entry.id),
          params: { id: entry.note.id,
                    note: attributes_for(:note, body: updated_note_body) }
      entry.reload
      expect(entry.note.body).to eq(updated_note_body)
    end
  end

  describe 'DELETE /api/entries/:id/note' do
    it 'deletes the note after entry deletion' do
      entry = create(:entry)
      note = entry.note

      expect(Note.all).to include note

      delete api_entry_path(id: entry.id)

      expect(response.status).to eq 200
      expect(Note.all).not_to include Note
    end
  end
end
