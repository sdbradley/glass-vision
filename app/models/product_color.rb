class ProductColor < ActiveRecord::Base
  validates_presence_of :name
  validates_uniqueness_of :name
  validates_presence_of :value
  validates_format_of :color, :with => /#[0-9a-f]{6}/i,  :message => "should be hex encoded (eg '#cccccc', like in CSS)", :allow_blank => true


  def color
    if !value.blank?
      value
    else
      "#cccccc"
    end
  end

end
