class CharactersController < ApplicationController
    def get_lesson
      @lesson = Character.where(lesson_num: params[:num])
      render "get_lesson.json"
    end

    def get_level
      @level = Character.where(HSK_lvl: params[:num])
      render "get_level.json"
    end

    def get_current_lesson
      current_user_lesson = current_user.lesson_current
      @lesson = Character.where(lesson_num: current_user_lesson)
      render "get_lesson.json"
    end
end
