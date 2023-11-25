class CreateDreamGoals < ActiveRecord::Migration[7.0]
  def change
    create_table :dream_goals do |t|
      t.string :goal
      t.boolean :achieved, default: false, null: false
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
