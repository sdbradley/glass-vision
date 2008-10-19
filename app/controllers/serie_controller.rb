class SerieController < ApplicationController
    before_filter :check_administrator_role

  def list
    @series = Serie.find(:all, :order => "name")
  end

  def show
    @serie = Serie.find(params[:id])
  end

  def add
    @serie = Serie.new
  end

  def create
    @serie = Serie.new(params[:serie])
    if @serie.save
      flash[:notice] = trn_geth('LABEL_SERIE') + " " + trn_get('MSG_SUCCESSFULLY_CREATED_F')
      redirect_to :action => 'list'
    else
      render :action => 'add'
    end
  end

  def edit
    @serie = Serie.find(params[:id])
  end

  def update
    @serie = Serie.find(params[:id])
    if @serie.update_attributes(params[:serie])
      flash[:notice] = trn_geth('LABEL_SERIE') + " " + trn_get('MSG_SUCCESSFULLY_MODIFIED_F')
      redirect_to :action => 'list'
    else
      render :action => 'edit'
    end
  end

  def delete
    Serie.find(params[:id]).destroy
    flash[:notice] = trn_geth('LABEL_SERIE') + " " + trn_get('MSG_SUCCESSFULLY_DELETED_F')
    redirect_to :action => 'list'
  end

  def edit_prices
    @serie = Serie.find(params[:id])
    @opening = Opening.find(params[:opening_id])
  end

  def update_prices
    params.each_pair { |key, value|
      if key =~ /^price_/
        ids = key.split('_')
        if ids.length == 2 # existing price
          if value.to_f == 0 # must delete existing price
            SeriePrice.find(ids[1].to_i).destroy
          else # must update existing price
            SeriePrice.find(ids[1].to_i).update_attribute :price, value.to_f
          end
        else # new price
          if value.to_f != 0 # doesn't need to create 0 prices
            SeriePrice.create :width_id => ids[1], :height_id => ids[2], :opening_id => params[:opening_id].to_i, :price => value.to_f
          end
        end
      end
    }
    
    redirect_to :action => 'show', :id => params[:id]
  end

  def edit_options
    @serie = Serie.find(params[:id])
    @options = Option.find(:all, :order => 'description')
  end

  def update_options
    @serie = Serie.find(params[:id])
    new_selected_options = params[:options] ? params[:options].map{ |o| o.to_i } : []
    old_selected_options = @serie.options.map{ |o| o.id }
    (new_selected_options - old_selected_options).each { |o|
      @serie.options << Option.find(o)
    }
    (old_selected_options - new_selected_options).each { |o|
      @serie.options.delete Option.find(o)
    }
    redirect_to :action => 'show', :id => @serie
  end

  def import_prices_selection
    @serie = Serie.find(params[:id])
    @opening = Opening.find(params[:opening_id])
    @series = Serie.find(:all, :order => 'name')
    @openings = Opening.find(:all, :order => 'name')
  end

  def import_prices
    @serie = Serie.find(params[:id])
    @opening = Opening.find(params[:opening_id])
    unless params[:selected_serie_id] and params[:selected_opening_id]
      flash[:notice] = trn_get('MSG_STRANGE_ERROR')
      redirect_to :action => 'edit_prices', :id => @serie, :opening_id => @opening.id
      return
    end
    @org_serie = Serie.find(params[:selected_serie_id])
    @org_opening = Opening.find(params[:selected_opening_id])

    cpt = 0
    # loop on widths and heights form source serie
    @org_serie.widths.each { |ow|
      @org_serie.heights.each { |oh|
        # get the source price
        op = SeriePrice.find(:first, :conditions => ['width_id = ? and height_id = ? and opening_id = ?', ow.id, oh.id, @org_opening.id])
        if op # if no price for this width and height, nothing to do
          # get destination width and height with same values than the source width and height
          dw = @serie.widths.find(:first, :conditions => ['value = ?', ow.value])
          dh = @serie.heights.find(:first, :conditions => ['value = ?', oh.value])
          # if the destination serie has same dimensions
          if dw and dh
            # get destination price
            dp = SeriePrice.find(:first, :conditions => ['width_id = ? and height_id = ? and opening_id = ?', dw.id, dh.id, @opening.id])
            if dp # update existing price
              dp.update_attribute :price, op.price
            else # create new price
              SeriePrice.create :width_id => dw.id, :height_id => dh.id, :opening_id => @opening.id, :price => op.price
            end
            cpt += 1
          end
        end
      }
    }

    flash[:notice] = trn_get('MSG_CPT_PRICES_IMPORTED').sub('#cpt#', cpt.to_s)
    redirect_to :action => 'edit_prices', :id => @serie, :opening_id => @opening.id
  end

  def edit_openings
    @serie = Serie.find(params[:id])
    @openings = Opening.find(:all, :order => 'name')
  end

  def update_openings
    @serie = Serie.find(params[:id])
    new_selected_openings = params[:openings] ? params[:openings].map{ |o| o.to_i } : []
    old_selected_openings = @serie.openings.map{ |o| o.id }
    (new_selected_openings - old_selected_openings).each { |o|
      @serie.openings << Opening.find(o)
    }
    (old_selected_openings - new_selected_openings).each { |o|
      @serie.openings.delete Opening.find(o)
    }
    redirect_to :action => 'show', :id => @serie
  end

  def auto_calculate
    @serie = Serie.find(params[:id])
    @opening = Opening.find(params[:opening_id])
    price = params[:square_foot_price].to_f

    insert_queries = []
    update_queries = []
    @serie.widths.each do |ow|
      @serie.heights.each do |oh|
        new_price = (ow.value.to_f * oh.value.to_f / 144 * price).to_i
        # get destination price
        dp = SeriePrice.find(:first, :conditions => ['width_id = ? and height_id = ? and opening_id = ?', ow.id, oh.id, @opening.id])
        if dp # update existing price
          update_queries << "UPDATE serie_prices SET price = #{new_price} WHERE id = #{dp.id}"
        else # create new price
          insert_queries << "(#{ow.id}, #{oh.id}, #{@opening.id}, #{new_price})"
        end
      end
    end
    ActiveRecord::Base.connection.execute "INSERT INTO serie_prices (width_id, height_id, opening_id, price) VALUES " + insert_queries.join(', ') if insert_queries.length > 0
    update_queries.each do |q|
      ActiveRecord::Base.connection.execute q
    end

    redirect_to :action => 'edit_prices', :id => @serie, :opening_id => @opening.id
  end
end
