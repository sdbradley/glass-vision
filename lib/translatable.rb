module Translatable
  
  def respond_to?(method_sym, include_private = false)
    if match = /tr_([a-zA-Z]\w*)/.match(method_sym.to_s)
      true
    else
      super
    end
  end
  def method_missing(method_id, *arguments)
    if match = /tr_([a-zA-Z]\w*)/.match(method_id.to_s)
      field = match.to_a[1]
      table = self.class.to_s.pluralize.underscore
      trans = DatabaseTranslation.find(:first, :conditions => "record_id = #{id} AND `table` = '#{table}' AND `field` = '#{field}'")
      if !trans or !trans[lang] or trans[lang].empty?
        send field
      else
        trans[lang]
      end
    else
      super
    end
  end
end
