class Topic < ApplicationRecord

  belongs_to :user
  belongs_to :subcategory

  validates :name, presence: true
  validates :name, length: { maximum: 255 }

  validates :content, presence: true

end
