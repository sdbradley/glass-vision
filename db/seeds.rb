Role.find_or_create_by!(rolename: "administrator")

glass_vision_co = Company.find_or_create_by!(name: 'Glass Vision')
glass_vision_co.update!(
  address: '123 Glassy Drive',
  phone: '555-555-5555',
  fax: '555-555-5555'
)

# non-admin user
user = User.find_or_initialize_by(login: 'root')
unless user.persisted?
  user.update!(
    email: 'root@example.com',
    password: 'PASSWORD',
    password_confirmation: 'PASSWORD',
    activated_at: Time.current
  )
end

Customer
  .find_or_create_by!(name: 'Win Dow')
  .update!(
    user: user,
    address: '123 Drafty Way',
    phone: '555-555-5555',
    fax: '555-555-5555',
    email: 'win.dow@example.com'
  )

# admin user
admin = User.find_or_initialize_by(login: 'admin')
unless admin.persisted?
  admin.update!(
    email: 'admin@example.com',
    password: 'PASSWORD',
    password_confirmation: 'PASSWORD',
    activated_at: Time.current
  )
end

Customer
  .find_or_create_by!(name: 'Wind Shield')
  .update!(
    user: admin,
    address: '123 Breezy Way',
    phone: '555-555-5555',
    fax: '555-555-5555',
    email: 'wind.shield@example.com'
  )
