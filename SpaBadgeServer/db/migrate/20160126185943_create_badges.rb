class CreateBadges < ActiveRecord::Migration
  def change
    create_table :badges do |t|
      t.references :person
      t.string :text

      t.timestamps null: false
    end
  end
end
