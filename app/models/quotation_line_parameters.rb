require 'shape'

# @attr [float] real_height
# @attr [float] real_width
class QuotationLineParameters

  attr_accessor :real_height, :real_width, :openings, :section_height, :section_width
  attr_accessor :upper_transom_index, :lower_transom_index, :left_sidelight_index, :right_sidelight_index
  attr_accessor :total_width, :total_height

  # @param [QuotationLine] quotation_line
  def initialize(quotation_line)
    @total_width = 0
    @total_height = 0
    @real_height = 0
    @real_width = 0
    @upper_transom_index = nil
    @lower_transom_index = nil
    @left_sidelight_index = nil
    @right_sidelight_index = nil
    @quotation_line = quotation_line
    from_line
  end

  # @param [Hash] params
  # @param [Shape] shape
  def from_params(params, shape)

    initialize_by_shape(shape)
    @openings = params[:openings] ||  {}

    @section_height = params[:section_height] || {}
    @section_width = params[:section_width] || {}

    @upper_transom_index = @quotation_line.upper_transom_index(shape).to_s if shape.has_upper_transom?
    @lower_transom_index = @quotation_line.lower_transom_index(shape).to_s if shape.has_lower_transom?
    @left_sidelight_index = @quotation_line.left_sidelight_index(shape).to_s if shape.has_left_sidelight?
    @right_sidelight_index = @quotation_line.right_sidelight_index(shape).to_s if shape.has_right_sidelight?

    self
  end


  # @param [QuotationLine] quotation_line
  def from_line
    @openings = {}
    @quotation_line.quotation_lines_openings.each do |o|
      @openings[o.sort_order.to_s] = o.opening_id
    end
    @section_height = {}
    @quotation_line.section_heights.each do |h|
      @section_height[h.sort_order.to_s] = h.value
    end
    @section_width = {}
    @quotation_line.section_widths.each do |w|
      @section_width[w.sort_order.to_s] = w.value
    end

    shape = @quotation_line.shape
    @upper_transom_index = @quotation_line.upper_transom_index(shape).to_s if shape.has_upper_transom?
    @lower_transom_index = @quotation_line.lower_transom_index(shape).to_s if shape.has_lower_transom?
    @left_sidelight_index = @quotation_line.left_sidelight_index(shape).to_s if shape.has_left_sidelight?
    @right_sidelight_index = @quotation_line.right_sidelight_index(shape).to_s if shape.has_right_sidelight?

    @total_height = @quotation_line.height
    @total_width = @quotation_line.width

    self
  end

  def total_sidelight_width
    total_sidelight_width = 0.0
    total_sidelight_width += @section_width[@left_sidelight_index].to_f unless @left_sidelight_index.nil?
    total_sidelight_width += @section_width[@right_sidelight_index].to_f unless @right_sidelight_index.nil?
    total_sidelight_width
  end

  def total_transom_height
    total_transom_height = 0.0
    total_transom_height += @section_height[@upper_transom_index].to_f unless @upper_transom_index.nil?
    total_transom_height += @section_height[@lower_transom_index].to_f unless @lower_transom_index.nil?
    total_transom_height
  end
  private
  # @param [Shape] shape
  def initialize_by_shape(shape)
    @section_height = {}
    @section_width = {}
    1.upto(shape.sections_height) do |section_index_in_height|
      @section_height[section_index_in_height.to_s] = 0
    end
    1.upto(shape.sections_width) do |section_index_in_width|
      @section_width[section_index_in_width.to_s] = 0
    end

    if shape.has_upper_transom?
      @upper_transom_index = get_upper_transom_index(shape)
      @section_height[@upper_transom_index] = 0
    end

    if shape.has_lower_transom?
      @lower_transom_index = get_lower_transom_index(shape)
      @section_height[@lower_transom_index] = 0
    end

    if shape.has_left_sidelight?
      @left_sidelight_index = get_left_sidelight_index(shape)
      @section_height[@left_sidelight_index] = 0
    end

    if shape.has_right_sidelight?
      @right_sidelight_index = get_right_sidelight_index(shape)
      @section_height[@right_sidelight_index] = 0
    end
  end


  def get_upper_transom_index(shape)
    shape.total_sections + 1
  end


  # @param [Shape] shape
  def get_lower_transom_index(shape)
    shape.total_sections + 2
  end

  # @param [Shape] shape
  def get_left_sidelight_index(shape)
    shape.total_sections + 3
  end

  # @param [Shape] shape
  def get_right_sidelight_index(shape)
    shape.total_sections + 4
  end

end
