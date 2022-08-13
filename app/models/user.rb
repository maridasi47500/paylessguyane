class User < ApplicationRecord
  validates_presence_of :nom
  def self.mykeys
    User.new.as_json.keys.select{|x|x!= 'id'}
  end
end
