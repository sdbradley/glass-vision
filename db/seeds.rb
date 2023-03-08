# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ :name => 'Chicago' }, { :name => 'Copenhagen' }])
#   Mayor.create(:name => 'Daley', :city => cities.first)

glass_vision_co = Company.find_or_create_by!(name: "Glass-Vision")

customer = User.find_or_initialize_by(login: "root")
unless customer.persisted?
  customer.update!(
    email: "root@example.com",
    password: "PASSWORD",
    password_confirmation: "PASSWORD",
    activated_at: Time.current
  )
end
