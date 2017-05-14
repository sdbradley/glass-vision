# == Schema Information
#
# Table name: door_line_sections
#
#  id                      :integer          not null, primary key
#  door_line_id            :integer
#  sort_order              :integer
#  door_section_id         :integer
#  door_panel_id           :integer
#  door_glass_id           :integer
#  created_at              :datetime
#  updated_at              :datetime
#  door_panel_dimension_id :integer
#

require 'test_helper'

class DoorLineSectionTest < ActiveSupport::TestCase
  # Replace this with your real tests.
  test "the truth" do
    assert true
  end
end
