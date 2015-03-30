class SearchConditions

  attr_accessor :session
  attr_accessor :search_fields

  def initialize(sess, field_list, params = nil)
    self.session = sess
    self.search_fields = field_list
    save_search_params_to_session(params)

  end


  def conditions#(&condition_for)
    params = search_params_from_session
    conditions = search_fields.collect{|x| yield x, params[x.to_sym], self }
    conditions = conditions.delete_if{|x| x.nil?}
    conditions.join(' and ')
  end

  private

  def search_params_from_session
    params = {}
    search_fields.each { |x| params[x.to_sym] = session[x.to_sym]}
    params
  end

  def save_search_params_to_session(params)
    return if params.nil?
    search_fields.each { |x| session[x.to_sym] = params[x.to_sym]}
  end

  def match_beginning(value)
    " like \'#{value}%\'"
  end

  def match_ending(value)
    " like \'%#{value}\'"
  end

  def match_anywhere(value)
    " like \'%#{value}%\'"
  end

  def match_exact(value)
    new_value = value.gsub /\*/, '%'
    " like '#{new_value}'"
  end

  def match_anywhere(value)
    " like \'%#{value}%\'"
  end


end
