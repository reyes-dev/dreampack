class Entry < ApplicationRecord
  has_one :interpretation, dependent: :destroy

  validates :title, presence: true, length: { in: 1..250 }
  validates :body, presence: true
end
