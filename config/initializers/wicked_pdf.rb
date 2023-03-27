WickedPdf.config = if Rails.env.development?
                     { exe_path: ENV.fetch('WKHTMLTOPDF_BINARY_PATH', nil) }
                   else
                     { exe_path: '/usr/local/bin/wkhtmltopdf' }
                   end
