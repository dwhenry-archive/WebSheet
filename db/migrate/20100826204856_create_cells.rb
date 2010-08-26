class CreateCells < ActiveRecord::Migration
  def self.up
    create_table :cells do |t|
      t.string :value
      t.integer :row
      t.integer :col
      t.references :sheet
      t.references :equation

      t.timestamps
    end
  end

  def self.down
    drop_table :cells
  end
end
