require 'vcr'

VCR.configure do |c|
  c.cassette_library_dir = 'vcr_cassettes'
  c.hook_into :webmock
  c.configure_rspec_metadata!
  c.default_cassette_options = {
    serialize_with: :json
  }
  c.filter_sensitive_data('<AUTH>') { |interaction| interaction.request.headers['Authorization'][0].sub('Bearer ', '') }
  c.preserve_exact_body_bytes do |http_message|
    http_message.body.encoding.name == 'ASCII-8BIT' ||
      !http_message.body.valid_encoding?
  end
end
