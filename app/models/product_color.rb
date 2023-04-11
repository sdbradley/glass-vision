class ProductColor < ApplicationRecord
  translates :name
  accepts_nested_attributes_for :translations

  validates :name, presence: true
  validates :name, uniqueness: true
  validates :value, presence: true
  validates :value, format: {
    with: /^#?([a-f]|[A-F]|[0-9]){3}(([a-f]|[A-F]|[0-9]){3})?$/,
    multiline: true,
    message: "should be hex encoded (eg '#cccccc', like in CSS)",
    allow_blank: true
  }

  belongs_to :module_type

  def color
    (value.presence || '#cccccc')
  end
end
