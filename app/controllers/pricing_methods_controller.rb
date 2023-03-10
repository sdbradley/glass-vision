class PricingMethodsController < ApplicationController
  # GET /pricing_methods
  # GET /pricing_methods.xml
  def index
    @pricing_methods = PricingMethod.all

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render xml: @pricing_methods }
    end
  end

  # GET /pricing_methods/1
  # GET /pricing_methods/1.xml
  def show
    @pricing_method = PricingMethod.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render xml: @pricing_method }
    end
  end

  # GET /pricing_methods/new
  # GET /pricing_methods/new.xml
  def new
    @pricing_method = PricingMethod.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render xml: @pricing_method }
    end
  end

  # GET /pricing_methods/1/edit
  def edit
    @pricing_method = PricingMethod.find(params[:id])
  end

  # POST /pricing_methods
  # POST /pricing_methods.xml
  def create
    @pricing_method = PricingMethod.new(params[:pricing_method])

    respond_to do |format|
      if @pricing_method.save
        format.html { redirect_to(@pricing_method, notice: 'Pricing method was successfully created.') }
        format.xml  { render xml: @pricing_method, status: :created, location: @pricing_method }
      else
        format.html { render action: 'new' }
        format.xml  { render xml: @pricing_method.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /pricing_methods/1
  # PUT /pricing_methods/1.xml
  def update
    @pricing_method = PricingMethod.find(params[:id])

    respond_to do |format|
      if @pricing_method.update_attributes(params[:pricing_method])
        format.html { redirect_to(pricing_methods_path, notice: trn_get('PRICING_METHOD_UPDATED')) }
        format.xml  { head :ok }
      else
        format.html { render action: 'edit' }
        format.xml  { render xml: @pricing_method.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /pricing_methods/1
  # DELETE /pricing_methods/1.xml
  def destroy
    @pricing_method = PricingMethod.find(params[:id])
    @pricing_method.destroy

    respond_to do |format|
      format.html { redirect_to(pricing_methods_url) }
      format.xml  { head :ok }
    end
  end
end
