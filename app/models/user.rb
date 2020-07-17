class User < ApplicationRecord
  has_secure_password
  has_many :watches, dependent: :destroy

  validates_presence_of :email, case_insensitive: false
  validates_uniqueness_of :email
  validates :password,  :presence => true,
                        :confirmation => true,
                        :case_insensitive => false,
                        :length => {:within => 8..20},
                        :on => :create
  validates :password,  :confirmation => true,
                        :case_insensitive => false,
                        :length => {:within => 8..20},
                        :allow_blank => true,
                        :on => :update
end