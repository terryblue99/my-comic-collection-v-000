class AddDefaultValueToPayoutDate < ActiveRecord::Migration[6.0]
  def up
    change_column :comics, :payout_date, :string, :default => nil
  end

  def down
    change_column :comics, :payout_date, :string
  end
end
