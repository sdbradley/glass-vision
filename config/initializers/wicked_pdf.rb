WickedPdf.config = {
  :exe_path => '/usr/local/bin/wkhtmltopdf'
}

# override for development
if Rails.env.development?
  WickedPdf.config = {
      :exe_path => '/Users/Jeff/snowmoon/glass-vision.net/vendor/bundle/gems/wkhtmltopdf-binary-0.9.9.3/bin/wkhtmltopdf'
  }
end
