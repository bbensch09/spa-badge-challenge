class PersonsController < ApplicationController
  def index
      @persons = Person.all
      render json: @persons
  end

  def show
    person = Person.find(params[:id])
    @badges = person.badges
    @badges = @badges.sort {|a, b| b.vote_total <=> a.vote_total  }
    render json: @badges
  end
end

