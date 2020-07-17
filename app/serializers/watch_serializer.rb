class WatchSerializer < ActiveModel::Serializer
  attributes :id, 
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
end