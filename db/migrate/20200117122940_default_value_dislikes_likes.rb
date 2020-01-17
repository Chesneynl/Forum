class DefaultValueDislikesLikes < ActiveRecord::Migration[5.2]
  def change
    change_column :posts, :likes, :int, :default => 0
    change_column :posts, :dislikes, :int, :default => 0
  end
end
