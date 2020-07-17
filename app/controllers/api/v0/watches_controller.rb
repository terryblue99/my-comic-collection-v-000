class Api::V0::ComicsController < ApplicationController

  before_action :set_watch, only: [:update, :destroy]

  def index
      @comics = Watch.where(user_id: params[:user_id]).with_attached_image
      render json: @comics.map { |watch|
          watch.as_json.merge({ image: url_for(watch.image) })
      } 
  end

  def create
      @newWatch = Watch.create!(watch_params)
      
      if @newWatch
          session[:watch_id] = @newWatch.id
          render json: {
            status: :created,
            watch: @newWatch
          }
      else
          render json: { status: 500 }
      end
  end

  def update 
      @watch.update(watch_params)   
  end

  def destroy
      @watch.destroy
  end

  private

  def set_watch
      @watch = Watch.find(params[:id])
  end

  def watch_params
      # params hash keys (strong params)
      params.permit(
          :watch_name, 
          :watch_maker, 
          :movement, 
          :complications,
          :band, 
          :model_number, 
          :case_measurement,
          :water_resistance, 
          :date_bought, 
          :cost,
          :user_id,
          :notes,
          :image
      )
  end
  
end