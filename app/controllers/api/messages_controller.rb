class Api::MessagesController < ApplicationController
    before_action :ensure_logged_in

    def index
        @messages = Message.all
        render :index
    end

    def show
        @message = Message.find(params[:id])
        render :show
    end

    def new
        @message = Message.new
    end

    def create
        @message = Message.create(message_params)
        if @message.save
            render :index
        end
    end

    def message_params
        params.require(:message).permit(:body, :author_id)
    end
end