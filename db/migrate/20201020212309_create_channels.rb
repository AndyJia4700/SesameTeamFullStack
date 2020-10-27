class CreateChannels < ActiveRecord::Migration[5.2]
  def change
    create_table :channels do |t|
      t.string :channel_name, index: true
      t.integer :server_id, index: true

      t.timestamps
    end
  end
end
