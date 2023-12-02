class AddComicsDateShipped < ActiveRecord::Migration[6.0]
  def change
    add_column :comics, :date_shipped, :string
  end
end
