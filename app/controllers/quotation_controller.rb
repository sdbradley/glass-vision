class QuotationController < ApplicationController
  include Retryable

  autocomplete :customer, :name, full: true, extra_data: %i[address phone fax email]

  before_action :find_quotation, only: %i[show print print_invoice print_manifest print_calculations]
  # sortable_attributes  :updated_at, :slug, :description, :user_id, :consultant

  SEARCH_FIELDS = %w[search_description search_slug].freeze

  def index
    searcher = SearchConditions.new(session, SEARCH_FIELDS, params)

    conditions = { user_id: @current_user.id } unless @current_user.has_role?('administrator')
    search_conditions = searcher.conditions { |x, v, searcher| search_condition_for(x, v, searcher) }

    @quotations = Quotation.includes(:user).where(conditions).where(search_conditions).paginate(page: params[:page], per_page: 25) # .order(sort_order || 'updated_at DESC')
  end

  def show
    return unless @quotation.user_id != @current_user.id && !@current_user.has_role?('administrator')

    flash[:notice] = trn_geth('PERMISSION_DENIED')
    redirect_to action: 'index'
  end

  def new
    @quotation = Quotation.new
    @quotation.discount = @current_user.discount
    @users = User.enabled
  end

  def edit
    @quotation = Quotation.find_by_slug(params[:id])
    @users = User.enabled
  end

  def create
    set_taxes_if_not_present

    @quotation = Quotation.new(quote_params[:quotation])
    @quotation.user_id = @current_user.id
    customer_msg = ''
    if Customer.create_from_quotation_if_new(@quotation)
      customer_msg = "#{trn_geth('LABEL_CUSTOMER')} #{trn_get('MSG_SUCCESSFULLY_CREATED_F')}"
    end
    if @quotation.save
      if @quotation.slug.blank?
        @quotation.slug = InvoiceNumber.get_next_invoice_number
        @quotation.save
      end
      customer_msg += '<br />' if customer_msg.present?
      customer_msg += "#{trn_geth('LABEL_QUOTATION')} #{trn_get('MSG_SUCCESSFULLY_CREATED_F')}"
      flash[notice] = customer_msg.html_safe
      redirect_to action: 'show', id: @quotation.slug
    else
      render action: 'new'
    end
  end

  def update
    set_taxes_if_not_present

    quotation = Quotation.find(params[:id])

    if quotation.update(quote_params[:quotation])
      flash[:notice] = "#{trn_geth('LABEL_QUOTATION')} #{trn_get('MSG_SUCCESSFULLY_MODIFIED_F')}"
      redirect_to action: 'show', id: quotation.slug
    else
      render action: 'edit'
    end
  end

  def destroy
    Quotation.find(params[:id]).destroy
    flash[:notice] = "#{trn_geth('LABEL_QUOTATION')} #{trn_get('MSG_SUCCESSFULLY_DELETED_F')}"
    redirect_to action: 'index'
  end

  def print
    retryable(tries: 5, on: RuntimeError) do
      render pdf: "#{@quotation.slug}-#{@quotation.project_name}", layout: 'printer', disposition: 'inline',
             temp_path: Rails.root.join('tmp'), show_as_html: params[:debug].present?, header: { right: '[page] of [topage]' }
    end
  end

  def print_invoice
    retryable(tries: 5, on: RuntimeError) do
      render pdf: "#{@quotation.slug}-#{@quotation.project_name}-#{trn_get('PRINT_INVOICE_TITLE')}",
             layout: 'printer', show_as_html: params[:debug].present?, header: { right: '[page] of [topage]' }
    end
  end

  def print_manifest
    retryable(tries: 5, on: RuntimeError) do
      render pdf: "#{@quotation.slug}-#{@quotation.project_name}-#{trn_get('BUTTON_PRINT_MANIFEST')}",
             layout: 'printer', show_as_html: params[:debug].present?, header: { right: '[page] of [topage]' }
    end
  end

  def print_calculations
    if current_user.has_role?('administrator')
      retryable(tries: 5, on: RuntimeError) do
        render pdf: "#{@quotation.slug}-#{@quotation.project_name}-#{trn_get('BUTTON_PRINT_CALCULATIONS')}",
               layout: 'printer', show_as_html: params[:debug].present?, header: { right: '[page] of [topage]' }
      end
    else
      redirect_to action: 'index'
    end
  end

  def copy
    #    return unless request.xhr?
    @orig_quotation = Quotation.includes(quotation_lines: [:serie, :shape, { quotation_lines_openings: :opening },
                                                           { options_quotation_lines: :option }]).find_by_slug(params[:quotation_id])
    if @orig_quotation.user_id != @current_user.id && !@current_user.has_role?('administrator')
      flash[notice] = trn_get('PERMISSION_DENIED')
      redirect_to action: 'index'
    end
    @quotation = Quotation.copy(@orig_quotation)
    @quotation.save!
    application_url = "#{request.protocol}#{request.host_with_port}"
    @quotation.regenerate_previews(application_url)
    flash[:notice] = "#{trn_geth('LABEL_QUOTATION')} #{trn_get('MSG_SUCCESSFULLY_CREATED_F')}"
    redirect_to quotation_path(@quotation.slug)
  end

  def search
    searcher = SearchConditions.new(session, SEARCH_FIELDS, params)

    conditions = { user_id: @current_user.id } unless @current_user.has_role?('administrator')
    search_conditions = searcher.conditions { |x, v, searcher| search_condition_for(x, v, searcher) }

    @quotations = Quotation.includes(:user).where(conditions).where(search_conditions).paginate(page: params[:page],
                                                                                                per_page: 25).order('updated_at DESC')

    render :index
  end

  protected

  def search_condition_for(field, value, searcher)
    return nil if value.blank?

    case field.gsub(/search_/, '')
    when 'slug'
      "slug #{searcher.send(:match_anywhere, value)}"
    when 'description'
      "customer_name#{searcher.send(:match_anywhere, value)}"
    end
  end

  def find_quotation
    @quotation = Quotation.includes(quotation_lines: [:serie, :shape, { quotation_lines_openings: :opening },
                                                      { options_quotation_lines: :option }]).find_by_slug(params[:id])
  end

  def set_taxes_if_not_present
    return unless params[:quotation]

    params[:quotation]['taxes']     = 0.0 if params[:quotation]['taxes'].blank?
    params[:quotation]['taxes_pst'] = 0.0 if params[:quotation]['taxes_pst'].blank?
  end

  def get_autocomplete_items(parameters)
    if @current_user.has_role?('administrator')
      super(parameters)
    else
      super(parameters).where(user_id: @current_user.id)
    end
  end

  private

  def quote_params
    params.permit(
      customer: %i[name address phone fax email],
      quotation: %i[description comments project_name customer_name customer_address delivery_address
                    customer_phone customer_fax customer_email contact cell_phone notes transport discount markup taxes taxes_pst deposit ready_to_sign company_id consultant]
    ).to_h.symbolize_keys
  end
end
