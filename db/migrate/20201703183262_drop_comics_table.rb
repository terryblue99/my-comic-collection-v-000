class DropComicsTable < ActiveRecord::Migration[6.0]
  def up
    drop_table :comics
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end

