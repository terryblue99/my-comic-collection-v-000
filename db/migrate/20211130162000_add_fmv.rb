class AddFmv < ActiveRecord::Migration[6.0]
  def change
    add_column :comics, :fmv_low, :decimal, :precision => 8, :scale => 2, default: 0.00
    add_column :comics, :fmv_high, :decimal, :precision => 8, :scale => 2, default: 0.00
  end
end