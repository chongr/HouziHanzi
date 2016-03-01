class UsersController < ApplicationController
  before_filter :require_signed_in!, only: :show
  before_filter :ensure_user, only: :show

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      sign_in(@user)
      redirect_to user_url(@user)
    else
      flash.now[:errors] = @user.errors.full_messages
      render :new
    end

  end

  def show
    @user = User.find_by(id: params[:id])
  end

  def ensure_user
    if current_user.id != params[:id]
      @user = current_user
      render :show
    end
  end

  def update_lesson
    @user = current_user
    current_lesson = @user.lesson_current
    @user.update!(lesson_current: current_lesson + 1)
    render "get_current_user.json"
  end

  private
  def user_params
    params.require(:user).permit(:password, :email)
  end
end
