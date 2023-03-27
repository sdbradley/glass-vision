class TranslationController < ApplicationController
  before_action :check_administrator_role

  def list
    @translations = Translation.all(order: 'translation_key')
  end

  def add
    @translation = Translation.new
  end

  def edit
    @translation = Translation.find(params[:id])
  end

  def create
    @translation = Translation.new(params[:translation])
    if @translation.save
      flash[:notice] = "#{trn_geth('LABEL_TRANSLATION')} #{trn_get('MSG_SUCCESSFULLY_CREATED_F')}"
      redirect_to action: 'list'
    else
      render action: 'add'
    end
  end

  def update
    @translation = Translation.find(params[:id])
    if @translation.update(params[:translation])
      flash[:notice] = "#{trn_geth('LABEL_TRANSLATION')} #{trn_get('MSG_SUCCESSFULLY_MODIFIED_F')}"
      redirect_to action: 'list'
    else
      render action: 'edit'
    end
  end

  def delete
    Translation.find(params[:id]).destroy
    flash[:notice] = "#{trn_geth('LABEL_TRANSLATION')} #{trn_get('MSG_SUCCESSFULLY_DELETED_F')}"
    redirect_to action: 'list'
  end
end
