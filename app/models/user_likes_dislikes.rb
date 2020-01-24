class UserLikesDislikes < ApplicationRecord
    validates :user_id, presence: true
    validates :post_id, presence: true
    validates :liked, inclusion: [true, false] 
    validates :disliked, inclusion: [true, false] 
  
    belongs_to :user
  end
  