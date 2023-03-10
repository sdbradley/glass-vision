class AuditsController < ApplicationController
  # sortable_attributes  :created_at, :user_id, :action, :result, :reason

  def index
    @audits = Audit.includes(:user).paginate(page: params[:page], order: sort_order || 'id desc', per_page: 50)
  end

  # def search
  #  params[:action] = "index"
  #
  #  @audits = Audit.includes(:user).paginate(:page => params[:page], :order => sort_order || "id desc", :per_page => 50)
  #
  #  render :partial => 'audit_list'
  # end
end
