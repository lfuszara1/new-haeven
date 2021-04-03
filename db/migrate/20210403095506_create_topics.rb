class CreateTopics < ActiveRecord::Migration[6.1]
  def change
    create_table :topics do |t|
      t.belongs_to :subcategory, index: true
      t.references :user, foreign_key: true

      t.string :name
      t.text :content
      t.boolean :approved, default: false

      t.timestamps
    end
  end
end
