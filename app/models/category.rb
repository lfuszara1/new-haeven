class Category < ApplicationRecord

  validates :name, presence: true, maximum: 255

end
