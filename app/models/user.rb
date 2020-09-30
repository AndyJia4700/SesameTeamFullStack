# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  email           :string           not null
#  session_token   :string           not null
#  password_digest :string           not null
#  first_name      :string
#  last_name       :string
#  birthdate       :date
#  location        :string
#  about           :text
#  education       :text
#  resume_url      :string
#  personality     :string           default([]), is an Array
#  interest        :string           default([]), is an Array
#  skill           :string           default([]), is an Array
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class User < ApplicationRecord
    validates :email, :password_digest, :session_token, presence: true
    validates :email, uniqueness: true
    validates :password, length:{ minimum: 6, allow_nil: true}
    after_initialize :ensure_session_token
    attr_reader :password

    has_many :lead_project,
    foreign_key: :leader_id,
    class_name: "Project"

    has_many :join_project,
    foreign_key: :user_id,
    class_name: "Project"

    def password=(password)
        @password = password
        self.password_digest = BCrypt::Password.create(password)
    end

    def is_password?(password)
        bcrypt_password = BCrypt::Password.new(self.password_digest)
        bcrypt_password.is_password?(password)
    end

    def reset_session_token!
        self.update!(session_token: User.generate_session_token)
        self.session_token
    end

    def self.find_by_credentials(email, password)
        user = User.find_by(email: email)
        return nil unless user && user.is_password?(password)
        user
    end

    private

    def ensure_session_token
        self.session_token ||= User.generate_session_token
    end

    def self.generate_session_token
        SecureRandom::urlsafe_base64
    end

end
