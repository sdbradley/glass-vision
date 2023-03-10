class ProductColor < ActiveRecord::Base
  translates :name
  accepts_nested_attributes_for :translations

  validates_presence_of :name
  validates_uniqueness_of :name
  validates_presence_of :value
  validates_format_of :value, with: /^#?([a-f]|[A-F]|[0-9]){3}(([a-f]|[A-F]|[0-9]){3})?$/,
                              message: "should be hex encoded (eg '#cccccc', like in CSS)", allow_blank: true

  belongs_to :module_type

  def color
    if value.blank?
      '#cccccc'
    else
      value
    end
  end
end
