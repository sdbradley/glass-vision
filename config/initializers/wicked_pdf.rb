WickedPdf.config = {
  :exe_path => '/usr/local/bin/wkhtmltopdf'
}

# override for development
if Rails.env.development?
  WickedPdf.config = { exe_path: ENV["WKHTMLTOPDF_BINARY_PATH"] }
end
