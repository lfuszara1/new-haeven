class CreateSubcategories < ActiveRecord::Migration[6.1]
  def change
    create_table :subcategories do |t|
      t.string :name
      t.belongs_to :category, index: true
      t.references :topics, foreign_key: true

      t.timestamps
    end
  end
end
