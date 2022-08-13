class Car < ApplicationRecord
  attr_accessor :typecommande
  has_many :carhaveoptions
  has_many :options, through: :carhaveoptions
  has_many :carhaveprestations
  has_many :prestations, through: :carhaveprestations
  has_many :carhaveassurances
  has_many :assurances, through: :carhaveassurances
  def image=(file)
    if file.is_a?(String)
    self.write_attribute(:image,file)
  else

      pathfile = file.tempfile.path
    filename =file.original_filename
    namefile="#{(rand()*100000000).to_i}.#{filename.split('.')[1]}"
      loc='photos'
      abs=Rails.root.to_s+"/app/assets/images/"+filename
p abs
      `mv #{pathfile} #{abs}`

    self.write_attribute(:image,filename)
    end
end
def image
    read_attribute(:image)
end
def self.dispo
  where(id: [1,2])
end
def totalprice
  p=self.min_price
  p 
end

end
