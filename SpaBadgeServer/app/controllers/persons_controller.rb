class PersonsController < ApplicationController
  def index
      @persons = Person.all
      render json: @persons
  end

  def show
    person = Person.find(params[:id])
    @badges = person.badges
    p @badges
    render json: @badges
  end
end

