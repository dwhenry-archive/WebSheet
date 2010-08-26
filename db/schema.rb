# This file is auto-generated from the current state of the database. Instead of editing this file, 
# please use the migrations feature of Active Record to incrementally modify your database, and
# then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your database schema. If you need
# to create the application database on another system, you should be using db:schema:load, not running
# all the migrations from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20100826205111) do

  create_table "books", :force => true do |t|
    t.string   "owner"
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "cells", :force => true do |t|
    t.string   "value"
    t.integer  "row"
    t.integer  "col"
    t.integer  "sheet_id"
    t.integer  "equation_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "dependents", :force => true do |t|
    t.integer  "parent_id"
    t.integer  "child_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "equations", :force => true do |t|
    t.string   "value"
    t.string   "eq_type"
    t.integer  "index"
    t.integer  "parent_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "sheets", :force => true do |t|
    t.string   "name"
    t.integer  "pos"
    t.integer  "book_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
