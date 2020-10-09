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
        @project = Project.new(project_params)
        @project.leader_id = current_user.id
        # debugger
        if @project.save
            # debugger
            render :show
        else
            # debugger
            render json: @project.errors.full_messages, status: 422
        end
    end

    def update
        
        @project = Project.find(params[:project][:id])
        if @project && @project.leader_id == current_user.id
            if @project.update(project_params)
                @project.update(role: project_params["role"].split(","))
                render :show
            else
                render json: @project.errors.full_messages, status: 422
            end
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
        params.require(:project).permit(:project_title, :project_description, :leader_id, :role, :picture)
    end
end
