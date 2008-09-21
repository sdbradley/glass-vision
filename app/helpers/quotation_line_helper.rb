module QuotationLineHelper

  def select_opening(section, selected)
    output = "<div class=\"opening_list_caller\">"
    output << hidden_field_tag("openings[#{section}]", selected)
    if selected == 0
      output << image_tag('openings/none.png', :onclick => "$('opening_list_#{section}').toggle();", :id => "opening_pic_#{section}")
    else
      output << image_tag('openings/' + Opening.find(selected).preview_image_name, :onclick => "$('opening_list_#{section}').toggle();", :id => "opening_pic_#{section}")
    end
    # non IE version
    output << "<!--[if !IE]> <!-->"
    output << "<div id=\"opening_list_#{section}\" class=\"opening_list\" style=\"display: none;\">"
    @quotation_line.serie.openings.each do |o|
      output << "<div class=\"image\" onmouseover=\"this.addClassName('hover')\" onmouseout=\"this.removeClassName('hover')\" onclick=\"$('openings[#{section}]').value = #{o.id}; $('opening_pic_#{section}').src = '/images/openings/#{o.preview_image_name}'; $('opening_list_#{section}').toggle();\">"
      output << image_tag('openings/' + o.preview_image_name)
      output << "<br/>" + o.tr_abbreviation
      output << "</div>"
    end
    output << "</div>"
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
    output << select_tag("openings_combo_#{section}", options_for_select([['----', 0]] + @quotation_line.serie.openings.map { |o| ["#{o.name} (#{o.abbreviation})", o.id] }, selected), :onchange => "$('openings[#{section}]').value = this.value; $('opening_pic_#{section}').src = pics_#{section}['img_' + this.value];")
    output << "<![endif]-->"
    output << "</div>"
  end
  
  def size_tag_helper(width_or_height, idx)
      if @quotation_line.serie.is_standard_product
        select_tag("section_#{width_or_height}[#{idx}]", options_from_collection_for_select(@serie.width_or_height, "value", "value")) 
      else
        text_field_tag "section_#{width_or_height}[#{idx}]", @section_width_or_height[idx.to_s], :size => 6 
      end
  end
end

