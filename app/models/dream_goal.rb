class DreamGoal < ApplicationRecord
  belongs_to :user
  validates :goal, presence: true

  def self.sidebar_goals
    where(achieved: false).order(created_at: :desc)[0...3]
  end
end
