class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :email, null: false
      t.string :password_digest, null: false
      t.string :session_token, null: false
      t.integer :lesson_current, null: false, default: 1

      t.timestamps null: false
    end
  end
end
