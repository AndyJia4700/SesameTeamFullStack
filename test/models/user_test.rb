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
#  wallet          :integer
#  friends_id      :integer          default([]), is an Array
#  likes_id        :integer          default([]), is an Array
#
require 'test_helper'

class UserTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
