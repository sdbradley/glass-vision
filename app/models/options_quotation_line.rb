class OptionsQuotationLine < ApplicationRecord
  belongs_to :option
  belongs_to :quotation_line

  def self.categorize_options(options)
    # take the list of options, and rearrange it to be organized by category.
    # lets do this with a array of hashes
    # we need to order this list by display order too
    # hash is keyed on category display order. Value is {cat, option[]}
    categorized_options = {}
    options.each do |opt|
      opt.option_categories.each do |cat|
        categorized_options[cat.display_order] ||= { cat => [] }
        categorized_options[cat.display_order][cat] << opt
      end
    end
    categorized_options
  end
end
