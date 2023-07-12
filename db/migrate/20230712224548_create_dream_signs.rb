class CreateDreamSigns < ActiveRecord::Migration[7.0]
  def change
    create_table :dream_signs do |t|
      t.text :phrase
      t.text :description

      t.timestamps
    end
  end
end
