class AuditsController < ApplicationController
  # sortable_attributes  :created_at, :user_id, :action, :result, :reason

  def index
    @audits =
      Audit
      .includes(:user)
      .order(:id, :desc)
      .paginate(page: params[:page], per_page: 50)
  end
end
