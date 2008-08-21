class SheetSizesController < ApplicationController

  def add
    @sheet = SheetSizes.new
    @sheet.sheet_product_id = params[:sheet_product_id]
  end

  def create
    @sheet = SheetSizes.new(params[:sheet])
    if @sheet.save
      flash[:notice] = trn_geth('LABEL_SHEETSIZES') + " " + trn_get('MSG_SUCCESSFULLY_CREATED_F')
      redirect_to :controller => "serie", :action => 'show', :id => @sheet.sheet_product_id
    else
      render :action => 'add'
    end
  end

  def edit
    @sheet = SheetSizes.find(params[:id])
  end

  def update
    @sheet = SheetSizes.find(params[:id])
    if @sheet.update_attributes(params[:sheet])
      flash[:notice] = trn_geth('LABEL_SHEETSIZES') + " " + trn_get('MSG_SUCCESSFULLY_MODIFIED_F')
      redirect_to :controller => "serie", :action => 'show', :id => @sheet.sheet_product_id
    else
      render :action => 'edit'
    end
  end

  def delete
    product = SheetSizes.find(params[:id])
    product.destroy
    flash[:notice] = trn_geth('LABEL_SHEETSIZES') + " " + trn_get('MSG_SUCCESSFULLY_DELETED_F')
    redirect_to :controller => "serie", :action => 'show', :id => @sheet.sheet_product_id
  end
end
