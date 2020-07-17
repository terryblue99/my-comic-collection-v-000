class ComicSerializer < ActiveModel::Serializer
  attributes :id, 
  :comic_name, 
  :comic_publisher,
  :comic_number
  :year_published,
  :cost,
  :user_id,
  :notes,
  :image
end