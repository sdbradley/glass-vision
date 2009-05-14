# Methods added to this helper will be available to all templates in the application.
include TranslationGet
module ApplicationHelper

  def ajax_spinner_for(id, spinner="spinner.gif")
     "<img src='/images/#{spinner}' style='display:none; vertical-align:middle;' id='#{id.to_s}_spinner'> "
   end

  def gv_humanize_time(t)
    t.strftime("%a %b %d, %Y") if !t.nil?
  end

end
