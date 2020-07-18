class CreateComics < ActiveRecord::Migration[6.0]
  def change
    create_table :comics do |t|
      t.string     :comic_name
      t.string     :comic_publisher
      t.string     :comic_number
      t.string     :year_published
      t.decimal    :cost, :precision => 8, :scale => 2, default: 0.00
      t.string     :notes 
      t.integer    :user_id

      t.timestamps
    end
  end
end
