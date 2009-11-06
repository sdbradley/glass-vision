class PriceError < RuntimeError
end

class QuotationLineController < ApplicationController
  def add
    @quotation_line = QuotationLine.new
    @quotation_line.quotation_id = params[:id]
  end

  def add2
    @quotation_line = QuotationLine.new(params[:quotation_line])
    @quotation_line.width = 0
    @quotation_line.height = 0
    @quotation_line.quantity = 1
    @section_height = {}
    @section_width = {}
    shape = Shape.find(@quotation_line.shape_id)
    1.upto(shape.sections_height) do |s|
      @section_height[s.to_s] = 0
    end
    1.upto(shape.sections_width) do |s|
      @section_width[s.to_s] = 0
    end
    @openings = {}
    @serie = Serie.find(@quotation_line.serie_id, :include => {:options => [:pricing_method, :options_minimum_unit]})
    @options = @serie.options.sort_by { |o| o.tr_description }
    @options.each do |option|
      if option.pricing_method.quantifiable
        instance_variable_set "@option_quantity_#{option.id}".to_sym, option.minimum_quantity
      end
    end
  end

  def create
    @quotation_line = QuotationLine.new(params[:quotation_line])
    @openings = params[:openings]
    @serie = Serie.find(@quotation_line.serie_id)
    @options = @serie.options.sort_by { |o| o.tr_description }
    @section_height = params[:section_height] || {}
    @section_width = params[:section_width] || {}
    error = calculate_dimensions(@quotation_line.width, @quotation_line.height)
    if error
      @quotation_line.price = 0
      flash[:notice] = error
      render :action => 'add2'
    else
      new_selected_options = params[:options] ? params[:options].map{ |o| o.to_i } : []
      begin
        @quotation_line.price = calculate_price(@quotation_line.serie_id, @quotation_line.shape_id, @openings, new_selected_options)
      rescue PriceError => err
        @quotation_line.price = 0
        flash[:notice] = err.message
        render :action => 'add2'
      end
      if @quotation_line.price != 0

        # save calculated dimensions
        @quotation_line.height = @total_height
        @quotation_line.width = @total_width
        if @quotation_line.save

          # save openings
          @openings.each_pair do |key, value|
            @quotation_line.quotation_lines_openings.create(:opening_id => value.to_i, :sort_order => key.to_i)
          end

          # save section dimensions
          @real_height.each do |k, v|
            @quotation_line.section_heights.create(:sort_order => k, :value => v)
          end
          @real_width.each do |k, v|
            @quotation_line.section_widths.create(:sort_order => k, :value => v)
          end

          # save options
          new_selected_options.each do |o|
            @quotation_line.options_quotation_lines << OptionsQuotationLine.new(:option_id => o,
                                                                                :quantity => ((qty = params["option_quantity_#{o}".to_sym]) ? qty.to_i : 1))
          end

          # create and save image
          @quotation_line.create_image

          flash[:notice] = trn_geth('LABEL_QUOTATION_LINE') + " " + trn_get('MSG_SUCCESSFULLY_CREATED_F')
          redirect_to :controller => 'quotation', :action => 'show', :id => @quotation_line.quotation_id
        else
          render :action => 'add'
        end
      end
    end
  end

  def edit
    @quotation_line = QuotationLine.find(params[:id], :include => [:serie, :options_quotation_lines])
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
    @serie = Serie.find(@quotation_line.serie_id)
    @options = @serie.options.sort_by {|o| o.tr_description }
    @options.each do |option|
      if option.pricing_method.quantifiable
        qty = @quotation_line.options_quotation_lines.find(:first, :conditions => {:option_id => option.id})
        if qty
          qty = qty.quantity
        else
          qty = option.minimum_quantity
        end
        instance_variable_set "@option_quantity_#{option.id}".to_sym, qty
      end
    end
  end

  def update
    @quotation_line = QuotationLine.find(params[:id])
    @openings = params[:openings]
    @serie = Serie.find(@quotation_line.serie_id)
    @options = @serie.options.sort_by {|o| o.tr_description }
    @section_height = params[:section_height] || {}
    @section_width = params[:section_width] || {}
    error = calculate_dimensions(params[:quotation_line][:width], params[:quotation_line][:height])
    if error
      @quotation_line.price = 0
      flash[:notice] = error
      render :action => 'edit'
    else
      new_selected_options = params[:options] ? params[:options].map{ |o| o.to_i } : []
      begin
        @quotation_line.price = calculate_price(@quotation_line.serie_id, @quotation_line.shape_id, @openings, new_selected_options)
      rescue PriceError => err
        @quotation_line.price = 0
        flash[:notice] = err.message
        render :action => 'edit'
      end
      if @quotation_line.price != 0

        # save calculated dimensions
        params[:quotation_line][:height] = @total_height
        params[:quotation_line][:width] = @total_width
        if @quotation_line.update_attributes(params[:quotation_line])

          # update openings
          @quotation_line.quotation_lines_openings.each do |o|
            o.update_attribute 'opening_id', @openings[o.sort_order.to_s].to_i
          end

          # clear and save section dimensions
          @quotation_line.section_heights.clear
          @quotation_line.section_widths.clear
          @real_height.each do |k, v|
            @quotation_line.section_heights.create(:sort_order => k, :value => v)
          end
          @real_width.each do |k, v|
            @quotation_line.section_widths.create(:sort_order => k, :value => v)
          end

          # update options
          old_selected_options = @quotation_line.options_quotation_lines.find(:all).map { |o| o.option.id }
          (new_selected_options - old_selected_options).each do |o|
            @quotation_line.options_quotation_lines << OptionsQuotationLine.new(:option_id => o,
                                                                                :quantity => ((qty = params["option_quantity_#{o}".to_sym]) ? qty.to_i : 1))
          end
          (old_selected_options - new_selected_options).each do |o|
            @quotation_line.options_quotation_lines.delete @quotation_line.options_quotation_lines.find(:first, :conditions => {:option_id => o})
          end
          # update quantities for existing options
          @quotation_line.options_quotation_lines.each do |o|
            o.update_attribute :quantity, ((qty = params["option_quantity_#{o.option.id}".to_sym]) ? qty.to_i : 1)
          end

          # create and save image
          @quotation_line.create_image

          flash[:notice] = trn_geth('LABEL_QUOTATION_LINE') + " " + trn_get('MSG_SUCCESSFULLY_MODIFIED_F')
          redirect_to :controller => 'quotation', :action => 'show', :id => @quotation_line.quotation_id
        else
          render :action => 'edit'
        end
      end
    end
  end

  def delete
    quotation_line = QuotationLine.find(params[:id])
    quotation_line.destroy
    flash[:notice] = trn_geth('LABEL_QUOTATION_LINE') + " " + trn_get('MSG_SUCCESSFULLY_DELETED_F')
    redirect_to :controller => 'quotation', :action => 'show', :id => quotation_line.quotation_id
  end

