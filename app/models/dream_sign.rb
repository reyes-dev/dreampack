class DreamSign < ApplicationRecord
  validates :phrase, presence: true, uniqueness: true

  def self.phrases
    pluck(:phrase)
  end
end
