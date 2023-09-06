class AddUserIdToDreamSigns < ActiveRecord::Migration[7.0]
  def change
    add_reference :dream_signs, :user, null: false, foreign_key: true
  end
end
