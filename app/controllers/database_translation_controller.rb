class DatabaseTranslationController < ApplicationController
  before_action :check_administrator_role
  def list
    @dbtfs = DatabaseTranslationField.order('translation_table_name, translation_field_name')
    return unless params[:dbtf] ||= session[:dbtf]

    session[:dbtf] = (params[:dbtf] ||= session[:dbtf])
    @dbtf = DatabaseTranslationField.find(params[:dbtf] ||= session[:dbtf])
    @dbts = DatabaseTranslation.where(translation_table_name: @dbtf.translation_table_name).where(translation_field_name: @dbtf.translation_field_name)
  end

  def generate
    @log = []
    DatabaseTranslationField.all.each do |dbtf|
      new_items = 0
      old_items = 0
      new_ids = dbtf.translation_table_name.singularize.camelize.constantize.all.collect(&:id)
      old_ids = DatabaseTranslation.where(translation_table_name: dbtf.translation_table_name).where(translation_field_name: dbtf.translation_field_name).collect(&:record_id)
      (new_ids - old_ids).each do |id|
        DatabaseTranslation.create record_id: id,
                                   translation_table_name: dbtf.translation_table_name,
                                   translation_field_name: dbtf.translation_field_name
        new_items += 1
      end
      ids_to_destroy = (old_ids - new_ids)
      old_items = ids_to_destroy.length
      DatabaseTranslation.where(record_id: ids_to_destroy).where(translation_table_name: dbtf.translation_table_name).where(translation_field_name: dbtf.translation_field_name).destroy_all

      if new_items.positive?
        @log << ("#{new_items} #{dbtf.translation_table_name} / #{dbtf.translation_field_name} #{trn_get('LABEL_CREATED')}.")
      end
      if old_items.positive?
        @log << ("#{old_items} #{dbtf.translation_table_name} / #{dbtf.translation_field_name} #{trn_get('LABEL_DELETED')}.")
      end
    end
    list
    render action: 'list'
  end

  def edit
    @dbt = DatabaseTranslation.find(params[:id])
  end

  def update
    @dbt = DatabaseTranslation.find(params[:id])
    if @dbt.update_attributes(params[:dbt])
      flash[:notice] = "#{trn_geth('LABEL_TRANSLATION')} #{trn_get('MSG_SUCCESSFULLY_MODIFIED_F')}"
      redirect_to action: 'list'

    else
      render action: 'edit'
    end
  end
end
