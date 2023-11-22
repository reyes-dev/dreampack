class AddEntryIdToNotes < ActiveRecord::Migration[7.0]
  def change
    add_reference :notes, :entry, null: false, foreign_key: true
  end
end
