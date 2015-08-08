class OptionCategoriesController < ApplicationController
  before_filter :check_administrator_role

  def index
    @option_categories = OptionCategory.order('option_categories.display_order, option_categories.name').paginate(:page => params[:page], :per_page => 25)
  end

  # GETs should be safe (see http://www.w3.org/2001/tag/doc/whenToUseGet.html)
  verify :method => :post, :only => [ :destroy, :create, :update, :update_options ],
         :redirect_to => { :action => :index }


  def show
    @option_category = OptionCategory.find(params[:id])
  end

  def new
    @option_category = OptionCategory.new
  end

  def create
    @option_category = OptionCategory.new(params[:option_category])
    if @option_category.save
      flash[:notice] = trn_get('MSG_CATEGORY_CREATED')
      redirect_to option_categories_path
    else
      render :action => 'add'
    end
  end

  def edit
    @option_category = OptionCategory.find(params[:id])
  end

  def edit_options
    @option_category = OptionCategory.find(params[:option_category_id])
    @options = Option.includes(:option_categories).where('ISNULL(option_categories_options.option_category_id)')
  end

  def update_options
    @option_category = OptionCategory.find(params[:option_category_id])
    # need a transaction here
    # delete existing options
    @option_category.options.delete_all

    # now save all options passed in
    @option_category.option_ids =  params[:options]

    if @option_category.save!
      flash[:notice] = trn_get('MSG_CATEGORY_UPDATED')
      redirect_to option_category_path(@option_category)
     else
      render :action => 'edit_options'
    end
  end

  def update
    @option_category = OptionCategory.find(params[:id])
    if @option_category.update_attributes(params[:option_category])
      flash[:notice] = trn_get('MSG_CATEGORY_UPDATED')
      redirect_to option_category_path(@option_category)
    else
      render :action => 'edit'
    end
  end

  def destroby
    @option_category = OptionCategory.find(params[:id])
    @option_category.options.delete_all
    @option_category.destroy
    redirect_to option_categories_path
  end
end
