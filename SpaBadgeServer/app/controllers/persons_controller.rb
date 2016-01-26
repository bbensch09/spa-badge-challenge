class PersonsController < ApplicationController
  def index
    @persons = Person.all
    render json: @persons
  end

  def show
    @person = Person.find(:id)
    render json: @person
  end
end
