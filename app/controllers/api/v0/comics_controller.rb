class Api::V0::ComicsController < ApplicationController

  before_action :set_comic, only: [:update, :destroy]

  def index
      @comics = Comic.where(user_id: params[:user_id]).with_attached_image
      render json: @comics.map { |comic|
          comic.as_json.merge({ image: url_for(comic.image) })
      } 
  end

  def create
      @newComic = Comic.create!(comic_params)
      
      if @newComic
          session[:comic_id] = @newComic.id
          render json: {
            status: :created,
            comic: @newComic
          }
      else
          render json: { status: 500 }
      end
  end

  def update 
      @comic.update(comic_params)   
  end

  def destroy
      @comic.destroy
  end

  private

  def set_comic
      @comic = Comic.find(params[:id])
  end

  def comic_params
      # params hash keys (strong params)
      params.permit(
          :comic_name, 
          :comic_publisher,
          :comic_number
          :year_published,
          :cost,
          :notes,
          :image,
          :user_id
      )
  end
  
end