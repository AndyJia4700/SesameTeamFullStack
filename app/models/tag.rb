# == Schema Information
#
# Table name: tags
#
#  id         :bigint           not null, primary key
#  tag_name   :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Tag < ApplicationRecord
    validates :tag_name, presence: true, uniqueness: true
    searchkick
    def search_data
        {
            tag_name: tag_name
        }
    end
end
