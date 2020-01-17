class UserLikesDislikesTimestamps < ActiveRecord::Migration[5.2]
  def change
    add_timestamps :user_likes_dislikes, null: true 
  end
end
