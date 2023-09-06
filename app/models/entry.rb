class Entry < ApplicationRecord
  belongs_to :user
  after_create :add_interpretation
  has_one :interpretation, dependent: :destroy
  has_one_attached :image

  validates :title, presence: true, length: { in: 1..250 }
  validates :body, presence: true

  def self.truncated_entries
    order(created_at: :desc).pluck(:id, :title, :body, :created_at).map do |id, title, body, created_at|
      [id, title, body.split[0..20].join(' ').concat('...'), created_at.strftime('%B %d, %Y')]
    end
  end

  private

  def add_interpretation
    create_interpretation(body: '')
  end
end
