class Api::UserController < ApplicationController
    def index
        @users = User.all
    end

    def show
        @user = User.find(params[:id])
    end

    def create
        @user = User.new(user_params)
    end

    private

    def user_params
        params.require(:user).permit(:username, :email, :password)
    end

end