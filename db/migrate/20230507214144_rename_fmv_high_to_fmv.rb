class RenameFmvHighToFmv < ActiveRecord::Migration[6.0]
  def change
    rename_column :comics, :fmv_high, :fmv
  end
end
