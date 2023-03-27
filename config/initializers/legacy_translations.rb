# new methods for translation
module ActiveRecord
  class Base
    #   include Translatable
    cattr_accessor :lang
  end
end
