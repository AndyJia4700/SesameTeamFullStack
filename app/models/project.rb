# == Schema Information
#
# Table name: projects
#
#  id                  :bigint           not null, primary key
#  project_title       :string           not null
#  project_description :text
#  tag_id              :integer          default([]), is an Array
#  member_id           :integer          default([]), is an Array
#  role                :string           default([]), is an Array
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#  leader_id           :integer
#
class Project < ApplicationRecord

    searchkick text_start: [
        :project_title, 
        :role
    ]

    # searchkick match: :word_start, searchable: [:project_title]

    validates :project_title, presence: true, uniqueness: true
    
    belongs_to :leader,
    foreign_key: :leader_id,
    class_name: "User"

    has_one_attached :picture
    # has_many_attached :picture

    def search_data
        {
            project_title: project_title,
            role: role,
        }
    end
    Project.reindex

end