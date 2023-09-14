class User < ApplicationRecord
  encrypts :openai_token

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :entries
  has_many :dream_signs
end
