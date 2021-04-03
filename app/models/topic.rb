class Topic < ApplicationRecord

  belongs_to :user, :subcategory

  validates :name, presence: true, maximum: 255
  validates :content, presence: true

end
