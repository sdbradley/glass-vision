class AddPositionToQuotationLine < ActiveRecord::Migration[7.0]
  def self.up
    add_column :quotation_lines, :position, :integer, if_not_exists: true
    add_column :door_lines, :position, :integer, if_not_exists: true
    add_column :manual_lines, :position, :integer, if_not_exists: true

    # for all quotations, set position id for all lines based on created_at
    Quotation.all.each do |quotation|
      quotation.quotation_lines.order('id asc').all.each_with_index do |line, index|
        line.position = index
        line.save
      end
      quotation.door_lines.order('id asc').all.each_with_index do |line, index|
        line.position = index
        line.save
      end
      quotation.manual_lines.order('id asc').all.each_with_index do |line, index|
        line.position = index
        line.save
      end
      quotation.save
    end
  end

  def self.down
    remove_column :manual_lines, :position, if_exists: true
    remove_column :door_lines, :position, if_exists: true
    remove_column :quotation_lines, :position, if_exists: true
  end
end
