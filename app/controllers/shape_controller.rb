class ShapeController < ApplicationController
  def list
    @shapes = Shape.find(:all, :order => "name")
  end

  def show
    @shape = Shape.find(params[:id])
  end

  def add
    @shape = Shape.new
  end

  def create
    @shape = Shape.new(params[:shape])
    if @shape.save
      flash[:notice] = trn_geth('LABEL_SHAPE') + " " + trn_get('MSG_SUCCESSFULLY_CREATED_F')
      redirect_to :action => 'show', :id => @shape
    else
      render :action => 'add'
    end
  end

  def edit
    @shape = Shape.find(params[:id])
  end

  def update
    @shape = Shape.find(params[:id])
    if @shape.update_attributes(params[:shape])
      flash[:notice] = trn_geth('LABEL_SHAPE') + " " + trn_get('MSG_SUCCESSFULLY_MODIFIED_F')
      redirect_to :action => 'show', :id => @shape
    else
      render :action => 'edit'
    end
  end

  def delete
    Shape.find(params[:id]).destroy
    flash[:notice] = trn_geth('LABEL_SHAPE') + " " + trn_get('MSG_SUCCESSFULLY_DELETED_F')
    redirect_to :action => 'list'
  end
end
