class CreateReviewedCharacters < ActiveRecord::Migration
  def change
    create_table :reviewed_characters do |t|
      t.integer :user_id, null: false
      t.integer :character_id, null: false
      t.boolean :response_correct

      t.timestamps null: false
    end

    add_index :reviewed_characters, :user_id
    add_index :reviewed_characters, :character_id
  end
end
