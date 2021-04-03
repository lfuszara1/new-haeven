class CreateComments < ActiveRecord::Migration[6.1]
  def change
    create_table :comments do |t|
      t.belongs_to :topic, index: true
      t.references :user, foreign_key: true

      t.text :content

      t.timestamps
    end
  end
end
