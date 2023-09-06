class AddUserIdToEntries < ActiveRecord::Migration[7.0]
  def change
    add_reference :entries, :user, null: false, foreign_key: true
  end
end
