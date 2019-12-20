class AddCategoryIdToPosts < ActiveRecord::Migration[5.2]
  def change
    add_reference :posts, :posts_categories, index: true
  end
end
