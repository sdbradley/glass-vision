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
    @options = Serie.find(@quotation_line.serie_id).options.sort_by { |o| o.tr_description }
  end

  def create
    @quotation_line = QuotationLine.new(params[:quotation_line])
    @openings = params[:openings]
    @options = Serie.find(@quotation_line.serie_id).options.sort_by { |o| o.tr_description }
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
          @openings.each_pair { |key, value|
            @quotation_line.quotation_lines_openings.create(:opening_id => value.to_i, :sort_order => key.to_i)
          }

          # save section dimensions
          @real_height.each do |k, v|
            @quotation_line.section_heights.create(:sort_order => k, :value => v)
          end
          @real_width.each do |k, v|
            @quotation_line.section_widths.create(:sort_order => k, :value => v)
          end

          # save options
          new_selected_options.each { |o|
            @quotation_line.options << Option.find(o)
          }

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
    @quotation_line = QuotationLine.find(params[:id])
    @openings = {}
    @quotation_line.quotation_lines_openings.each { |o|
      @openings[o.sort_order.to_s] = o.opening_id
    }
    @section_height = {}
    @quotation_line.section_heights.each { |h|
      @section_height[h.sort_order.to_s] = h.value
    }
    @section_width = {}
    @quotation_line.section_widths.each { |w|
      @section_width[w.sort_order.to_s] = w.value
    }
    @options = @quotation_line.serie.options.sort_by {|o| o.tr_description }
  end

  def update
    @quotation_line = QuotationLine.find(params[:id])
    @openings = params[:openings]
    @options = @quotation_line.serie.options.sort_by {|o| o.tr_description }
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
          @quotation_line.quotation_lines_openings.each { |o|
            o.update_attribute 'opening_id', @openings[o.sort_order.to_s].to_i
          }

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
          old_selected_options = @quotation_line.options.map{ |o| o.id }
          (new_selected_options - old_selected_options).each { |o|
            @quotation_line.options << Option.find(o)
          }
          (old_selected_options - new_selected_options).each { |o|
            @quotation_line.options.delete Option.find(o)
          }

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
    serie = Serie.find(serie_id)
    shape = Shape.find(shape_id)

    price = 0

    # calculate base price for all sections
    1.upto(shape.sections_height) do |r|
      selected_height = serie.heights.find(:first, :conditions => "value >= #{@real_height[r]}", :order => 'value')
      if !selected_height
        raise PriceError, trn_get('MSG_CANT_FIND_HEIGHT')
      end
      1.upto(shape.sections_width) do |c|
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
    options_ids.each { |o|
      option = Option.find(o)
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
          price += option.price * area
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
          price += option.price * perimeter
        when 3 # price per section
          price += option.price * openings.length
        when 4 # price per opening section
          nb_sections = 0
          openings.each_value { |v| nb_sections += 1 if Opening.find(v.to_i).openable }
          price += option.price * nb_sections
        when 5 # price by fixed section
          nb_sections = 0
          openings.each_value { |v| nb_sections += 1 if !Opening.find(v.to_i).openable }
          price += option.price * nb_sections
        when 6 # unit price
          price += option.price
        when 7 # price per corner
          price += option.price * shape.corners
      end
    }
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
    @real_height.each { |k, v|
      cpt_missing += 1 if v == 0
      acc_dimension += v
    }
    # complete missing heights if possible
    if cpt_missing == 0
      @total_height = acc_dimension if @total_height == 0
    else
      if @total_height == 0
        return trn_get('MSG_NOT_ENOUGH_DATA')
      else
        deducted = (@total_height - acc_dimension) / cpt_missing
        @real_height.each { |k, v|
          @real_height[k] = deducted if v == 0
        }
      end
    end
    # check that we have no negative dimensions
    @real_height.each_value { |v|
      return trn_get('MSG_NEGATIVE_DIMENSION') if v < 0
    }

    ## calculate all widths
    # get known widths, or 0 if missing
    @real_width = {}
    1.upto(shape.sections_width) do |l|
      @real_width[l] = @section_width[l.to_s].to_f
    end
    # count missing widths
    cpt_missing = 0
    acc_dimension = 0
    @real_width.each { |k, v|
      cpt_missing += 1 if v == 0
      acc_dimension += v
    }
    # complete missing widths if possible
    if cpt_missing == 0
      @total_width = acc_dimension if @total_width == 0
    else
      if @total_width == 0
        return trn_get('MSG_NOT_ENOUGH_DATA')
      else
        deducted = (@total_width - acc_dimension) / cpt_missing
        @real_width.each { |k, v|
          @real_width[k] = deducted if v == 0
        }
      end
    end
    # check that we have no negative dimensions
    @real_width.each_value { |v|
      return trn_get('MSG_NEGATIVE_DIMENSION') if v < 0
    }
    return nil
  end
end
