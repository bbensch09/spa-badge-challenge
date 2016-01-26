# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

people = ["Anne","Derek","Hunter","Jen","Julian","Sarah","Shambhavi","Walker"]


people.each do |name|
  Person.create!(name: name)
end

# badges = []
# 100.times do

puts "DB seeded!!!!!!!!!!!"
