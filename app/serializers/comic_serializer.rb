class ComicSerializer < ActiveModel::Serializer
  attributes :id, 
  :comic_name, 
  :comic_publisher,
  :comic_title,
  :comic_number
  :date_published,
  :cost,
  :sold_for,
  :date_sold,
  :fmv,
  :user_id,
  :notes,
  :image
end