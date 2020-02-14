class User < ApplicationRecord
  has_secure_password

  has_many :posts  

  validates :email, presence: true, email: true, uniqueness: true
  validates :username, presence: true, uniqueness: true, length: { in: 4..18 }
  validates :password, presence: true, length: { in: 6..18 }

  def confirm!  
    update!(confirmed_at: DateTime.now)  
  end

  def confirmed?  
    ! confirmed_at.nil?  
  end  

  def role?(role)  
    roles.any? { |r| r.name.underscore.to_sym == role }  
  end  

end
