# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Person.delete_all
Badge.delete_all
Vote.delete_all

people = ["Anne","Derek","Hunter","Jen","Julian","Sarah","Shambhavi","Walker"]


people.each do |name|
  Person.create!(name: name)
end

def unique_badge
  {
    text: Faker::Hacker.say_something_smart,
    person_id: rand(1..8)
  }
end

100.times do
  Badge.create!(unique_badge)
end

def new_vote
  {
    badge_id: rand(1..100),
    value: [-1,1,1,1,1].sample
  }
end

500.times do
  Vote.create!(new_vote)
end

puts "DB seeded!!!!!!!!!!!"
