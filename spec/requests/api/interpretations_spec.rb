require 'rails_helper'

RSpec.describe 'API::Interpretations', type: :request do
  describe 'GET /api/entries/:id/interpretation' do
    it 'GETs a specific interpretation' do
      entry = create(:entry)

      get api_entry_interpretation_path(entry_id: entry.id)

      expect(response).to have_http_status(200)
      expect(json_body).to include({
                                     'id' => entry.interpretation.id,
                                     'entry_id' => entry.id,
                                     'body' => entry.interpretation.body
                                   })
    end
  end

  describe 'POST /api/entries/:id/interpretation' do
    it 'creates the interpretation' do
      entry = create(:entry)

      expect(Interpretation.where(entry_id: entry.id)).to exist
    end
  end

  describe 'PUT /api/entries/:id/interpretation' do
    it 'updates the interpretation' do
      entry = create(:entry)
      updated_interpretation_body = 'Your dream means you desire to write better tests.'

      put api_entry_interpretation_path(entry_id: entry.id),
          params: { id: entry.interpretation.id,
                    interpretation: attributes_for(:interpretation, body: updated_interpretation_body) }
      entry.reload
      expect(entry.interpretation.body).to eq(updated_interpretation_body)
    end
  end

  describe 'DELETE /api/entries/:id/interpretation' do
    it 'deletes the interpretation' do
      entry = create(:entry)
      interpretation = entry.interpretation

      expect(Interpretation.all).to include interpretation

      delete api_entry_path(id: entry.id)

      expect(response.status).to eq 200
      expect(Interpretation.all).not_to include interpretation
    end
  end
end
