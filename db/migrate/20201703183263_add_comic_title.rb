class AddComicTitle < ActiveRecord::Migration[6.0]
  def change
    add_column :comics, :comic_title, :string
  end
end
