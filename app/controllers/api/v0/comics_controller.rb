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
          :comic_number,
          :date_published,
          :comic_title,
          :cost,
          :for_sale_price,
          :sold_for,
          :net_payout,
          :date_for_sale,
          :date_sold,
          :date_shipped,
          :payout_date,
          :sale_venue,
          :grade,
          :fmv,
          :notes,
          :image,
          :user_id,
          :comic_related,
          :related_title,
          :related_input1,
          :related_input2,
          :related_input3,
          :related_input4,
          :related_input5,
          :related_input6,
          :related_input7,
          :related_input8
      )
  end
  
end