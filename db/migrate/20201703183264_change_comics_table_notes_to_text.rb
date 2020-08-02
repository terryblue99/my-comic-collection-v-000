class ChangeComicsTableNotesToText < ActiveRecord::Migration[6.0]
  def change
    change_column :comics, :notes, :text
  end
end
