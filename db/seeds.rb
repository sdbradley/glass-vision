# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ :name => 'Chicago' }, { :name => 'Copenhagen' }])
#   Mayor.create(:name => 'Daley', :city => cities.first)

glass_vision_co = Company.find_or_create_by!(name: 'Glass Vision')
glass_vision_co.update!(
  address: '123 Glassy Drive',
  phone: '555-555-5555',
  fax: '555-555-5555'
)

user = User.find_or_initialize_by(login: 'root')
unless user.persisted?
  user.update!(
    email: 'root@example.com',
    password: 'PASSWORD',
    password_confirmation: 'PASSWORD',
    activated_at: Time.current
  )
end

customer = Customer.find_or_create_by!(name: 'Win Dow')
customer.update!(
  user: user,
  address: '123 Drafty Way',
  phone: '555-555-5555',
  fax: '555-555-5555',
  email: 'win.dow@example.com'
)
