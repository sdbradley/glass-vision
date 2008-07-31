class OptionController < ApplicationController
    before_filter :check_administrator_role

  def list
    @options = Option.find(:all, :order => 'description')
  end

  def show
    @option = Option.find(params[:id])
  end

  def add
    @option = Option.new
  end

  def create
    @option = Option.new(params[:option])
    if @option.save
      flash[:notice] = trn_geth('LABEL_OPTION') + " " + trn_get('MSG_SUCCESSFULLY_CREATED_F')
      redirect_to :action => 'show', :id => @option
    else
      render :action => 'add'
    end
  end

  def edit
    @option = Option.find(params[:id])
  end

  def update
    @option = Option.find(params[:id])
    if @option.update_attributes(params[:option])
      flash[:notice] = trn_geth('LABEL_OPTION') + " " + trn_get('MSG_SUCCESSFULLY_MODIFIED_F')
      redirect_to :action => 'show', :id => @option
    else
      render :action => 'edit'
    end
  end

  def delete
    Option.find(params[:id]).destroy
    flash[:notice] = trn_geth('LABEL_OPTION') + " " + trn_get('MSG_SUCCESSFULLY_DELETED_F')
    redirect_to :action => 'list'
  end
end
