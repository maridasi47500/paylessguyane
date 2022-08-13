class CreateOption < ActiveRecord::Migration[6.0]
  def change
    create_table :options do |t|
      t.string :type
      t.string :name
      t.integer :price
      t.integer :qty
    end
    create_table :prestations do |t|
      t.string :name
    end
    create_table :carhaveoptions do |t|
      t.integer :car_id
      t.integer :option_id
    end
    create_table :carhaveprestations do |t|
      t.integer :car_id
      t.integer :prestation_id
    end

  end
end
