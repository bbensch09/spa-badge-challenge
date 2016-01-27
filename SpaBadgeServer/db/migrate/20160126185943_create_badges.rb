class CreateBadges < ActiveRecord::Migration
  def change
    create_table :badges do |t|
      t.references :person
      t.string :text
      t.integer :vote_total, default: 0
      t.timestamps null: false
    end
  end
end
