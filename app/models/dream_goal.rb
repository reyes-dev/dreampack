class DreamGoal < ApplicationRecord
  belongs_to :user
  validates :goal, presence: true, uniqueness: true
end
