class OptionsQuotationLine < ActiveRecord::Base
  belongs_to :option
  belongs_to :quotation_line

  
  def self.categorize_options(options)
    # take the list of options, and rearrange it to be organized by category.
    # lets do this with a hash of hashes
    categorized_options = {}
    options.each { |opt| 
       opt.option.option_categories.each { |cat|
         cat_name = cat.tr_name
         categorized_options[cat_name] ||= []
         categorized_options[cat_name] << opt
         }
    }
    categorized_options
  end
end
