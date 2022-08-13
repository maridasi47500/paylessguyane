class Bonplan < ApplicationRecord
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
  def self.findbytitle(title)
    all.select {|x|x.othertitle.parameterize == title}[0]
  end


end
