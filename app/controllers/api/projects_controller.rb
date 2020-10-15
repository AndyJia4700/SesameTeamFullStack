class Api::ProjectsController < ApplicationController
    before_action :ensure_logged_in, only:[:create, :update, :destroy]
    skip_before_action :verify_authenticity_token

    # def check_tag_id
    #     @tags = Tag.all
    #     project_params[:tag_id].split(',').map do |tag|
    #        @tags.find_by("tag_name": tag) ? @tags.find_by("tag_name": tag).id : nil
    #     end
    # end

    def index
        @projects = Project.all.includes(:leader)
        render :index
    end

    def show
        @project = Project.find(params[:id])
        render :show
    end

    def new
        @project = Project.new
    end

    def edit
        @project = Project.find(params[:id])
    end

    def create
        updatedrole = project_params[:role].split('üü').map do |ele|
            ele.split('ÿÿ').each do |word|
                word[0] == ',' ? word[0] = '' : word
            end
        end
        @project = Project.new(project_params)
        @project.leader_id = current_user.id
        @project.role = updatedrole
        
        if @project.save
            render :show
        else
            render json: @project.errors.full_messages, status: 422
        end
    end

    def update
        
        @project = Project.find(params[:project][:id])
        
        if @project && @project.leader_id == current_user.id
                updatedrole = project_params[:role].split('üü').map do |ele|
                    ele.split('ÿÿ').each do |word|
                        word[0] == ',' ? word[0] = '' : word
                    end
                end

                @tags = Tag.all
                tag_id = project_params[:tag_id].split(',').map {|tag|@tags.find_by("tag_name": tag) ? @tags.find_by("tag_name": tag).id : tag.to_i}
                # debugger
                if @project.update(project_params)
                    @project.update(tag_id: tag_id)
                    @project.update(role: updatedrole)
                    render :show
                else
                    render json: @project.errors.full_messages, status: 422
                end
            # end
        else
            
            render json: @project.errors.full_messages, status: 422
        end
    end

    def destroy

        @project = Project.find(params[:id])
        if @project && @project.leader_id == current_user.id
            @project.destroy
        end
    end

    private
    

    def project_params
        # debugger
        params.require(:project).permit(
            :project_title, 
            :project_description, 
            :role,
            :leader_id,
            :tag_id,
            :picture
        )
    end
end
