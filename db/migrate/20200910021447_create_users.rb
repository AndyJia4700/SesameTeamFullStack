class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :email, null: false
      t.string :session_token, null: false
      t.string :password_digest, null: false
      t.string :first_name
      t.string :last_name
      t.date :birthdate
      t.string :location
      t.text :about
      t.text :education
      t.string :resume_url
      t.string :personality, array: true, default: []
      t.string :interest, array: true, default: []
      t.string :skill, array: true, default:[]

      t.timestamps
    end

    add_index :users, :email, unique: true
    add_index :users, :session_token, unique: true
  end
end
