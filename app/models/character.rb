class Character < ActiveRecord::Base
  validates :unicode_value, :pinyin, :main_translation, :HSK_lvl, :lesson_num,
                            presence: true

  has_many :reviewed_characters
end
