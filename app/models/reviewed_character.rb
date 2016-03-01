class ReviewedCharacter < ActiveRecord::Base
  validates :user_id, :character_id, presence: true
  validates :response_correct, inclusion: [true, false]

  belongs_to :user

  belongs_to :character
end
