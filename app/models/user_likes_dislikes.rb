class UserLikesDislikes < ApplicationRecord
    validates :user_id, presence: true
    validates :post_id, presence: true
    validates :liked, presence: true
    validates :disliked, presence: true
  
    belongs_to :user
  end
  