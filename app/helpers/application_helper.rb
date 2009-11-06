# Methods added to this helper will be available to all templates in the application.
include TranslationGet
module ApplicationHelper

  def ajax_spinner_for(id, spinner="spinner.gif")
     "<img src='/images/#{spinner}' style='display:none; vertical-align:middle;' id='#{id.to_s}_spinner'> "
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
    options_for_select.join("\n")
  end
  
  def color_picker(name)
    #build the hexes
   hexes = []
    (0..15).step(3) do |one|
      (0..15).step(3) do |two|
        (0..15).step(3) do |three|
         hexes << "#" + one.to_s(16) + two.to_s(16) + three.to_s(16)
        end
      end
    end
    arr = []
    on_change_function = "onChange=\"document.getElementById('color_div').style.backgroundColor = this[this.selectedIndex].value\""
    10.times { arr << "&nbsp;" }
      returning html = '' do
     html << "<div id=\"color_div\" style=\"border:0px solid black;z-index:100;position:absolute;width:30px\"> &nbsp; </div> "
     html << "<select name=#{name}[color] id=#{name}_color #{on_change_function}>"
     html << hexes.collect {|c|
       "<option value='#{c}' style='background-color: #{c}'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</option>" }.join("\n")
     html << "</select>"
   end
  end


  
end
