class AddLikesDislikesToPosts < ActiveRecord::Migration[5.2]
  def change
    add_column :posts, :likes, :int
    add_column :posts, :dislikes, :int
  end
end
