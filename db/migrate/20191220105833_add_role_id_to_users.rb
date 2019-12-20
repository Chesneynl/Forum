class AddRoleIdToUsers < ActiveRecord::Migration[5.2]
  def change
    add_reference :users, :roles, index: true
  end
end