class CreateProjects < ActiveRecord::Migration[5.2]
  def change
    create_table :projects do |t|
      t.string :project_title, null: false
      t.text :project_description
      t.integer :tag_id, array: true, default: []
      t.integer :user_id, null: false
      t.integer :member_id, array: true, default: []
      t.string :role, array: true, default: []

      t.timestamps
    end
    add_index :projects, :project_title, unique: true
    add_index :projects, :user_id
    

  end
end
