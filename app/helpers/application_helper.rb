# Methods added to this helper will be available to all templates in the application.
include TranslationGet
module ApplicationHelper
  
  def gv_humanize_time(t)
    
    t.strftime("%a %b %d, %Y") if !t.nil?
  end
end
