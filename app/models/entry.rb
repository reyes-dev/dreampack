class Entry < ApplicationRecord
  validates :title, presence: true, length: { in: 1..250 }
  validates :body, presence: true
end
