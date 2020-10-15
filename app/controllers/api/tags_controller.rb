class Api::TagsController < ApplicationController
    def index
        @tags = Tag.all
        render :index
    end

    def show
        @tag = Tag.find(params[:id])
        render :show
    end

    def create
        
        @tag = Tag.new(tag_params)
        if @tag.save
            # debugger
            render "api/tags/show"
        else
            # debugger
            render :show
            # render json: @tag.errors.full_messages, status: 422
        end
    end

    def tag_params
        # debugger
        params.require(:tag).permit(:tag_name)
    end
end

