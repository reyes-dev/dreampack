class Interpretation < ApplicationRecord
  belongs_to :entry
  validates :entry_id, uniqueness: true
end
