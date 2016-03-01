# encoding: UTF-8
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

ActiveRecord::Schema.define(version: 20160225200411) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "characters", force: :cascade do |t|
    t.string   "unicode_value",      null: false
    t.string   "pinyin",             null: false
    t.string   "main_translation",   null: false
    t.string   "other_translations"
    t.integer  "HSK_lvl",            null: false
    t.integer  "lesson_num",         null: false
    t.datetime "created_at",         null: false
    t.datetime "updated_at",         null: false
  end

  create_table "reviewed_characters", force: :cascade do |t|
    t.integer  "user_id",          null: false
    t.integer  "character_id",     null: false
    t.boolean  "response_correct"
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
  end

  add_index "reviewed_characters", ["character_id"], name: "index_reviewed_characters_on_character_id", using: :btree
  add_index "reviewed_characters", ["user_id"], name: "index_reviewed_characters_on_user_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "email",                       null: false
    t.string   "password_digest",             null: false
    t.string   "session_token",               null: false
    t.integer  "lesson_current",  default: 1, null: false
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
  end

end