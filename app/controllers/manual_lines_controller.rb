class ManualLinesController < ApplicationController
  def new
    quotation = Quotation.find_by_slug(params[:id])
    @manual_line = ManualLine.new(quotation_id: quotation.id, quantity: 1, unit_price: 0)
  end

  def create
    @manual_line = ManualLine.new(params[:manual_line])
    if @manual_line.save
      flash[:notice] = trn_geth('LABEL_MANUAL_OPTION') + ' ' + trn_get('MSG_SUCCESSFULLY_CREATED_F')
      redirect_to controller: 'quotation', action: 'show', id: @manual_line.quotation.slug
    else
      render action: 'new'
    end
  end

  def edit
    @manual_line = ManualLine.find(params[:id])
  end

  def update
    @manual_line = ManualLine.find(params[:id])
    if @manual_line.update_attributes(params[:manual_line])
      flash[:notice] = trn_geth('LABEL_MANUAL_OPTION') + ' ' + trn_get('MSG_SUCCESSFULLY_MODIFIED_F')
      redirect_to controller: 'quotation', action: 'show', id: @manual_line.quotation.slug
    else
      render action: 'edit'
    end
  end

  def delete
    @manual_line = ManualLine.find(params[:id])
    @manual_line.destroy
    flash[:notice] = trn_geth('LABEL_MANUAL_OPTION') + ' ' + trn_get('MSG_SUCCESSFULLY_DELETED_F')
    redirect_to controller: 'quotation', action: 'show', id: @manual_line.quotation.slug
  end

  def update_line_price
    updated_price = params[:current_price]
    @manual_line = ManualLine.find(params[:id])
    original_price = @manual_line.original_price || @manual_line.unit_price

    # if the new price is empty or not supplied (nil), revert to original price
    updated_price = original_price if updated_price.blank?
    @manual_line.update_attributes(original_price: original_price, unit_price: updated_price)

    render js: 'window.location = "' + quotation_path(@manual_line.quotation.slug) + '"'
  end
end
