class DatabaseTranslationController < ApplicationController
  def list
    @dbtfs = DatabaseTranslationField.find(:all, :order => "`table`, `field`")
    if params[:dbtf] ||= session[:dbtf]
      session[:dbtf] = (params[:dbtf] ||= session[:dbtf])
      @dbtf = DatabaseTranslationField.find(params[:dbtf] ||= session[:dbtf])
      @dbts = DatabaseTranslation.find(:all, :conditions => "`table` = '#{@dbtf.table}' AND `field` = '#{@dbtf.field}'")
    end
  end

  def generate
    @log = []
    DatabaseTranslationField.find(:all).each { |dbtf|
      new_items = 0
      old_items = 0
      new_ids = dbtf.table.singularize.camelize.constantize.find(:all).collect{ |r| r.id}
      old_ids = DatabaseTranslation.find(:all, :conditions => "`table` = '#{dbtf.table}' AND `field` = '#{dbtf.field}'").collect{ |r| r.record_id}
      (new_ids - old_ids).each { |id|
        DatabaseTranslation.create :record_id => id,
                                   :table => dbtf.table,
                                   :field => dbtf.field
        new_items += 1
      }
      (old_ids - new_ids).each { |id|
        DatabaseTranslation.find(:first, :conditions => "record_id = #{id} AND `table` = '#{dbtf.table}' AND `field` = '#{dbtf.field}'").destroy
        old_items += 1
      }
      @log << new_items.to_s + " " + dbtf.table + " / " + dbtf.field + " " + trn_get('LABEL_CREATED') + "." if new_items > 0
      @log << old_items.to_s + " " + dbtf.table + " / " + dbtf.field + " " + trn_get('LABEL_DELETED') + "." if old_items > 0
    }
    list
    render :action => 'list'
  end

  def edit
    @dbt = DatabaseTranslation.find(params[:id])
  end

  def update
    @dbt = DatabaseTranslation.find(params[:id])
    if @dbt.update_attributes(params[:dbt])
      flash[:notice] = trn_geth('LABEL_TRANSLATION') + " " + trn_get('MSG_SUCCESSFULLY_MODIFIED_F')
      redirect_to :action => 'list'

    else
      render :action => 'edit'
    end
  end
end
