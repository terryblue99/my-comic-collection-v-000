class AddPayoutDateToComics < ActiveRecord::Migration[6.0]
  def change
    add_column :comics, :payout_date, :string
  end
end
