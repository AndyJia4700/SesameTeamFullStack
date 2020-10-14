class Api::ProjectsController < ApplicationController
    before_action :ensure_logged_in, only:[:create, :update, :destroy]
    skip_before_action :verify_authenticity_token

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
                if @project.update(project_params)
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
            :picture
        )
    end
end
