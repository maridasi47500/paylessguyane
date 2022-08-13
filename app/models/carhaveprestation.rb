class Carhaveprestation < ApplicationRecord
  belongs_to :car
  belongs_to :prestation
  validates_uniqueness_of :car_id, scope: :prestation_id
end
