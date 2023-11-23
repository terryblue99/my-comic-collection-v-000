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
  :payout_date,
  :sale_venue,
  :fmv,
  :user_id,
  :notes,
  :image
end