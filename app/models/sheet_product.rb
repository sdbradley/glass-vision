class SheetProduct < Serie
  include Translatable
  has_one :sheet_sizes
  
end
