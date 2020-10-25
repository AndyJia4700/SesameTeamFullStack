class Api::UsersController < ApplicationController
    before_action :ensure_logged_in, only:[:update]
    skip_before_action :verify_authenticity_token

    def index
        @users = User.all
    end

    def show
        @user = User.find(params[:id])
    end

    def edit
        @user = User.find(params[:id])
    end

    def create
        @user = User.new(user_params)
        if @user.save
            login(@user)
            render "api/users/show"
        else
            render json: @user.errors.full_messages, status: 422
        end
    end

    def update
        @user = User.find(params[:user][:id])
        if @user && @user.id == current_user.id
            if @user.update(user_params)
                @user.update(skill: user_params["skill"].split(",") )
                @user.update(interest: user_params["interest"].split(",") )
                @user.update(personality: user_params["personality"].split(",") )
                render :show
            else
                render json: @user.errors.full_messages, status: 422
            end
        end
    end

    private

    def user_params
        params.require(:user).permit(
            :email, 
            :password, 
            :first_name, 
            :last_name, 
            :birthdate, 
            :location, 
            :about, 
            :education, 
            :resume_url, 
            :personality, 
            :interest, 
            :photo, 
            :skill,
            :wallet
        )
    end

end