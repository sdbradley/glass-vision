ENV["RAILS_ENV"] = "test"
require File.expand_path(File.dirname(__FILE__) + "/../config/environment")
require 'test_help'

class Test::Unit::TestCase
  # Transactional fixtures accelerate your tests by wrapping each test method
  # in a transaction that's rolled back on completion.  This ensures that the
  # test database remains unchanged so your fixtures don't have to be reloaded
  # between every test method.  Fewer database queries means faster tests.
  #
  # Read Mike Clark's excellent walkthrough at
  #   http://clarkware.com/cgi/blosxom/2005/10/24#Rails10FastTesting
  #
  # Every Active Record database supports transactions except MyISAM tables
  # in MySQL.  Turn off transactional fixtures in this case; however, if you
  # don't care one way or the other, switching from MyISAM to InnoDB tables
  # is recommended.
  self.use_transactional_fixtures = true

  # Instantiated fixtures are slow, but give you @david where otherwise you
  # would need people(:david).  If you don't want to migrate your existing
  # test cases which use the @david style and don't mind the speed hit (each
  # instantiated fixtures translates to a database query per test method),
  # then set this back to true.
  self.use_instantiated_fixtures  = false

  # Add more helper methods to be used by all tests here...

  # Test difference between the return value of method on object for duration of the block
  def assert_difference(objects, method = nil, difference = 1)
    objects = [objects].flatten
    initial_values = objects.inject([]) { |sum,obj| sum << obj.send(method) }
    yield
    if difference.nil?
      objects.each_with_index { |obj,i|
        assert_not_equal initial_values[i], obj.send(method), "#{obj}##{method}"
      }
    else
      objects.each_with_index { |obj,i|
        assert_equal initial_values[i] + difference, obj.send(method), "#{obj}##{method}"
      }
    end
  end

  # Test absence of difference between the return value of method on object for duration of the block
  def assert_no_difference(objects, method = nil, &block)
    assert_difference objects, method, 0, &block
  end
  
end
