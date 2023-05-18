class AddSaleVenueToComics < ActiveRecord::Migration[6.0]
  def change
    add_column :comics, :sale_venue, :string
  end
end
