class PopulateGapInDoorPanels < ActiveRecord::Migration[7.0]
  def self.up
    DoorPanel.update_all :gap => 'slab'
  end

  def self.down
  end
end
