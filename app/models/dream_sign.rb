class DreamSign < ApplicationRecord
  before_create :squish_phrase
  belongs_to :user
  validates :phrase, presence: true, uniqueness: true

  def self.phrases
    pluck(:phrase)
  end

  private

  def squish_phrase
    self.phrase = phrase.squish
  end
end
