class AddOpenaiTokenToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :openai_token, :string
  end
end
