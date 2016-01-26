class VotesController < ApplicationController
  def create
    @vote = Vote.new(value: params[:value], badge_id: params[:badge_id])
    if @vote.save
      render json: @vote
    else
      render json: @vote.errors
    end
  end
end
