class StandardProduct < Serie
  include Translatable
  has_many :standard_sizes
  
end
