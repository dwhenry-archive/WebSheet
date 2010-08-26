class CreateEquations < ActiveRecord::Migration
  def self.up
    create_table :equations do |t|
      t.string :value
      t.string :eq_type
      t.integer :index
      t.references :parent

      t.timestamps
    end
  end

  def self.down
    drop_table :equations
  end
end
