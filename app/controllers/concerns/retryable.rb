module Retryable
  extend ActiveSupport::Concern

  # Options:
  # * :tries - Number of retries to perform. Defaults to 1.
  # * :on - The Exception on which a retry will be performed. Defaults to Exception, which retries on any Exception.
  #
  # Example
  # =======
  #   retryable(:tries => 1, :on => OpenURI::HTTPError) do
  #     # your code here
  #   end
  #
  def retryable(tries: 1, on: Exception)
    retry_exception = on
    retries = tries

    begin
      return yield
    rescue retry_exception
      retry if (retries -= 1).positive?
    end

    yield
  end
end
