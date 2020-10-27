# == Schema Information
#
# Table name: messages
#
#  id         :bigint           not null, primary key
#  body       :text
#  author_id  :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Message < ApplicationRecord

    belongs_to :author,
    foreign_key: :author_id,
    class_name: "User",
end
