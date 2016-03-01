# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
# encode(Encoding.find('ASCII'), encoding_options).
require 'byebug'

encoding_options = {
  :invalid           => :replace,  # Replace invalid byte sequences
  :undef             => :replace,  # Replace anything not defined in ASCII
  :replace           => '',        # Use a blank for those replacements
  :universal_newline => true       # Always break lines with \n
}

HSK_level1 = File.new("#{Rails.root}/app/assets/hsklvl1.txt")

character_count = 0
HSK_level1.each_line do |line|
  create_params = line.split("\t")
  lesson_num = (character_count / 5) + 1
  options = {}
  if (create_params[0] && create_params[1] && create_params[2])
    options = {
      unicode_value: create_params[0].gsub(/\u0000/, ""),
      pinyin: create_params[1].gsub(/\u0000/, ""),
      other_translations: create_params[2].gsub(/\u0000/, ""),
      HSK_lvl: 1,
      lesson_num: lesson_num
    }
  end

  if (options[:pinyin] && options[:other_translations])
    possibleTranslations = options[:other_translations]
    measureWordIndex = possibleTranslations.index("CL:")
    if measureWordIndex
      possibleTranslations = possibleTranslations.slice(0, measureWordIndex)
    end
    possibleTranslations = possibleTranslations.gsub(",", ";").gsub("\"", "").gsub("↵", "").split(";")
    possibleTranslations = possibleTranslations.map do |translation|
      translation.gsub(/^\s/, "").gsub("\"", "").gsub(/\s$/, "")
    end
    possibleTranslations.delete('')
    options[:main_translation] = possibleTranslations[0]
    possibleTranslations.shift
    options[:other_translations] = possibleTranslations.join(', ')
    Character.create!(options)
    character_count += 1
  end
end

HSK_level1.close

example_user = User.create!({email: 'example@example.com', password: 'password'})
example_user.update(lesson_current: 4)
ReviewedCharacter.create!({character_id: Character.first.id, user_id: example_user.id, response_correct: true})
ReviewedCharacter.create!({character_id: Character.first.id, user_id: example_user.id, response_correct: true})
ReviewedCharacter.create!({character_id: Character.all[2].id, user_id: example_user.id, response_correct: true})
ReviewedCharacter.create!({character_id: Character.all[2].id, user_id: example_user.id, response_correct: false})
ReviewedCharacter.create!({character_id: Character.all[2].id, user_id: example_user.id, response_correct: false})
ReviewedCharacter.create!({character_id: Character.all[2].id, user_id: example_user.id, response_correct: true})
ReviewedCharacter.create!({character_id: Character.all[2].id, user_id: example_user.id, response_correct: true})
ReviewedCharacter.create!({character_id: Character.all[1].id, user_id: example_user.id, response_correct: false})
ReviewedCharacter.create!({character_id: Character.all[1].id, user_id: example_user.id, response_correct: false})
ReviewedCharacter.create!({character_id: Character.all[4].id, user_id: example_user.id, response_correct: true})
ReviewedCharacter.create!({character_id: Character.all[4].id, user_id: example_user.id, response_correct: false})
ReviewedCharacter.create!({character_id: Character.all[5].id, user_id: example_user.id, response_correct: true})
ReviewedCharacter.create!({character_id: Character.all[5].id, user_id: example_user.id, response_correct: false})
