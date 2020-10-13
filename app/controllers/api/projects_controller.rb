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
        # debugger
        
        if @project && @project.leader_id == current_user.id
            
            if @project.role.flatten == params.require(:project).permit(:role)["role"].split(',')
                if @project.update(
                        project_title: project_params[:project_title],
                        project_description: project_params[:project_description],
                        picture: project_params[:picture],
                    )

                    render :show
                else
                    render json: @project.errors.full_messages, status: 422
                end
            else
                updatedrole = project_params[:role].split('%%').map do |ele|
                    ele.split('^^').each do |word|
                        word[0] == ',' ? word[0] = '' : word
                    end
                end
                if @project.update(
                        project_title: project_params[:project_title],
                        project_description: project_params[:project_description],
                        picture: project_params[:picture],
                        role: updatedrole             
                    )
                    render :show
                else
                    render json: @project.errors.full_messages, status: 422
                end
            end
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
