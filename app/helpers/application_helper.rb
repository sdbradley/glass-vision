# Methods added to this helper will be available to all templates in the application.
include TranslationGet
module ApplicationHelper
  include SortableTable::App::Helpers::ApplicationHelper
  include WickedPdfHelper


  def display_minimum_dimensions(dimension)
    trn_get('HELP_IMAGE_MIN_DIMENSIONS') % dimension
  end

  def yes_or_no(b)
    trn_get(b ? 'MSG_YES' : 'MSG_NO')
  end

  def ajax_spinner_for(id, spinner="spinner.gif")
     "<img src='/images/#{spinner}' style='display:none; vertical-align:middle;' id='#{id.to_s}_spinner'> ".html_safe
   end

  def gv_humanize_time(t)
    t.strftime("%a %b %d, %Y") if !t.nil?
  end


  def option_value_selected?(value, selected)
    if selected.respond_to?(:include?) && !selected.is_a?(String)
      selected.include? value
    else
      value == selected
    end
  end

  def option_text_and_value(option)
    # Options are [text, value] pairs or strings used for both.
    if !option.is_a?(String) and option.respond_to?(:first) and option.respond_to?(:last)
      [option.first, option.last]
    else
      [option, option]
    end
  end

  def options_for_select_with_style( container, selected=nil )
    container = container.to_a if Hash === container
    options_for_select = container.inject([]) do |options, element|
      text, value = option_text_and_value(element)
      selected_attribute = ' selected="selected"' if option_value_selected?(value, selected)
      style = " style=\"#{element[1]}\"" if element[1] && element[1]!=value
      options << %(<option value="#{html_escape(value.to_s)}"#{selected_attribute}#{style}>#{html_escape(text.to_s)}</option>)
    end
    options_for_select.join("\n").html_safe
  end

  def color_picker(name, colors, id, sel)
    arr = []
    on_change_function = "onChange=\";document.getElementById('#{id}').value = '';\""
    10.times { arr << "&nbsp;" }

    id_of_selected_color = sel.id unless sel.nil?

    html = ''
    html << "<select name=#{name} id=#{name} #{on_change_function}>"
    html << "<option value='' colorname='' #{'selected' if sel.nil?}>#{trn_get('MSG_SELECT_ONE')}</option>"
    html << colors.collect { |c|
      "<option value='#{c.id}' colorname='#{c.tr_name}' #{'selected' if c.id == id_of_selected_color} style='background-color: #{c.value}'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; #{c.tr_name}</option>" }.join("\n")
    html << "</select>"
    html.html_safe
  end

  def css_button_to(object_name, options, html_options = {})
    html_options.merge!({:class => "css_button"})
    "<div class=\"css_button\">
      #{link_to object_name,  options, html_options}
    </div>".html_safe
  end

  def menu_item(image, link_label, link, options = {})
    display_label = trn_get(link_label)
    display_label += ' - ' + options[:label] if options[:label]

    link_to(image_tag(image + '.png', :size => '32x32', :border => 0, :style => {:padding => '5px'}) + display_label, link).html_safe
  end


  def wicked_pdf_dynamic_image_tag(img, options={})
    image_tag "file:///#{File.join(Rails.root,'public', img)}", options #unless params[:debug].present?
#    image_tag img, options if params[:debug].present?
  end


  def gv_show_translations(obj, field, label)
    result = ''
    [:en, :fr, :es].each do |lang|
        result += "
<tr valign='top'>
  <td align='right' class='nowrap'>#{trn_geth(label)} (#{lang}) #{trn_geth('LABEL_SEMICOLON')} </td>
  <td> #{ Globalize.with_locale(lang) { obj.send(field) } }</td>
</tr>"
    end
    result.html_safe
  end

  def gv_fields_for(form, field, label, options)
    result = "
    <tr valign='top'>
        <td align='right' class='nowrap'>#{trn_geth(label)} (en) #{trn_geth('LABEL_SEMICOLON')} </td>
        <td>#{form.text_field field, options}</td>
      </tr>
    "
    [:fr, :es].each do |lang|
      form.globalize_fields_for lang do |g|
        result += "
        <tr valign='top'>
          <td align='right' class='nowrap'>#{trn_geth(label)} (#{lang}) #{trn_geth('LABEL_SEMICOLON')}</td>
          <td>#{g.text_field field, options }</td>
        </tr>"
      end
    end
    result.html_safe
  end

  def gv_simple_fields_for(form, field, label)
    result = form.input(field, :label => trn_geth(label))

    [:fr, :es].each do |lang|
      form.globalize_fields_for lang do |g|
        result += content_tag('li', :class => 'string stringish input') do
         g.label(field, trn_geth(label)+ " (#{lang}) ", :class => 'label')  +
         g.text_field(field, :maxlength => 255)
        end

      end
    end
    result.html_safe
  end

end
