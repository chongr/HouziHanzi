class CreateCharacters < ActiveRecord::Migration
  def change
    create_table :characters do |t|
      t.string :unicode_value, null: false
      t.string :pinyin, null: false
      t.string :main_translation, null: false
      t.string :other_translations
      t.integer :HSK_lvl, null: false
      t.integer :lesson_num, null: false

      t.timestamps null: false
    end
  end
end
