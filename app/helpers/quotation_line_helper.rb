module QuotationLineHelper

  def select_opening(section, selected)
    selected_opening = selected == 0? nil : Opening.find(selected)
    output = "<div class=\"opening_list_caller\">"
    output << hidden_field_tag("openings[#{section}]", selected)
    if selected == 0
      output << image_tag('openings/none.png', :onclick => "$('#opening_list_#{section}').toggle();", :id => "opening_pic_#{section}")
    else
      output << image_tag('openings/' + selected_opening.preview_image_name, :onclick => "$('#opening_list_#{section}').toggle();", :id => "opening_pic_#{section}")
      output << "<br/><span style='font-size:x-small'>#{selected_opening.tr_label}</span>"
    end
    # non IE version
    output << '<!--[if !IE]> <!-->'
    output << "<div id=\"opening_list_#{section}\" class=\"opening_list\" style=\"display: none;\">"
    @quotation_line.serie.openings.each do |o|
      output << "<div class=\"image\" onmouseover=\"$(this).addClass('hover')\" onmouseout=\"$(this).removeClass('hover')\" onclick=\"$('#openings_#{section}').val(#{o.id}); $('#opening_pic_#{section}').attr('src', '/images/openings/#{o.preview_image_name}'); $('#opening_list_#{section}').toggle();\">"
      output << image_tag('openings/' + o.preview_image_name)
      output << '<br/>' + o.tr_abbreviation
      output << "<br/><span style='font-size:x-small'>#{o.tr_label}</span>"
      output << '</div>'
    end
    output << '</div>'
    output << "<!--<![endif]-->"
    # IE version
    output << "<!--[if IE]>"
    output << "<br/>"
    js = "pics_#{section} = {};"
    js << "pics_#{section}.img_0 = '/images/openings/none.png';"
    @quotation_line.serie.openings.each do |o|
      js << "pics_#{section}.img_#{o.id} = '/images/openings/#{o.preview_image_name}';"
    end
    output << javascript_tag(js)
    output << select_tag("openings_combo_#{section}", options_for_select([['----', 0]] + @quotation_line.serie.openings.map { |o| ["#{o.name} (#{o.abbreviation})", o.id] }, selected), :onchange => "$('#openings_#{section}').val($(this).value); $('#opening_pic_#{section}').attr('src', pics_#{section}['img_' + $(this).val()]);")
    output << "<![endif]-->"
    output << "</div>"
    output.html_safe
  end
  
  def size_tag_helper(width_or_height, idx)
      if @quotation_line.serie.is_standard_product?
        select_tag("section_#{width_or_height}[#{idx}]", options_from_collection_for_select(@serie.width_or_height, "value", "value")) 
      else
        text_field_tag "section_#{width_or_height}[#{idx}]", @section_width_or_height[idx.to_s], :size => 6 
      end
  end

  def display_interior_color_name(line)
    line.interior_color.blank? ? line.standard_interior_color.tr_name : line.tr_interior_color + trn_get("LABEL_CUSTOM")
  end

  def display_exterior_color_name(line)
    line.exterior_color.blank? ? line.standard_exterior_color.tr_name : line.tr_exterior_color + trn_get("LABEL_CUSTOM")
  end

end

