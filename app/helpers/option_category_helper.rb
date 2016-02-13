module OptionCategoryHelper

  # @param [Option] option
  def thumbmail_with_popup(option)
    popup_class =  option.photo.original_filename.present? ?  'popup' : ''

    image_tag option.photo.url(:thumb), :class => "#{ popup_class}", :style => 'vertical-align:middle;'
  end
end
