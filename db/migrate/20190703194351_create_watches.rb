class CreateWatches < ActiveRecord::Migration[5.2]
  def change
    create_table :watches do |t|
      t.string     :watch_name
      t.string     :watch_maker
      t.string     :movement
      t.string     :complications
      t.string     :band
      t.string     :model_number
      t.string     :case_measurement
      t.string     :water_resistance
      t.string     :date_bought
      t.decimal    :cost, :precision => 8, :scale => 2, default: 0.00
      t.string     :notes 
      t.integer    :user_id

      t.timestamps
    end
  end
end
