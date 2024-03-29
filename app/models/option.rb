class Option < ApplicationRecord
  translates :description
  accepts_nested_attributes_for :translations

  # the type of opening this option applies to
  OPTION_APPLIES_TO = [APPLIES_TO_FIXED = 0, APPLIES_TO_OPENABLE = 1, APPLIES_TO_ALL = 2].freeze
  PRICED_PER = [PRICED_PER_WINDOW = 1, PRICED_PER_SECTION = 2, PRICED_PER_GLASS = 3].freeze

  belongs_to :pricing_method
  belongs_to :options_minimum_unit
  has_and_belongs_to_many :series, class_name: 'Serie' # :class_name should not be here, but 'series'.singularize = 'series' for rails, which is not correct
  has_many :options_quotation_lines
  has_many :options_quotations
  belongs_to :module_type

  has_and_belongs_to_many :option_categories, order: 'option_categories.display_order asc'

  has_attached_file :photo,
                    url: '/system/:class/:attachment/:id/:style_:basename.:extension',
                    path: ':rails_root/public/system/:class/:attachment/:id/:style_:basename.:extension',
                    default_url: ':class/missing_:style.png',
                    default_style: :original,
                    whiny_thumbnails: true,
                    styles: {
                      thumb: '32x32',
                      normal: '200x200>',
                      original: '300x300'
                    }

  validates_attachment_size :photo, less_than: 1.megabyte

  validates :description, :price, presence: true
  validates :price, numericality: true

  # find all options that are assigned to a category
  #   o = Option.all(:include => :option_categories, :conditions =>['not ISNULL(option_categories_options.option_category_id)'])
  # find all options that are NOT assigned to a category
  #   o = Option.all(:include => :option_categories, :conditions =>['ISNULL(option_categories_options.option_category_id)'])

  # returns true if this option has been assigned to any categories
  def categorized?
    !option_categories.empty?
  end

  def self.options_for_select
    [[trn_get('LABEL_PRICING_METHOD_APPLIES_TO_ALL'), APPLIES_TO_ALL],
     [trn_get('LABEL_PRICING_METHOD_APPLIES_TO_FIXED'), APPLIES_TO_FIXED],
     [trn_get('LABEL_PRICING_METHOD_APPLIES_TO_OPENABLE'), APPLIES_TO_OPENABLE]]
  end

  def apply_to_value_string
    [trn_get('LABEL_PRICING_METHOD_APPLIES_TO_FIXED'),
     trn_get('LABEL_PRICING_METHOD_APPLIES_TO_OPENABLE'),
     trn_get('LABEL_PRICING_METHOD_APPLIES_TO_ALL')][apply_to]
  end
end
