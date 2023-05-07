class RemoveFmvLowFromComics < ActiveRecord::Migration[6.0]
  def change
    remove_column :comics, :fmv_low, :decimal
  end
end
