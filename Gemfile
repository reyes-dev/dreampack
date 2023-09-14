source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }
ruby '3.1.2'
gem 'active_model_serializers'
gem 'bootsnap', require: false
gem 'cssbundling-rails'
gem 'devise'
gem 'figaro'
gem 'image_processing', '>= 1.2'
gem 'jbuilder'
gem 'jsbundling-rails'
gem 'jsonapi-serializer'
gem 'pg', '~> 1.1'
gem 'puma', '~> 5.0'
gem 'rack-cors'
gem 'rails', '~> 7.0.5'
gem 'redis', '~> 4.0'
gem 'ruby-openai'
gem 'sprockets-rails'
gem 'stimulus-rails'
gem 'turbo-rails'
gem 'tzinfo-data', platforms: %i[mingw mswin x64_mingw jruby]

group :development, :test do
  gem 'cypress-on-rails', '~> 1.0'
  gem 'debug', platforms: %i[mri mingw x64_mingw]
  gem 'factory_bot_rails'
  gem 'vcr', '~> 6.2'
  gem 'webmock'
end

group :test do
  gem 'rspec-rails', '~> 6.0', '>= 6.0.3'
end

group :development do
  gem 'web-console'
end
