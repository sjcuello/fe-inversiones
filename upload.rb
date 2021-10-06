require 'faraday'
require 'json'
require 'base64'

base_dir='./allure-results'
server_host=ENV['REPORT_SERVER_HOST']
server_port=ENV['REPORT_SERVER_PORT']
target_url="http://#{server_host}:#{server_port}/send-results"
puts "Report Server on: #{target_url}"

exit 0 unless ENV['REPORT_SERVER_HOST'] && ENV['REPORT_SERVER_PORT']

Dir.each_child(base_dir) do |filename|
  puts filename
  next if filename.end_with? 'txt'
  data = File.open("#{base_dir}/#{filename}").read
  encoded_data = Base64.encode64(data)
  d = {
    :file_name => filename,
    :content_base64 => encoded_data
  }
  results = [d]
  req = {
    :results => results
  }
  res = Faraday.post(target_url, req.to_json, "Content-Type" => "application/json")
  puts "File posted with result #{res.status}"
end
