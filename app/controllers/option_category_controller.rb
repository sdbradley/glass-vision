class OptionCategoryController < ApplicationController
  before_filter :check_administrator_role

  def index
    list
    render :action => 'list'
  end

  # GETs should be safe (see http://www.w3.org/2001/tag/doc/whenToUseGet.html)
  verify :method => :post, :only => [ :destroy, :create, :update ],
         :redirect_to => { :action => :list }

  def list
    @option_category_pages, @option_categories = paginate :option_categories, :per_page => 10, :order => 'display_order, name'
  end

  def show
    @option_category = OptionCategory.find(params[:id])
  end

  def add
    @option_category = OptionCategory.new
  end

  def create
    @option_category = OptionCategory.new(params[:option_category])
    if @option_category.save
      flash[:notice] = 'OptionCategory was successfully created.'
      redirect_to :action => 'list'
    else
      render :action => 'new'
    end
  end

  def edit
    @option_category = OptionCategory.find(params[:id])
  end

  def update
    @option_category = OptionCategory.find(params[:id])
    if @option_category.update_attributes(params[:option_category])
      flash[:notice] = 'OptionCategory was successfully updated.'
      redirect_to :action => 'show', :id => @option_category
    else
      render :action => 'edit'
    end
  end

  def delete
    OptionCategory.find(params[:id]).destroy
    redirect_to :action => 'list'
  end
end
