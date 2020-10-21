class EditUserTable < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :wallet, :integer
    add_column :users, :friends_id, :integer, array: true, default: []
    add_column :users, :likes_id, :integer, array: true, default: []
  end
end
