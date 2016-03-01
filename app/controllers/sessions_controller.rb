class SessionsController < ApplicationController
  def new
  end

  def create
    user = User.find_by_credentials(
      params[:user][:email],
      params[:user][:password]
    )

    if user
      sign_in(user)
      redirect_to user_url(user)
    else
      flash.now[:errors] = ["Invalid username or password"]
      render :new
    end
  end

  def destroy
    sign_out
    @current_user = nil
    render json: @current_user
  end

  def get_current_user
    @current_user = current_user
    render "get_current_user.json"
  end
end
