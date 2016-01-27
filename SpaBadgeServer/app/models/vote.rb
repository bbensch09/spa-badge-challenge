class Vote < ActiveRecord::Base
  belongs_to :badge
  after_create :add_vote_to_badge

  def add_vote_to_badge
    badge = self.badge
    badge.vote_total += self.value
    badge.save
  end
end
