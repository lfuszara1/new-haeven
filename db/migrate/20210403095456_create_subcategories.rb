class CreateSubcategories < ActiveRecord::Migration[6.1]
  def change
    create_table :subcategories do |t|
      t.belongs_to :category, index: true
      t.references :user, foreign_key: true

      t.string :name

      t.timestamps
    end
  end
end
