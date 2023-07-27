# Load the Rails application.
require_relative 'application'

# Initialize the Rails application.
Rails.application.initialize!
Rails.application.routes.default_url_options[:host] = 'localhost:3000'
Mime::Type.register 'image/png', :png
