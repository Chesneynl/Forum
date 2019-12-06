class CreateRoles < ActiveRecord::Migration[5.2]
  def change
    create_table :roles do |t|
      t.string :name, unique: true, null: false

      t.timestamps null: false
    end
  end
end
