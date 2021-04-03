class CreateSubcategories < ActiveRecord::Migration[6.1]
  def change
    create_table :subcategories do |t|
      t.references :categories, foreign_key: true

      t.string :name

      t.timestamps
    end
  end
end
