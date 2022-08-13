class Manageqties < ActiveRecord::Migration[6.0]
  def change
    create_table  :carhaveassurances do |t|
      t.integer :car_id
      t.integer :assurance_id
      t.timestamps
    end
    create_table  :userhavecars do |t|
      t.integer :user_id
      t.integer :car_id
      t.timestamps
    end
    create_table  :userhaveassurances do |t|
      t.integer :userhavecar_id
      t.integer :assurance_id
      t.timestamps
    end
    create_table  :userhaveprestations do |t|
      t.integer :userhavecar_id
      t.integer :prestation_id
      t.timestamps
    end
    create_table  :userhaveoptions do |t|
      t.integer :userhavecar_id
      t.integer :option_id
      t.integer :qty
      t.timestamps
    end
  end
end
