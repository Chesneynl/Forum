class UserLikesDislikes < ActiveRecord::Migration[5.2]
  def change
    create_table :user_likes_dislikes do |t|
      t.integer :user_id, :null => false, :references => [:users, :id]
      t.integer :post_id, :null => false, :references => [:posts, :id]
      t.boolean :liked
      t.boolean :disliked
    end
  end
end