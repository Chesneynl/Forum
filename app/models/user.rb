class User < ApplicationRecord
  has_secure_password

  has_many :assignments  
  has_many :roles, through: :assignments
  has_many :posts  

  validates :email, presence: true, email: true, uniqueness: true
  validates :username, presence: true, uniqueness: true

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
