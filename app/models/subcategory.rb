class Subcategory < ApplicationRecord

  belongs_to :user
  belongs_to :category

  validates :name, presence: true
  validates :name, length: { maximum: 255 }

end
