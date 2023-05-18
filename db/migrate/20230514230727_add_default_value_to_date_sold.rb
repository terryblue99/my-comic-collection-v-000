class AddDefaultValueToDateSold < ActiveRecord::Migration[6.0]
  def up
    change_column :comics, :date_sold, :string, :default => nil
  end

  def down
    change_column :comics, :date_sold, :string
  end
end
