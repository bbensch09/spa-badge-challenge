class BadgesController < ApplicationController
  def create
    @badge = Badge.new(text: params[:text], person_id: params[:person_id])
    if @badge.save
      render json: @badge
    else
      render json: @badge.errors
    end
  end
end
