class PreviewImage < ActiveRecord::Base
  belongs_to :opening

  LEFT = 'L'.freeze
  RIGHT = 'R'.freeze
  NONE = 'N'.freeze

  validates_presence_of :image_name, :hinged_on
  validates_inclusion_of :hinged_on, in: %w[L R N]
end
