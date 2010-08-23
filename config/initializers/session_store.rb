# Be sure to restart your server when you modify this file.

# Your secret key for verifying cookie session data integrity.
# If you change this key, all old sessions will become invalid!
# Make sure the secret is at least 30 characters and all random, 
# no regular words or you'll be exposed to dictionary attacks.
ActionController::Base.session = {
  :key         => '_websheet_session',
  :secret      => '5806d6d8c7ba2c5bb5c302d1e6bab0eae8d2c9315190f9c729d62e3153a27bcdd16b8a97d6d9a6262b455ce3ea4a369fbbb43c7e33c90121297911024677cf98'
}

# Use the database for sessions instead of the cookie-based default,
# which shouldn't be used to store highly confidential information
# (create the session table with "rake db:sessions:create")
# ActionController::Base.session_store = :active_record_store
