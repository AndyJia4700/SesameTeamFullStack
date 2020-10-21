class CreateServers < ActiveRecord::Migration[5.2]
  def change
    create_table :servers do |t|
      t.string :server_name, index: true
      t.integer :owner_id, index: true

      t.timestamps
    end
  end
end
