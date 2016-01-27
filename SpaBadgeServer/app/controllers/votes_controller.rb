class VotesController < ApplicationController
  def create
    p "=====PARAMETERS====="
    p params
    if params[:vote_type] == "up"
      vote_value = 1
    else
      vote_value = -1
    end
    @vote = Vote.new(value: vote_value, badge_id: params[:badge_id])
    if @vote.save
      @badge = Badge.find(params[:badge_id])
      render json: @badge
    else
      render json: @vote.errors
    end
  end
end
