class ChangeWayflessEntityToString < ActiveRecord::Migration
  def up
    change_column :organisations, :wayfless_entity, :string, default: :null
  end

  def down
    change_column :organisations, :wayfless_entity, :integer, default: :null
  end
end
