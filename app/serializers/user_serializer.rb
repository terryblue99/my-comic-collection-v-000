class UserSerializer < ActiveModel::Serializer
  attributes :id, 
  :email

  has_many :comics, serializer: WatchSerializer

end