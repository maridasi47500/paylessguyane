class Carhaveoption < ApplicationRecord
  belongs_to :car
  belongs_to :option
    validates_uniqueness_of :car_id, scope: :option_id

end
