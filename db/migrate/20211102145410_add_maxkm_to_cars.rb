class AddMaxkmToCars < ActiveRecord::Migration[6.0]
  def change
    add_column :cars, :maxkm, :integer
  end
end
