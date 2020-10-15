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
class Project < ApplicationRecord
    validates :project_title, presence: true, uniqueness: true
    
    belongs_to :leader,
    foreign_key: :leader_id,
    class_name: "User"

    has_one_attached :picture


end
