class Comment < ApplicationRecord

  belongs_to :user, :topic
  validates :content, presence: true

end
