class OptionQuotationController < ApplicationController
  def add
    @options = Option.order(:description)
    @quotation = Quotation.find_by_slug(params[:id])
    @quantity = 1
  end

  def create
    @quotation = Quotation.find_by_slug(params[:id])
    option = Option.find(params[:option_id])
    option_line = OptionsQuotation.new(option_id: option.id, quantity: params[:quantity].to_i,
                                       original_price: option.price, unit_price: option.price)
    @quotation.options_quotations << option_line
    redirect_to controller: 'quotation', action: 'show', id: @quotation.slug
  end

  def edit
    @options = Option.order(:description)
    @option = OptionsQuotation.find(params[:id])
  end

  def update
    option = Option.find(params[:option_id])
    option_line = OptionsQuotation.find(params[:id])
    option_line.update_attributes(option_id: option.id, quantity: params[:quantity].to_i,
                                  original_price: option.price, unit_price: option.price)

    redirect_to controller: 'quotation', action: 'show', id: option_line.quotation.slug
  end

  def update_line_price
    updated_price = params[:current_price]
    option = OptionsQuotation.find(params[:id])
    original_price = option.original_price || option.unit_price

    # if the new price is empty or not supplied (nil), revert to original price
    updated_price = original_price if updated_price.blank?
    option.update_attributes(original_price: original_price, unit_price: updated_price)

    render js: "window.location = \"#{quotation_path(option.quotation.slug)}\""
  end

  def delete
    @option = OptionsQuotation.find(params[:id])
    @option.destroy
    redirect_to controller: 'quotation', action: 'show', id: @option.quotation.slug
  end
end
