class Pricing::ComputeOptionPrice

  # @param [QuotationLine] quotation_line
  # @param [QuotationLineParameters] line_params
  def initialize(quotation_line, line_params)
    @quotation_line =  quotation_line
    @line_info = line_params
  end

  def call(option, openings, shape)
    calculate_one_option_price(option, openings, shape)
  end

  private

  # @param [Option] option
  # @param [Opening[]] openings
  # @param [Shape] shape
  def calculate_one_option_price(option, openings, shape)
    option_price = 0.0
    case option.pricing_method_id
      when PricingMethod::PER_SQ_FOOT # price per square foot
        option_price = calc_one_option_price_per_sq_ft(openings, option, shape)
      when PricingMethod::PER_PERIMETER_FOOT # price by foot of perimeter
        option_price = calc_one_option_price_per_ft_of_perimeter(openings, option, shape)
      when PricingMethod::PER_SECTION # price per section
        option_price = option.price * openings.length
      when PricingMethod::PER_OPENABLE_SECTION # price per opening section
        nb_sections = openings.values.count { |v| Opening.find(v.to_i).openable }
        option_price = option.price * nb_sections
      when PricingMethod::PER_FIXED_SECTION # price by fixed section
        nb_sections = openings.values.count { |v| !Opening.find(v.to_i).openable }
        option_price = option.price * nb_sections
      when PricingMethod::UNIT_PRICE # unit price
        option_price = option.price
      when PricingMethod::PER_CORNER # price per corner
        option_price = option.price * shape.corners
      when PricingMethod::PER_TOTAL_WIDTH # price per total width
        option_price = option.price * (@line_info.total_width / 12.0).round
      else
        raise Exception('Invalid pricing method')
    end
    option_price
  end

