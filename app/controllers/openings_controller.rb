class OpeningsController < ApplicationController
  before_action :check_administrator_role

  def index
    @openings = Opening.all(order: 'name')
  end

  def show
    @opening = Opening.find(params[:id])
  end

  def new
    @opening = Opening.new
  end

  def edit
    @opening = Opening.find(params[:id])
  end

  def create
    @opening = Opening.new(params[:opening])
    if @opening.save
      flash[:notice] = "#{trn_geth('LABEL_OPENING')} #{trn_get('MSG_SUCCESSFULLY_CREATED_F')}"
      redirect_to openings_path
    else
      render action: 'new'
    end
  end

  def update
    @opening = Opening.find(params[:id])
    if @opening.update(params[:opening])
      flash[:notice] = "#{trn_geth('LABEL_OPENING')} #{trn_get('MSG_SUCCESSFULLY_MODIFIED_F')}"
      redirect_to openings_path
    else
      render action: 'edit'
    end
  end

  def destroy
    Opening.find(params[:id]).destroy
    flash[:notice] = "#{trn_geth('LABEL_OPENING')} #{trn_get('MSG_SUCCESSFULLY_DELETED_F')}"
    redirect_to openings_path
  end
end
