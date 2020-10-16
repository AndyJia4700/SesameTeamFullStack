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
        # hash_prop = {"a"=>nil, "about"=>nil, "an"=>nil, "and"=>nil, "are"=>nil, "but"=>nil, "for"=>nil, "in"=>nil, "into"=>nil, "is"=> nil, "of"=>nil, "on"=>nil, "or"=>nil, "out"=>nil, "the"=>nil, "to"=>nil, "with"=>nil, "without"=>nil}
        
        # new_param = tag_params[:tag_name].split(' ').map do |word|
        #     hash_prop.has_key?(word) ? word : word[0].upcase + word[1..-1]
        # end

        # @tag = Tag.new
        # @tag.tag_name = new_param.join(" ")

        @tag = Tag.new(tag_params)
        if @tag.save
            render "api/tags/show"
        else
            render :show
        end
    end

    def tag_params
        # debugger
        params.require(:tag).permit(:tag_name)
    end
end