private
  # @param [Opening[]] openings
  # @param [Option] option
  # @param [Shape] shape
  def calc_one_option_price_per_sq_ft(openings, option, shape)
    area = 0
    if option.minimum_quantity != 0
      case option.options_minimum_unit_id
        when Option::PRICED_PER_WINDOW # per window
          area = (@line_info.total_width / 12) * (@line_info.total_height / 12)
          area = option.minimum_quantity if area < option.minimum_quantity
        when Option::PRICED_PER_SECTION # per section
          1.upto(shape.sections_height) do |r|
            1.upto(shape.sections_width) do |c|
              opening = Opening.find(openings[((r - 1) * shape.sections_width + c).to_s].to_i)
              area += @quotation_line.compute_minimum_section_area( @line_info.real_height[r] * @line_info.real_width[c] / 144.0, option, opening)
            end
          end
          if shape.has_upper_transom?
            index = upper_transom_index(shape)
            opening = Opening.find(openings[index].to_i)
            area += @quotation_line.compute_minimum_section_area(@line_info.section_height[index].to_f * @line_info.total_width / 144.0, option, opening)
          end
          if shape.has_lower_transom?
            index = lower_transom_index(shape)
            opening = Opening.find(openings[index].to_i)
            area += @quotation_line.compute_minimum_section_area(@line_info.section_height[index].to_f * @line_info.total_width / 144.0, option, opening)
          end
          if shape.has_left_sidelight?
            index = left_sidelight_index(shape)
            opening = Opening.find(openings[index].to_i)
            area += @quotation_line.compute_minimum_section_area(@line_info.section_height[index].to_f * @line_info.section_width[index].to_f / 144.0, option, opening)
          end
          if shape.has_right_sidelight?
            index = right_sidelight_index(shape)
            opening = Opening.find(openings[index].to_i)
            area += @quotation_line.compute_minimum_section_area(@line_info.section_height[index].to_f * @line_info.section_width[index].to_f / 144.0, option, opening)
          end
        when Option::PRICED_PER_GLASS # per glass
          1.upto(shape.sections_height) do |r|
            1.upto(shape.sections_width) do |c|
              section_area = @line_info.real_height[r] * @line_info.real_width[c] / 144.0
              opening = Opening.find(openings[((r - 1) * shape.sections_width + c).to_s].to_i)
              # for now, consider all glasses of the section to be of equal area
              area += @quotation_line.compute_minimum_glass_area(section_area, option, opening)
            end
          end
          if shape.has_upper_transom?
            index = upper_transom_index(shape)
            section_area = @line_info.section_height[index].to_f * @line_info.total_width / 144.0
            opening = Opening.find(openings[index].to_i)
            area += @quotation_line.compute_minimum_glass_area(section_area, option, opening)
          end
          if shape.has_lower_transom?
            index = lower_transom_index(shape)
            section_area = @line_info.section_height[index].to_f * @line_info.total_width / 144.0
            opening = Opening.find(openings[index].to_i)
            area += @quotation_line.compute_minimum_glass_area(section_area, option, opening)
          end
          if shape.has_left_sidelight?
            index = left_sidelight_index(shape)
            section_area = @line_info.section_height[index].to_f * @line_info.section_width[index].to_f / 144.0
            opening = Opening.find(openings[index].to_i)
            area += @quotation_line.compute_minimum_glass_area(section_area, option, opening)
          end
          if shape.has_right_sidelight?
            index = right_sidelight_index(shape)
            section_area = @line_info.section_height[index].to_f * @line_info.section_width[index].to_f / 144.0
            opening = Opening.find(openings[index].to_i)
            area += @quotation_line.compute_minimum_glass_area(section_area, option, opening)
          end
      end
    else
      case option.apply_to
        when Option::APPLIES_TO_ALL # applies to all
          area = (@line_info.total_width / 12) * (@line_info.total_height / 12)
        when Option::APPLIES_TO_FIXED,Option::APPLIES_TO_OPENABLE
          area = compute_area_for_openings(shape, openings, option.apply_to)
      end
    end
    option_price = option.price * area
    option_price
  end

  def calc_one_option_price_per_ft_of_perimeter(openings, option, shape)
    if option.minimum_quantity != 0
      case option.options_minimum_unit_id
        when Option::PRICED_PER_WINDOW # per window
          perimeter = (@line_info.total_width * 2 + @line_info.total_height * 2) / 12
          perimeter = option.minimum_quantity if perimeter < option.minimum_quantity
        when Option::PRICED_PER_SECTION # per section
          perimeter = 0
          1.upto(shape.sections_height) do |r|
            1.upto(shape.sections_width) do |c|
              section_perimeter = (@line_info.real_height[r] * 2 + @line_info.real_width[c] * 2) / 12
              section_perimeter = option.minimum_quantity if section_perimeter < option.minimum_quantity
              perimeter += section_perimeter
            end
          end
          if shape.has_upper_transom?
            section_perimeter = (@line_info.section_height[upper_transom_index(shape)].to_i * 2 + @line_info.total_width * 2) / 12
            section_perimeter = option.minimum_quantity if section_perimeter < option.minimum_quantity
            perimeter += section_perimeter
          end
          if shape.has_lower_transom?
            section_perimeter = (@line_info.section_height[lower_transom_index(shape)].to_i * 2 + @line_info.total_width * 2) / 12
            section_perimeter = option.minimum_quantity if section_perimeter < option.minimum_quantity
            perimeter += section_perimeter
          end
          if shape.has_left_sidelight?
            index = left_sidelight_index(shape)
            section_perimeter = (@line_info.section_height[index].to_i * 2 + @line_info.section_width[index] * 2) / 12
            section_perimeter = option.minimum_quantity if section_perimeter < option.minimum_quantity
            perimeter += section_perimeter
          end
          if shape.has_right_sidelight?
            index = right_sidelight_index(shape)
            section_perimeter = (@line_info.section_height[index].to_i * 2 + @line_info.section_width[index] * 2) / 12
            section_perimeter = option.minimum_quantity if section_perimeter < option.minimum_quantity
            perimeter += section_perimeter
          end
        when Option::PRICED_PER_GLASS # per glass
          perimeter = 0
          1.upto(shape.sections_height) do |r|
            1.upto(shape.sections_width) do |c|
              opening = Opening.find(openings[((r - 1) * shape.sections_width + c).to_s].to_i)
              glasses_quantity = (opening.glasses_quantity == 0 ? 1 : opening.glasses_quantity)
              # for now, consider all glasses of the section to be of equal perimeter
              glass_perimeter = (@line_info.real_height[r] * 2 + @line_info.real_width[c] * 2 / glasses_quantity) / 12
              glass_perimeter = option.minimum_quantity if glass_perimeter < option.minimum_quantity
              perimeter += glass_perimeter * glasses_quantity
            end
          end
          if shape.has_upper_transom?
            opening = Opening.find(openings[upper_transom_index(shape)].to_i)
            glasses_quantity = (opening.glasses_quantity == 0 ? 1 : opening.glasses_quantity)
            # for now, consider all glasses of the section to be of equal perimeter
            glass_perimeter = (@line_info.section_height[upper_transom_index(shape)].to_i * 2 + @line_info.total_width * 2 / glasses_quantity) / 12
            glass_perimeter = option.minimum_quantity if glass_perimeter < option.minimum_quantity
            perimeter += glass_perimeter * glasses_quantity
          end
          if shape.has_lower_transom?
            opening = Opening.find(openings[lower_transom_index(shape)].to_i)
            glasses_quantity = (opening.glasses_quantity == 0 ? 1 : opening.glasses_quantity)
            glass_perimeter = (@line_info.section_height[lower_transom_index(shape)].to_i * 2 + @line_info.total_width * 2 / glasses_quantity) / 12
            glass_perimeter = option.minimum_quantity if glass_perimeter < option.minimum_quantity
            perimeter += glass_perimeter * glasses_quantity
          end
          if shape.has_left_sidelight?
            index = left_sidelight_index(shape)
            opening = Opening.find(openings[index].to_i)
            glasses_quantity = (opening.glasses_quantity == 0 ? 1 : opening.glasses_quantity)
            # for now, consider all glasses of the section to be of equal perimeter
            glass_perimeter = (@line_info.section_height[index].to_i * 2 + @line_info.section_width[index] * 2 / glasses_quantity) / 12
            glass_perimeter = option.minimum_quantity if glass_perimeter < option.minimum_quantity
            perimeter += glass_perimeter * glasses_quantity
          end
          if shape.has_right_sidelight?
            index = right_sidelight_index(shape)
            opening = Opening.find(openings[index].to_i)
            glasses_quantity = (opening.glasses_quantity == 0 ? 1 : opening.glasses_quantity)
            glass_perimeter = (@line_info.section_height[index].to_i * 2 + @line_info.section_width[index] * 2 / glasses_quantity) / 12
            glass_perimeter = option.minimum_quantity if glass_perimeter < option.minimum_quantity
            perimeter += glass_perimeter * glasses_quantity
          end
      end
    else
      perimeter = (@line_info.total_width * 2 + @line_info.total_height * 2) / 12
    end
    option_price = option.price * perimeter
    option_price
  end

  def compute_area_for_openings(shape, openings, openable)
    area = 0
    1.upto(shape.sections_height) do |r|
      1.upto(shape.sections_width) do |c|
        section_area = @line_info.real_height[r] * @line_info.real_width[c] / 144.0
        opening = Opening.find(openings[((r - 1) * shape.sections_width + c).to_s].to_i)
        # for now, consider all glasses of the section to be of equal area
        area += section_area if @quotation_line.applies_to(opening, openable)
      end
    end

    area += compute_section_area(upper_transom_index(shape), openable, openings, @line_info.total_width) if shape.has_upper_transom?
    area += compute_section_area(lower_transom_index(shape), openable, openings, @line_info.total_width) if shape.has_lower_transom?

    area += compute_section_area(left_sidelight_index(shape), openable, openings) if shape.has_left_sidelight?
    area += compute_section_area(right_sidelight_index(shape), openable, openings) if shape.has_right_sidelight?

    area
  end

  def compute_section_area(index, openable, openings, width = nil)
    width ||= @line_info.section_width[index].to_f
    section_area = @line_info.section_height[index].to_f * width / 144.0
    opening = Opening.find(openings[index].to_i)
    @quotation_line.applies_to(opening, openable) ? section_area : 0
  end

end