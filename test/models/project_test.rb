# == Schema Information
#
# Table name: projects
#
#  id                  :bigint           not null, primary key
#  project_title       :string           not null
#  project_description :text
#  tag_id              :integer          default([]), is an Array
#  user_id             :integer          not null
#  member_id           :integer          default([]), is an Array
#  role                :string           default([]), is an Array
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#  leader_id           :integer
#
require 'test_helper'

class ProjectTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
