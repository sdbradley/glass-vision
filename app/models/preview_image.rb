class PreviewImage < ActiveRecord::Base
  belongs_to :opening

  LEFT = 'L'.freeze
  RIGHT = 'R'.freeze
  NONE = 'N'.freeze

  validates :image_name, :hinged_on, presence: true
  validates :hinged_on, inclusion: { in: %w[L R N] }
end
