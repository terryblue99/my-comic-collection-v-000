class AddComicsDateForSale < ActiveRecord::Migration[6.0]
  def change
    add_column :comics, :date_for_sale, :string, :default => nil
  end
end