private
  def calculate_price(serie_id, shape_id, openings, options_ids)
    serie = @quotation_line.serie
    shape = Shape.find(shape_id)

    price = 0
    # calculate base price for all sections
    1.upto(shape.sections_height) do |r|
      # make sure that the height is greater than or equal to the first value in the table
      # we do this by looking for an entry that is less than or equal to the real height. If nothing is found,
      # that means we're below the allowed size,
      if !serie.heights.exists?(["value <= #{@real_height[r]}"])
        raise PriceError, trn_get('MSG_HEIGHT_TOO_SMALL')
      end
      selected_height = serie.heights.find(:first, :conditions => "value >= #{@real_height[r]}", :order => 'value')
      if !selected_height
        raise PriceError, trn_get('MSG_CANT_FIND_HEIGHT')
      end
      1.upto(shape.sections_width) do |c|
        if !serie.widths.exists?(["value <= #{@real_width[c]}"])
          raise PriceError, trn_get('MSG_WIDTH_TOO_SMALL')
        end
        selected_width = serie.widths.find(:first, :conditions => "value >= #{@real_width[c]}", :order => 'value')
        if !selected_width
          raise PriceError, trn_get('MSG_CANT_FIND_WIDTH')
        end
        found_price = SeriePrice.find(:first, 
                                      :conditions => ['width_id = ? and height_id = ? and opening_id = ?', selected_width.id, selected_height.id, openings[((r - 1) * shape.sections_width + c).to_s].to_i])
        if !found_price
          raise PriceError, trn_get('MSG_CANT_FIND_PRICE')
        end
        price += found_price.price
      end
    end

    # calculate options price
    options_ids.each do |o|
      option = Option.find(o)
      option_price = 0
      case option.pricing_method_id
        when 1 # price per square foot
          if option.minimum_quantity != 0
            case option.options_minimum_unit_id
            when 1 # per window
              area = (@total_width / 12) * (@total_height / 12)
              area = option.minimum_quantity if area < option.minimum_quantity
            when 2 # per section
              area = 0
              1.upto(shape.sections_height) do |r|
                1.upto(shape.sections_width) do |c|
                  section_area = @real_height[r] * @real_width[c] / 144
                  section_area = option.minimum_quantity if section_area < option.minimum_quantity
                  area += section_area
                end
              end
            when 3 # per glass
              area = 0
              1.upto(shape.sections_height) do |r|
                1.upto(shape.sections_width) do |c|
                  section_area = @real_height[r] * @real_width[c] / 144
                  opening = Opening.find(openings[((r - 1) * shape.sections_width + c).to_s].to_i)
                  glasses_quantity = (opening.glasses_quantity == 0 ? 1 : opening.glasses_quantity)
                  # for now, consider all glasses of the section to be of equal area
                  glass_area = section_area / glasses_quantity
                  glass_area = option.minimum_quantity if glass_area < option.minimum_quantity
                  area += glass_area * glasses_quantity
                end
              end
            end
          else
            area = (@total_width / 12) * (@total_height / 12)
          end
          option_price = option.price * area
        when 2 # price by foot of perimeter
          if option.minimum_quantity != 0
            case option.options_minimum_unit_id
            when 1 # per window
              perimeter = (@total_width * 2 + @total_height * 2) / 12
              perimeter = option.minimum_quantity if perimeter < option.minimum_quantity
            when 2 # per section
              perimeter = 0
              1.upto(shape.sections_height) do |r|
                1.upto(shape.sections_width) do |c|
                  section_perimeter = (@real_height[r] * 2 + @real_width[c] * 2) / 12
                  section_perimeter = option.minimum_quantity if section_perimeter < option.minimum_quantity
                  perimeter += section_perimeter
                end
              end
            when 3 # per glass
              perimeter = 0
              1.upto(shape.sections_height) do |r|
                1.upto(shape.sections_width) do |c|
                  opening = Opening.find(openings[((r - 1) * shape.sections_width + c).to_s].to_i)
                  glasses_quantity = (opening.glasses_quantity == 0 ? 1 : opening.glasses_quantity)
                  # for now, consider all glasses of the section to be of equal perimeter
                  glass_perimeter = (@real_height[r] * 2 + @real_width[c] * 2 / glasses_quantity) / 12
                  glass_perimeter = option.minimum_quantity if glass_perimeter < option.minimum_quantity
                  perimeter += glass_perimeter * glasses_quantity
                end
              end
            end
          else
            perimeter = (@total_width * 2 + @total_height * 2) / 12
          end
          option_price = option.price * perimeter
        when 3 # price per section
          option_price = option.price * openings.length
        when 4 # price per opening section
          nb_sections = 0
          openings.each_value { |v| nb_sections += 1 if Opening.find(v.to_i).openable }
          option_price = option.price * nb_sections
        when 5 # price by fixed section
          nb_sections = 0
          openings.each_value { |v| nb_sections += 1 if !Opening.find(v.to_i).openable }
          option_price = option.price * nb_sections
        when 6 # unit price
          option_price = option.price
        when 7 # price per corner
          option_price = option.price * shape.corners
      end
      qty = ((opt_qty = params["option_quantity_#{o}".to_sym]) ? opt_qty.to_i : 1)
      price += option_price * qty
    end
    price
  end

  def calculate_dimensions(width, height)
    @total_height = height.to_f
    @total_width = width.to_f
    shape = Shape.find(@quotation_line.shape_id)

    ## calculate all heights
    # get known heights, or 0 if missing
    @real_height = {}
    1.upto(shape.sections_height) do |l|
      @real_height[l] = @section_height[l.to_s].to_f
    end
    # count missing heights
    cpt_missing = 0
    acc_dimension = 0
    @real_height.each do |k, v|
      cpt_missing += 1 if v == 0
      acc_dimension += v
    end
    # complete missing heights if possible
    if cpt_missing == 0
      @total_height = acc_dimension if @total_height == 0
    else
      if @total_height == 0
        return trn_get('MSG_NOT_ENOUGH_DATA')
      else
        deducted = (@total_height - acc_dimension) / cpt_missing
        @real_height.each do |k, v|
          @real_height[k] = deducted if v == 0
        end
      end
    end
    # check that we have no negative dimensions
    @real_height.each_value do |v|
      return trn_get('MSG_NEGATIVE_DIMENSION') if v < 0
    end

    ## calculate all widths
    # get known widths, or 0 if missing
    @real_width = {}
    1.upto(shape.sections_width) do |l|
      @real_width[l] = @section_width[l.to_s].to_f
    end
    # count missing widths
    cpt_missing = 0
    acc_dimension = 0
    @real_width.each do |k, v|
      cpt_missing += 1 if v == 0
      acc_dimension += v
    end
    # complete missing widths if possible
    if cpt_missing == 0
      @total_width = acc_dimension if @total_width == 0
    else
      if @total_width == 0
        return trn_get('MSG_NOT_ENOUGH_DATA')
      else
        deducted = (@total_width - acc_dimension) / cpt_missing
        @real_width.each do |k, v|
          @real_width[k] = deducted if v == 0
        end
      end
    end
    # check that we have no negative dimensions
    @real_width.each_value do |v|
      return trn_get('MSG_NEGATIVE_DIMENSION') if v < 0
    end
    return nil
  end
end
