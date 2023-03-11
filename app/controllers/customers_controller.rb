class CustomersController < ApplicationController
  # sortable_attributes  :name, :email
  SEARCH_FIELDS = %w[search_name search_address search_email].freeze

  def index
    searcher = SearchConditions.new(session, SEARCH_FIELDS)

    conditions = { user_id: @current_user.id } unless @current_user.has_role?('administrator')
    search_conditions = searcher.conditions { |x, v, searcher| search_condition_for(x, v, searcher) }

    @customers = Customer.where(conditions).where(search_conditions).paginate(page: params[:page], per_page: 25) # .order(sort_order: :asc)
  end

  # GETs should be safe (see http://www.w3.org/2001/tag/doc/whenToUseGet.html)
  # verify :method => :post, :only => [ :destroy, :create, :update ],
  #        :redirect_to => { :action => :index }

  def show
    @customer = Customer.find(params[:id])
    return unless @customer.user_id != @current_user.id && !@current_user.has_role?('administrator')

    flash[:notice] = 'Permission denied'
    redirect_to action: 'index'
  end

  def show_by_name
    if request.xml_http_request?
      @customer = Customer.where('name = ?', params[:customer_name].to_s).first
      render partial: 'show_by_name', layout: false unless @customer.nil?
    else
      render nothing: true
    end
  end

  def new
    @customer = Customer.new
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

  def edit
    @customer = Customer.find(update_params[:id])
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

  def search
    searcher = SearchConditions.new(session, SEARCH_FIELDS, params)

    params[:action] = 'index'
    conditions = { user_id: @current_user.id } unless @current_user.has_role?('administrator')
    search_conditions = searcher.conditions { |x, v, searcher| search_condition_for(x, v, searcher) }

    @customers =
      Customer
      .where(conditions)
      .where(search_conditions)
      .order(:name)
      .paginate(page: params[:page], per_page: 25)
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
