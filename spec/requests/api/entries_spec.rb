require 'rails_helper'

RSpec.describe 'API::Entries', type: :request do
  describe 'GET /api/entries' do
    it 'GETs all the entries' do
      get api_entries_path
      expect(response).to have_http_status(200)
    end

    it 'Returns a list of all entries, from newest first' do
      first_entry = create(:entry)
      second_entry = create(:entry)
      get api_entries_path
      expect(json_body.count).to eq(2)
      latest_entry_json = json_body[0]
      expect(latest_entry_json).to eq({
                                        'id' => second_entry.id,
                                        'title' => second_entry.title,
                                        'image' => nil,
                                        'body' => second_entry.body
                                      })
    end

    it 'GETs a specific entry' do
      entry = create(:entry, title: 'title', body: 'body')
      get api_entry_path(id: entry.id)
      expect(response).to have_http_status(200)
      expect(json_body).to eq({
                                'id' => entry.id,
                                'title' => entry.title,
                                'image' => nil,
                                'body' => entry.body
                              })
    end
  end

  describe 'POST /api/entries' do
    it 'creates the entry' do
      entry_params = { entry: attributes_for(:entry) }

      post api_entries_path, params: entry_params

      expect(response.status).to eq 201
      expect(Entry.last.title).to eq entry_params[:entry][:title]
    end
  end

  describe 'PUT /api/entries' do
    it 'updates the entry' do
      entry = create(:entry)

      put api_entry_path(id: entry.id), params: { entry: attributes_for(:entry, title: 'Testing PUT') }

      expect(response).to have_http_status(204)
      expect(Entry.last.title).to eq 'Testing PUT'
    end

    it 'does not update entry with invalid data' do
      entry = create(:entry)
      expect { entry.update!(title: '', body: '') }.to raise_error(ActiveRecord::RecordInvalid)
    end
  end

  describe 'DELETE /api/entries' do
    it 'deletes the entry' do
      entry = create(:entry)

      delete api_entry_path(id: entry.id)

      expect { entry.reload }.to raise_error(ActiveRecord::RecordNotFound)
      expect(response.status).to eq 200
    end
  end
end
