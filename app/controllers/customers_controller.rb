class CustomersController < ApplicationController
  # sortable_attributes  :name, :email
  SEARCH_FIELDS = %w[search_name search_address search_email].freeze

  def index
    searcher = SearchConditions.new(session, SEARCH_FIELDS, params)

    conditions = { user_id: @current_user.id } unless @current_user.admin?
    search_conditions = searcher.conditions { |x, v, searcher| search_condition_for(x, v, searcher) }

    @customers =
      Customer
      .where(conditions)
      .where(search_conditions)
      .order(:name)
      .paginate(page: params[:page], per_page: 25)
  end

  def show
    @customer = Customer.find(params[:id])
    return unless @customer.user_id != @current_user.id && !@current_user.admin?

    flash[:notice] = 'Permission denied'
    redirect_to action: 'index'
  end

  def show_by_name
    if request.xml_http_request?
      @customer = Customer.where(name: params[:customer_name].to_s).first
      render partial: 'show_by_name', layout: false unless @customer.nil?
    else
      render nothing: true
    end
  end

  def new
    @customer = Customer.new
  end

  def edit
    @customer = Customer.find(update_params[:id])
  end

  def create
    @customer = Customer.new(customer_params[:customer])
    @customer.user = @current_user unless @customer.nil?
    if @customer.save
      flash[:notice] = "#{trn_geth('LABEL_CUSTOMER')} #{trn_get('MSG_SUCCESSFULLY_CREATED_F')}"
      redirect_to customers_path
    else
      render action: 'new'
    end
  end

  def update
    @customer = Customer.find(update_params[:id])
    if @customer.update!(customer_params[:customer])
      flash[:notice] = "#{trn_geth('LABEL_CUSTOMER')} #{trn_get('MSG_SUCCESSFULLY_MODIFIED_F')}"
      redirect_to customer_path(@customer)
    else
      render action: 'edit'
    end
  end

  def destroy
    Customer.find(update_params[:id]).destroy
    flash[:notice] = "#{trn_geth('LABEL_CUSTOMER')} #{trn_get('MSG_SUCCESSFULLY_DELETED_F')}"
    redirect_to customers_path
  end



  protected

  def search_condition_for(field, value, searcher)
    return nil if value.blank?

    case field.gsub(/search_/, '')
    when 'name'
      "name #{searcher.send(:match_anywhere, value)}"
    when 'address'
      "address#{searcher.send(:match_anywhere, value)}"
    when 'email'
      "email#{searcher.send(:match_anywhere, value)}"
    end
  end

  private

  def customer_params
    params.permit(customer: %i[name address phone fax email]).to_h.symbolize_keys
  end

  def update_params
    params.permit(%i[id]).to_h.symbolize_keys
  end
end
