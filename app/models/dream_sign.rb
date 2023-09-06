class DreamSign < ApplicationRecord
  belongs_to :user
  validates :phrase, presence: true, uniqueness: true

  def self.phrases
    pluck(:phrase)
  end
end
