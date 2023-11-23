class AddComicForSalePrice < ActiveRecord::Migration[6.0]
  def change
    add_column :comics, :for_sale_price, :decimal, :precision => 8, :scale => 2, default: 0.00
  end
end