class Api::ChannelsController < ApplicationController
    before_action :ensure_logged_in

    def index
        @channels = Channel.all
        render :index
    end

    def show
        @channel = Channel.find(params[:id])
        render :show
    end

    def new
        @channel = Channel.new
    end

    def create
        @channel = Channel.create(channel_params)
        if @channel.save
            render :index
        end
    end

    def channel_params
        params.require(:channel).permit(:channel_name)
    end
end