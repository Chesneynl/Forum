class CreatePostsCategories < ActiveRecord::Migration[5.2]
  def change
    create_table :posts_categories do |t|
      t.string :name
      t.text :description
      t.string :image
    end
  end
end
