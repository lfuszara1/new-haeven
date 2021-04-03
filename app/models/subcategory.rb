class Subcategory < ApplicationRecord

  belongs_to :user, :category

  validates :name, presence: true, maximum: 255

end
