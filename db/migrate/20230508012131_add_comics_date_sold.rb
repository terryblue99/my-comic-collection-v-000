class AddComicsDateSold < ActiveRecord::Migration[6.0]
  def change
    add_column :comics, :date_sold, :string
  end
end
