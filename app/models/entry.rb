class Entry < ApplicationRecord
  after_create :add_interpretation
  has_one :interpretation, dependent: :destroy

  validates :title, presence: true, length: { in: 1..250 }
  validates :body, presence: true

  private

  def add_interpretation
    create_interpretation(body: '')
  end
end
