class Review < ApplicationRecord
  belongs_to :airline

  validates :title, presence: true
  validates :description, presence: true
  validates :score, numericality: { other_than: 0 }
end
