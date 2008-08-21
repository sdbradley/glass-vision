class StandardSizeController < ApplicationController

  def add
    @standard_product = StandardSizes.new
    @standard_product.standard_product_id = params[:standard_product_id]
  end

  def create
    @standard_product = StandardSizes.new(params[:sheet])
    if @standard_product.save
      flash[:notice] = trn_geth('LABEL_STANDARDSIZES') + " " + trn_get('MSG_SUCCESSFULLY_CREATED_F')
      redirect_to :controller => "serie", :action => 'show', :id => @standard_product.standard_product_id
    else
      render :action => 'add'
    end
  end

  def edit
    @standard_product = StandardSizes.find(params[:id])
  end

  def update
    @standard_product = StandardSizes.find(params[:id])
    if @standard_product.update_attributes(params[:sheet])
      flash[:notice] = trn_geth('LABEL_STANDARDSIZES') + " " + trn_get('MSG_SUCCESSFULLY_MODIFIED_F')
      redirect_to :controller => "serie", :action => 'show', :id => @standard_product.standard_product_id
    else
      render :action => 'edit'
    end
  end

  def delete
    product = StandardSizes.find(params[:id])
    product.destroy
    flash[:notice] = trn_geth('LABEL_STANDARDSIZES') + " " + trn_get('MSG_SUCCESSFULLY_DELETED_F')
    redirect_to :controller => "serie", :action => 'show', :id => @standard_product.standard_product_id
  end
end
