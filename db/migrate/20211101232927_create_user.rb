class CreateUser < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.string :nom

      t.string :prenom
      t.string :email
      t.string :telephone
      t.string :adresse
      t.string :cp
      t.string :ville
      t.string :pays
      t.date :naissance_at
      t.text :observation

      t.boolean :cgv
      t.boolean :newsletter
    end
  end
end
