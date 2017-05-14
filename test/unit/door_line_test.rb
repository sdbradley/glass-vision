# == Schema Information
#
# Table name: door_lines
#
#  id                         :integer          not null, primary key
#  quotation_id               :integer
#  door_frame_id              :integer
#  quantity                   :integer
#  price                      :float
#  created_at                 :datetime
#  updated_at                 :datetime
#  door_combination_id        :integer
#  frame_profile_id           :integer
#  slab_material_id           :integer
#  door_opening_id            :integer
#  door_boring_id             :integer
#  exterior_color             :string(255)
#  interior_color             :string(255)
#  standard_interior_color_id :integer
#  standard_exterior_color_id :integer
#  position                   :integer
#  original_price             :float
#

require 'test_helper'

class DoorLineTest < ActiveSupport::TestCase
  # Replace this with your real tests.
  test "the truth" do
    assert true
  end
end
