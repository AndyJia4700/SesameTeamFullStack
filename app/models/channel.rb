# == Schema Information
#
# Table name: channels
#
#  id           :bigint           not null, primary key
#  channel_name :string
#  server_id    :integer
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#
class Channel < ApplicationRecord
    
    belongs_to :server,
    foreign_key: :server_id,
    class_name: "Server"
end
