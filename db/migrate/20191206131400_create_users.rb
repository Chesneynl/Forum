class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :email, unique: true, null: false 
      t.string :username, unique: true, null: false 
      t.string :password_digest, null: false
      t.timestamp :confirmed_at

      t.timestamps null: false
    end
  end
end
