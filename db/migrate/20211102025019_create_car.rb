class CreateCar < ActiveRecord::Migration[6.0]
  def change
    create_table :cars do |t|
      t.string :name
      t.string :image
      t.string :categorie
      t.integer :bagages
      t.boolean :clim
      t.boolean :manuelle
      t.string :essence
      t.integer :portes
      t.integer :places
      t.integer :min_price
    end
  end
end
