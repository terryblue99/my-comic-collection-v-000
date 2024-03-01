class AddGradeToComics < ActiveRecord::Migration[6.0]
  def change
    add_column :comics, :grade, :string
  end
end
