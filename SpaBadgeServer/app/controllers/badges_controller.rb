class BadgesController < ApplicationController
  def create
    person_id = params[:person_id]
    content = params[:content]
    @badge = Badge.new(text: content, person_id: person_id)
    if @badge.save
      @badges = Person.find(person_id).badges
      render json: @badges
    else
      render json: @badge.errors
    end
  end
end
