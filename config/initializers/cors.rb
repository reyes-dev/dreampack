# config/initializers/cors.rb
Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins 'https://dreampack.app/' # later change to the domain of the frontend app
    resource '*',
             headers: :any,
             methods: %i[get patch put delete post options show],
             expose: [:Authorization]
  end
end
