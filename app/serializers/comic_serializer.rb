class ComicSerializer < ActiveModel::Serializer
  attributes :id, 
  :comic_name, 
  :comic_publisher,
  :comic_title,
  :comic_number
  :date_published,
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
  :user_id,
  :notes,
  :image
end