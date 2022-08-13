class Userhavecar < ApplicationRecord
  belongs_to :user, optional:true
  belongs_to :car
  has_many :userhaveassurances
  def self.createnewoptions(options,paramid)
    myids=options.as_json.to_a.select {|a,b| b=="1"}.map {|a,b|a}
    contract=Userhavecar.create(car_id: paramid)

    contract.assurances << Assurance.where(id: myids)
    contract.options << Option.where(type:nil, id: myids)
    contract

  end
  
end
