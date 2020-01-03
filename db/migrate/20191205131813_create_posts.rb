class CreatePosts < ActiveRecord::Migration[5.2]
  def change
    create_table :posts do |t|
      t.string :name, null: false
      t.text :description, null: false
      t.string :image

      t.timestamps
    end
  end
end
