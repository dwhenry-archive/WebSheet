class CreateDependents < ActiveRecord::Migration
  def self.up
    create_table :dependents do |t|
      t.references :parent
      t.references :child

      t.timestamps
    end
  end

  def self.down
    drop_table :dependents
  end
end
