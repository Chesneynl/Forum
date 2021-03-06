# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_04_10_073918) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "post_comments", force: :cascade do |t|
    t.text "comment", null: false
    t.bigint "posts_id"
    t.bigint "users_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["posts_id"], name: "index_post_comments_on_posts_id"
    t.index ["users_id"], name: "index_post_comments_on_users_id"
  end

  create_table "posts", force: :cascade do |t|
    t.string "name", null: false
    t.text "description", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "attachment"
    t.string "#<ActiveRecord::ConnectionAdapters::PostgreSQL::TableDefinition"
    t.bigint "user_id"
    t.bigint "posts_categories_id"
    t.boolean "active"
    t.integer "likes", default: 0
    t.integer "dislikes", default: 0
    t.string "youtube_url"
    t.index ["posts_categories_id"], name: "index_posts_on_posts_categories_id"
    t.index ["user_id"], name: "index_posts_on_user_id"
  end

  create_table "posts_categories", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.string "image"
  end

  create_table "user_likes_dislikes", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "post_id", null: false
    t.boolean "liked"
    t.boolean "disliked"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", null: false
    t.string "username", null: false
    t.string "password_digest", null: false
    t.datetime "confirmed_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "admin", default: false
    t.boolean "online", default: false
  end

end
