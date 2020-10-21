# == Schema Information
#
# Table name: servers
#
#  id          :bigint           not null, primary key
#  server_name :string
#  owner_id    :integer
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class Server < ApplicationRecord

    belongs_to :owner,
    foreign_key: :owner_id,
    class_name: "User"

    has_many :channels,
    foreign_key: :server_id,
    class_name: "Channel",
    dependent: :destroy

end
