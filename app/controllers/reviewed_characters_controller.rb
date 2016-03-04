class ReviewedCharactersController < ApplicationController
  def get_stats
    if params[:type] == "all"
      @all_review_characters = Character.where("lesson_num < #{current_user.lesson_current}")
      render json: @all_review_characters

    elsif params[:type] == "reviewstats"
      @characters_and_times_reviewed = Character.joins(:reviewed_characters).where("reviewed_characters.user_id = #{current_user.id}").group("characters.unicode_value").count
      @characters_and_times_correct = Character.joins(:reviewed_characters).where("reviewed_characters.user_id = #{current_user.id} AND reviewed_characters.response_correct = 't'").group("characters.unicode_value").count
      @characters_and_times_incorrect = Character.joins(:reviewed_characters).where("reviewed_characters.user_id = #{current_user.id} AND reviewed_characters.response_correct = 'f'").group("characters.unicode_value").count
      @summary_stats = @characters_and_times_reviewed.map do |char, times_reviewed|
        [char, {total: times_reviewed, correct: @characters_and_times_correct[char], incorrect: @characters_and_times_incorrect[char]}]
      end
      render json: @summary_stats

    elsif params[:type] == "lastreview"
      conn = ActiveRecord::Base.connection

        sql = <<-SQL
        SELECT
        CHARACTERS.*, reviewed_characters.response_correct
        FROM
        CHARACTERS
        INNER JOIN
        reviewed_characters
        ON
        characters.id = reviewed_characters.character_id
        WHERE
        reviewed_characters.user_id = '1'
        ORDER BY
        reviewed_characters.created_at DESC
        limit
        10;
      SQL

      recentReviews = conn.execute sql
      correct = []
      incorrect = []
      i = 0
      while i < recentReviews.count
        if recentReviews[i]['response_correct'] == "t"
          correct.push(recentReviews[i])
        else
          incorrect.push(recentReviews[i])
        end
        i += 1
      end
      render json: {correct: correct, incorrect: incorrect}

    else
      render json: "bad type"
    end
  end

  def get_to_review
    @all_review_characters = Character.where("lesson_num < #{current_user.lesson_current}").sample(10)
    render json: @all_review_characters
  end

  def create
    character_id = params[:id]
    user_id = current_user.id
    response_correct = params[:correct]
    if (response_correct == "true")
      response_correct = true
    else
      response_correct = false
    end

    @reviewed_character = ReviewedCharacter.new({character_id: character_id, user_id: user_id, response_correct: response_correct})
    if @reviewed_character.save
      render json: @reviewed_character
    else
      render json: "Bad Input"
    end
  end

  private
  def reviewed_character_params
    params.require(:reviewed_character).permit(:character_id, :response_correct)
  end
end
