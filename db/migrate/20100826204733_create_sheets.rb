class CreateSheets < ActiveRecord::Migration
  def self.up
    create_table :sheets do |t|
      t.string :name
      t.integer :pos
      t.references :book

      t.timestamps
    end
  end

  def self.down
    drop_table :sheets
  end
end
