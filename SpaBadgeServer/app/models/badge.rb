class Badge < ActiveRecord::Base
  belongs_to :person
  has_many :votes

end
