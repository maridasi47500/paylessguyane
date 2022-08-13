# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_11_02_225129) do

  create_table "articles", force: :cascade do |t|
    t.string "title"
    t.string "othertitle"
    t.string "image"
    t.text "content"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "bonplans", force: :cascade do |t|
    t.string "title"
    t.string "othertitle"
    t.string "image"
    t.text "content"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "carhaveassurances", force: :cascade do |t|
    t.integer "car_id"
    t.integer "assurance_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "carhaveoptions", force: :cascade do |t|
    t.integer "car_id"
    t.integer "option_id"
  end

  create_table "carhaveprestations", force: :cascade do |t|
    t.integer "car_id"
    t.integer "prestation_id"
  end

  create_table "cars", force: :cascade do |t|
    t.string "name"
    t.string "image"
    t.string "categorie"
    t.integer "bagages"
    t.boolean "clim"
    t.boolean "manuelle"
    t.string "essence"
    t.integer "portes"
    t.integer "places"
    t.integer "min_price"
    t.integer "maxkm"
  end

  create_table "options", force: :cascade do |t|
    t.string "type"
    t.string "name"
    t.integer "price"
    t.boolean "qty"
    t.text "content"
  end

  create_table "prestations", force: :cascade do |t|
    t.string "name"
  end

  create_table "userhaveassurances", force: :cascade do |t|
    t.integer "userhavecar_id"
    t.integer "assurance_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "userhavecars", force: :cascade do |t|
    t.integer "user_id"
    t.integer "car_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "userhaveoptions", force: :cascade do |t|
    t.integer "userhavecar_id"
    t.integer "option_id"
    t.integer "qty"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "userhaveprestations", force: :cascade do |t|
    t.integer "userhavecar_id"
    t.integer "prestation_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "nom"
    t.string "prenom"
    t.string "email"
    t.string "telephone"
    t.string "adresse"
    t.string "cp"
    t.string "ville"
    t.string "pays"
    t.date "naissance_at"
    t.text "observation"
    t.boolean "cgv"
    t.boolean "newsletter"
  end

end
