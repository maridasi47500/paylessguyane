class Carhaveassurance < ApplicationRecord
  belongs_to :car
  belongs_to :assurance
  validates_uniqueness_of :car_id, scope: :assurance_id
end
