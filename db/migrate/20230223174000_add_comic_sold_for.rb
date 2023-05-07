class AddComicSoldFor < ActiveRecord::Migration[6.0]
  def change
    add_column :comics, :sold_for, :decimal, :precision => 8, :scale => 2, default: 0.00
  end
end