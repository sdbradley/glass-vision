require 'shape'
class PriceError < RuntimeError
end

class QuotationLineController < ApplicationController
  def add
    @quotation_line = QuotationLine.new
    @quotation_line.quotation_id = Quotation.find_by_slug(params[:id]).id
  end

  def add2
    @quotation_line = QuotationLine.new(params[:quotation_line])

    shape = Shape.find(@quotation_line.shape_id)
    @line_info = QuotationLineParameters.new(@quotation_line).from_params(params, shape)

    @serie = @quotation_line.serie

    # are we creating a similar window? if so, bring forward selected options
    # from the last line entered
    copy_options_from_last_line if params[:ql_copy_options]

    initialize_options_for_series

    # for the view
    @openings = @line_info.openings
    @section_height = @line_info.section_height
    @section_width = @line_info.section_width
  end

  def get_shapes_for_series
    return unless request.xhr?

    # given a series id, render the shape gallery
    serie_id = params[:serie_id]
    @series = Serie.find(serie_id, include: 'shapes')
    @shapes = @series.shapes
  end

  # ajax call to change the series for this line
  def change_series
    return unless request.xhr?

    serie_id = params[:serie_id]
    @quotation_line = QuotationLine.new(params[:quotation_line])
    shape = Shape.find(@quotation_line.shape_id)

    @line_info = QuotationLineParameters.new(@quotation_line).from_params(params, shape)

    @openings = {} # params[:openings]
    @section_height = params[:section_height] || {}
    @section_width = params[:section_width] || {}

    #    @serie = Serie.includes(:options => [:pricing_method, :options_minimum_unit]).find(serie_id)
    @serie = @quotation_line.serie

    initialize_options_for_series
  end

  # ajax call to change the shape for this line
  def change_shape
    return unless request.xhr?

    @quotation_line = QuotationLine.new(params[:quotation_line])
    @serie = @quotation_line.serie

    @openings = params[:openings]
    @section_height = params[:section_height] || {}
    @section_width = params[:section_width] || {}
    shape = Shape.find(@quotation_line.shape_id)

    @line_info = QuotationLineParameters.new(@quotation_line).from_params(params, shape)

    initialize_options_for_series
  end

  def create
    @quotation_line = QuotationLine.new(params[:quotation_line])
    @serie = Serie.find(@quotation_line.serie_id)
    @options = @serie.options.sort_by { |o| o.description }

    @line_info = QuotationLineParameters.new(@quotation_line).from_params(params, @quotation_line.shape)

    shape = @quotation_line.shape
    # for the view
    @openings = @line_info.openings
    @section_height = @line_info.section_height
    @section_width = @line_info.section_width

    error = calculate_dimensions(@quotation_line.width, @quotation_line.height)
    if error
      @quotation_line.price = 0
      flash[:notice] = error
      render action: 'add2'
    else
      new_selected_options = get_options_from_params(params)
      begin
        @quotation_line.price = calculate_price(@quotation_line.serie_id, @quotation_line.shape_id,
                                                @line_info.openings, new_selected_options)
        @quotation_line.original_price = @quotation_line.price
      rescue PriceError => e
        @quotation_line.price = 0
        flash[:notice] = e.message
        render action: 'add2'
      end
      if @quotation_line.price != 0

        # save calculated dimensions
        @quotation_line.height = @line_info.total_height
        @quotation_line.width = @line_info.total_width
        @quotation_line.position = @quotation_line.quotation.quotation_lines.count + 1
        if @quotation_line.save

          # save openings
          # TODO sort_order won't work with transoms
          @line_info.openings.each_pair do |key, value|
            @quotation_line.quotation_lines_openings.create(opening_id: value.to_i, sort_order: key.to_i)
          end

          # save section dimensions
          @line_info.real_height.each do |k, v|
            @quotation_line.section_heights.create(sort_order: k, value: v)
          end
          @line_info.real_width.each do |k, v|
            @quotation_line.section_widths.create(sort_order: k, value: v)
          end

          total_transom_height = 0.0
          # save the transom heights
          if shape.has_upper_transom?
            @quotation_line.section_heights.create(sort_order: @line_info.upper_transom_index,
                                                   value: @line_info.section_height[@line_info.upper_transom_index])
            @quotation_line.section_widths.create(sort_order: @line_info.upper_transom_index,
                                                  value: @line_info.total_width)
            total_transom_height += @line_info.section_height[@line_info.upper_transom_index].to_f
          end

          if shape.has_lower_transom?
            @quotation_line.section_heights.create(sort_order: @line_info.lower_transom_index,
                                                   value: @line_info.section_height[@line_info.lower_transom_index])
            @quotation_line.section_widths.create(sort_order: @line_info.lower_transom_index,
                                                  value: @line_info.total_width)
            total_transom_height += @line_info.section_height[@line_info.lower_transom_index].to_f
          end

          # save the sidelight widths
          if shape.has_left_sidelight?
            @quotation_line.section_heights.create(sort_order: @line_info.left_sidelight_index,
                                                   value: @line_info.total_height - total_transom_height)
            @quotation_line.section_widths.create(sort_order: @line_info.left_sidelight_index,
                                                  value: @line_info.section_width[@line_info.left_sidelight_index])
          end

          if shape.has_right_sidelight?
            @quotation_line.section_heights.create(sort_order: @line_info.right_sidelight_index,
                                                   value: @line_info.total_height - total_transom_height)
            @quotation_line.section_widths.create(sort_order: @line_info.right_sidelight_index,
                                                  value: @line_info.section_width[@line_info.right_sidelight_index])
          end

          # save options
          new_selected_options.each do |o|
            @quotation_line.options_quotation_lines << OptionsQuotationLine.new(option_id: o,
                                                                                quantity: ((qty = params["option_quantity_#{o}".to_sym]) ? qty.to_i : 1))
          end

          # create and save image
          @quotation_line.create_image

          flash[:notice] = trn_geth('LABEL_QUOTATION_LINE') + ' ' + trn_get('MSG_SUCCESSFULLY_CREATED_F')
          redirect_to controller: 'quotation', action: 'show', id: @quotation_line.quotation.slug
        else
          render action: 'add'
        end
      end
    end
  end

  def edit
    @quotation_line = QuotationLine.includes(serie: [options: %i[pricing_method options_minimum_unit]],
                                             options_quotation_lines: :option).find(params[:id])

    # we have two use cases..this is is #2
    @line_info = QuotationLineParameters.new(@quotation_line).from_line
    calculate_dimensions(@quotation_line.width, @quotation_line.height)

    @serie = @quotation_line.serie

    @options = @serie.options
    @options.each do |option|
      next unless option.pricing_method.quantifiable

      oli_index = @quotation_line.options_quotation_lines.index { |o| o.option_id == option.id }
      qty = if oli_index.nil?
              option.minimum_quantity
            else
              @quotation_line.options_quotation_lines[oli_index].quantity
            end
      instance_variable_set "@option_quantity_#{option.id}".to_sym, qty
    end

    # for the view
    @openings = @line_info.openings
    @section_height = @line_info.section_height
    @section_width = @line_info.section_width
  end

  def update
    @quotation_line = QuotationLine.find(params[:id])
    shape = Shape.find(params[:shape_id])
    @quotation_line.shape = shape

    @line_info = QuotationLineParameters.new(@quotation_line).from_params(params, shape)

    @quotation_line.serie_id = params[:serie_id]
    @serie = Serie.find(@quotation_line.serie_id)
    @options = @serie.options.sort_by { |o| o.description }

    error = calculate_dimensions(params[:quotation_line][:width], params[:quotation_line][:height])
    if error
      @quotation_line.price = 0
      flash[:notice] = error
      render action: 'edit'
    else

      new_selected_options = get_options_from_params(params)

      begin
        @quotation_line.price = calculate_price(@quotation_line.serie_id, @quotation_line.shape_id,
                                                @line_info.openings, new_selected_options)
        @quotation_line.original_price = @quotation_line.price
      rescue PriceError => e
        @quotation_line.price = 0
        flash[:notice] = e.message
        render action: 'edit'
      end
      if @quotation_line.price != 0

        # save calculated dimensions
        params[:quotation_line][:height] = @line_info.total_height
        params[:quotation_line][:width] = @line_info.total_width
        if @quotation_line.update_attributes(params[:quotation_line])

          # update openings
          @line_info.openings.each do |order, opening_id|
            opening = @quotation_line.quotation_lines_openings.select { |o| o.sort_order == order.to_i }.first
            opening ||= @quotation_line.quotation_lines_openings.build(opening_id: opening_id.to_i,
                                                                       sort_order: order.to_i)
            opening.update_attributes(opening_id: opening_id.to_i, sort_order: order.to_i)
          end

          # destroy any excess openings. This happens when user goes from 3 openings to 2 or 1, for example
          @quotation_line.quotation_lines_openings[@line_info.openings.length..@quotation_line.quotation_lines_openings.length].each do |opening|
            opening.destroy
          end

          # clear and save section dimensions
          @quotation_line.section_heights.clear
          @quotation_line.section_widths.clear
          @line_info.real_height.each do |k, v|
            @quotation_line.section_heights.create(sort_order: k, value: v)
          end
          @line_info.real_width.each do |k, v|
            @quotation_line.section_widths.create(sort_order: k, value: v)
          end

          total_transom_height = 0.0
          # save the transom heights
          if shape.has_upper_transom?
            @quotation_line.section_heights.create(sort_order: @line_info.upper_transom_index,
                                                   value: @line_info.section_height[@line_info.upper_transom_index])
            @quotation_line.section_widths.create(sort_order: @line_info.upper_transom_index,
                                                  value: @line_info.total_width)
            total_transom_height += @line_info.section_height[@line_info.upper_transom_index].to_f
          end

          if shape.has_lower_transom?
            @quotation_line.section_heights.create(sort_order: @line_info.lower_transom_index,
                                                   value: @line_info.section_height[@line_info.lower_transom_index])
            @quotation_line.section_widths.create(sort_order: @line_info.lower_transom_index,
                                                  value: @line_info.total_width)
            total_transom_height += @line_info.section_height[@line_info.lower_transom_index].to_f
          end

          # save the sidelight widths
          if shape.has_left_sidelight?
            @quotation_line.section_heights.create(sort_order: @line_info.left_sidelight_index,
                                                   value: @line_info.total_height - total_transom_height)
            @quotation_line.section_widths.create(sort_order: @line_info.left_sidelight_index,
                                                  value: @line_info.section_width[@line_info.left_sidelight_index])
          end

          if shape.has_right_sidelight?
            @quotation_line.section_heights.create(sort_order: @line_info.right_sidelight_index,
                                                   value: @line_info.total_height - total_transom_height)
            @quotation_line.section_widths.create(sort_order: @line_info.right_sidelight_index,
                                                  value: @line_info.section_width[@line_info.right_sidelight_index])
          end

          # update options
          old_selected_options = @quotation_line.options_quotation_lines.all.map { |o| o.option.id }
          (new_selected_options - old_selected_options).each do |o|
            @quotation_line.options_quotation_lines << OptionsQuotationLine.new(option_id: o,
                                                                                quantity: ((qty = params["option_quantity_#{o}".to_sym]) ? qty.to_i : 1))
          end
          (old_selected_options - new_selected_options).each do |o|
            @quotation_line.options_quotation_lines.delete @quotation_line.options_quotation_lines.first(conditions: { option_id: o })
          end
          # update quantities for existing options
          @quotation_line.options_quotation_lines.each do |o|
            o.update_attribute :quantity, ((qty = params["option_quantity_#{o.option.id}".to_sym]) ? qty.to_i : 1)
          end

          # create and save image
          @quotation_line.create_image

          flash[:notice] = trn_geth('LABEL_QUOTATION_LINE') + ' ' + trn_get('MSG_SUCCESSFULLY_MODIFIED_F')
          redirect_to controller: 'quotation', action: 'show', id: @quotation_line.quotation.slug
        else
          render action: 'edit'
        end
      end
    end
  end

  def delete
    quotation_line = QuotationLine.find(params[:id])
    quotation_line.destroy
    flash[:notice] = trn_geth('LABEL_QUOTATION_LINE') + ' ' + trn_get('MSG_SUCCESSFULLY_DELETED_F')
    redirect_to controller: 'quotation', action: 'show', id: quotation_line.quotation.slug
  end

  def update_line_price
    updated_price = params[:current_price]
    @quotation_line = QuotationLine.find(params[:id])
    original_price = @quotation_line.original_price || @quotation_line.price

    # if the new price is empty or not supplied (nil), revert to original price
    updated_price = original_price if updated_price.blank?
    @quotation_line.update_attributes(original_price: original_price, price: updated_price)

    render js: 'window.location = "' + quotation_path(@quotation_line.quotation.slug) + '"'
  end

  private

  def validate_height(serie, h)
    # make sure that the height is greater than or equal to the first value in the table
    # we do this by looking for an entry that is less than or equal to the real height. If nothing is found,
    # that means we're below the allowed size,
    raise PriceError, trn_get('MSG_HEIGHT_TOO_SMALL') unless serie.heights.exists?(["value <= #{h}"])

    selected_height = serie.heights.where('value >= ?', h).order('value').first
    raise PriceError, trn_get('MSG_CANT_FIND_HEIGHT') unless selected_height

    selected_height
  end

  def validate_width(serie, w)
    raise PriceError, trn_get('MSG_WIDTH_TOO_SMALL') unless serie.widths.exists?(["value <= #{w}"])

    selected_width = serie.widths.where('value >= ?', w).order('value').first
    raise PriceError, trn_get('MSG_CANT_FIND_WIDTH') unless selected_width

    selected_width
  end

  def calculate_option_prices(options_ids, openings, shape)
    price = 0
    options_ids.each do |o|
      option = Option.find(o)
      option_price = calculate_one_option_price(option, openings, shape)
      qty = ((opt_qty = params["option_quantity_#{o}".to_sym]) ? opt_qty.to_i : 1)
      price += option_price * qty
    end

    price
  end

  def calculate_price(_serie_id, shape_id, openings, options_ids)
    serie = @quotation_line.serie
    shape = Shape.find(shape_id)

    price = 0

    # calculate base price for all sections
    1.upto(shape.sections_height) do |r|
      selected_height = validate_height(serie, @line_info.real_height[r])
      1.upto(shape.sections_width) do |c|
        selected_width = validate_width(serie, @line_info.real_width[c])
        found_price = SeriePrice.where('width_id = ? and height_id = ? and opening_id = ?',
                                       selected_width.id, selected_height.id, openings[(((r - 1) * shape.sections_width) + c).to_s].to_i).first
        raise PriceError, trn_get('MSG_CANT_FIND_PRICE') unless found_price

        price += found_price.price
      end
    end

    # for shapes that have transoms, price them here
    if shape.has_upper_transom?
      price += calculate_special_section_price(serie, openings, upper_transom_index(shape),
                                               @line_info.total_width)
    end
    if shape.has_lower_transom?
      price += calculate_special_section_price(serie, openings, lower_transom_index(shape),
                                               @line_info.total_width)
    end

    # for shapes that have sidelights, price them here
    price += calculate_special_section_price(serie, openings, left_sidelight_index(shape)) if shape.has_left_sidelight?
    if shape.has_right_sidelight?
      price += calculate_special_section_price(serie, openings,
                                               right_sidelight_index(shape))
    end

    # calculate options price
    price += calculate_option_prices(options_ids, openings, shape)
    price
  end

  def calculate_special_section_price(serie, openings, index, width = nil)
    selected_height = validate_height(serie, @line_info.section_height[index])
    selected_width = validate_width(serie, width || @line_info.section_width[index])
    found_price = SeriePrice.where('width_id = ? and height_id = ? and opening_id = ?',
                                   selected_width.id, selected_height.id, openings[index].to_i).first
    raise PriceError, trn_get('MSG_CANT_FIND_PRICE') unless found_price

    found_price.price
  end

  def calculate_dimensions(width, height)
    # total width & height INCLUDES transoms &sidelights
    @line_info.total_height = height.to_f
    @line_info.total_width = width.to_f
    adjust_total_height_for_transoms = @line_info.total_height == 0
    adjust_total_width_for_sidelights = @line_info.total_width == 0
    shape = Shape.find(@quotation_line.shape_id)

    total_transom_height = @line_info.total_transom_height
    total_sidelight_width = @line_info.total_sidelight_width

    ## calculate all heights
    # get known heights, or 0 if missing
    @line_info.real_height = {}
    1.upto(shape.sections_height) do |l|
      @line_info.real_height[l] = @line_info.section_height[l.to_s].to_f
    end
    # count missing heights
    cpt_missing = 0
    acc_dimension = 0
    @line_info.real_height.each_value do |v|
      cpt_missing += 1 if v == 0
      acc_dimension += v
    end

    # if we have missing heights and total_height is not specified we can't continue
    return trn_get('MSG_NOT_ENOUGH_DATA') if cpt_missing > 0 && @line_info.total_height == 0

    # complete missing heights if possible
    if cpt_missing == 0
      # no missing heights so just compute the total height if not supplied
      @line_info.total_height = acc_dimension + total_transom_height if @line_info.total_height == 0
      return trn_get('MSG_HEIGHTS_DONT_MATCH') if @line_info.total_height != acc_dimension + total_transom_height
    else
      # any height not accounted for to be spread across any openings with 0 height
      deducted = (@line_info.total_height - acc_dimension - total_transom_height) / cpt_missing
      @line_info.real_height.each do |k, v|
        @line_info.real_height[k] = deducted if v == 0
      end
    end
    # check that we have no negative dimensions
    @line_info.real_height.each_value do |v|
      return trn_get('MSG_NEGATIVE_DIMENSION') if v < 0
    end

    ## calculate all widths
    # get known widths, or 0 if missing
    @line_info.real_width = {}
    1.upto(shape.sections_width) do |l|
      @line_info.real_width[l] = @line_info.section_width[l.to_s].to_f
    end
    # count missing widths
    cpt_missing = 0
    acc_dimension = 0
    @line_info.real_width.each_value do |v|
      cpt_missing += 1 if v == 0
      acc_dimension += v
    end

    # if we have missing heights and total_height is not specified we can't continue
    return trn_get('MSG_NOT_ENOUGH_DATA') if cpt_missing > 0 && @line_info.total_width == 0

    # complete missing widths if possible
    if cpt_missing == 0
      @line_info.total_width = acc_dimension + total_sidelight_width if @line_info.total_width == 0
      if (@line_info.total_width - (acc_dimension + total_sidelight_width)).abs.round(3) > 0.001
        return trn_get('MSG_WIDTHS_DONT_MATCH')
      end
    else
      deducted = (@line_info.total_width - acc_dimension - total_sidelight_width) / cpt_missing
      @line_info.real_width.each do |k, v|
        @line_info.real_width[k] = deducted.round(3) if v == 0
      end
    end
    # check that we have no negative dimensions
    @line_info.real_width.each_value do |v|
      return trn_get('MSG_NEGATIVE_DIMENSION') if v < 0
    end

    @line_info.section_height[@line_info.left_sidelight_index] ||= @line_info.total_height - total_transom_height
    @line_info.section_height[@line_info.right_sidelight_index] ||= @line_info.total_height - total_transom_height

    nil
  end

  # @param [Shape] shape
  def upper_transom_index(shape)
    @quotation_line.upper_transom_index(shape).to_s
  end

  def lower_transom_index(shape)
    @quotation_line.lower_transom_index(shape).to_s
  end

  def left_sidelight_index(shape)
    @quotation_line.left_sidelight_index(shape).to_s
  end

  def right_sidelight_index(shape)
    @quotation_line.right_sidelight_index(shape).to_s
  end

  def get_options_from_params(params)
    new_selected_options = params[:options] ? params[:options].map { |o| o.to_i } : []
    # we have params[:option_category_<id>] that hold a single option id for single-select categories
    # we can take those id's and merge them into new_selected_options

    more_options = params.keys.grep(/options_category_[0-9]+/).map { |k| params[k] }.flatten
    new_selected_options += more_options
    # remove any options with index of -1, those are the special "None" options
    new_selected_options.reject! { |i| i.to_i == -1 }
    new_selected_options
  end

  protected

  def calculate_one_option_price(option, openings, shape)
    Pricing::ComputeOptionPrice.new(@quotation_line, @line_info).call(option, openings, shape)
  end

  def copy_options_from_last_line
    last_line = @quotation_line.quotation.quotation_lines.last
    return if last_line.nil?

    last_line.options_quotation_lines.each do |o|
      new_attributes = o.attributes
      new_attributes.delete('id')
      @quotation_line.options_quotation_lines.build(new_attributes)
    end
    @quotation_line.interior_color = last_line.interior_color
    @quotation_line.exterior_color = last_line.exterior_color
    @quotation_line.standard_interior_color = last_line.standard_interior_color
    @quotation_line.standard_exterior_color = last_line.standard_exterior_color
  end

  def initialize_options_for_series
    @options = @serie.options.sort_by { |o| o.description }
    @options.each do |option|
      next unless option.pricing_method.quantifiable

      oli_index = @quotation_line.options_quotation_lines.index { |o| o.option_id == option.id }
      qty = if oli_index.nil?
              option.minimum_quantity
            else
              @quotation_line.options_quotation_lines[oli_index].quantity
            end
      instance_variable_set "@option_quantity_#{option.id}".to_sym, qty
    end
  end
end
