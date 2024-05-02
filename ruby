class User < ApplicationRecord
  has_many :tweets
end

class Tweet < ApplicationRecord
  belongs_to :user
end