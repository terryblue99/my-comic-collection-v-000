class ChangeComicsTableFmvHigh < ActiveRecord::Migration[6.0]
  def change
    change_column :comics, :fmv_high, :decimal, :precision => 10, :scale => 2, default: 0.00
  end
end