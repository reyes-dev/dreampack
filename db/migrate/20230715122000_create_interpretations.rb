class CreateInterpretations < ActiveRecord::Migration[7.0]
  def change
    create_table :interpretations do |t|
      t.text :body
      t.references :entry, null: false, foreign_key: true

      t.timestamps
    end
  end
end
