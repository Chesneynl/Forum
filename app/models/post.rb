class Post < ApplicationRecord
  validates :name, presence: true
  validates :description, presence: true
  validates :image, presence: true
  validates :user_id, presence: true
  attribute :active, presence: true, default: 0

  belongs_to :user
end
