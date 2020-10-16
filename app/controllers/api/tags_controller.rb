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
            render "api/tags/show"
        else
            render :show
        end
    end

    def tag_params
        params.require(:tag).permit(:tag_name)
    end
end

