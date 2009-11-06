class AddFindsMissingIndexes < ActiveRecord::Migration
  def self.up
    
    # These indexes were found by searching for AR::Base finds on your application
    # It is strongly recommanded that you will consult a professional DBA about your infrastucture and implemntation before
    # changing your database in that matter.
    # There is a possibility that some of the indexes offered below is not required and can be removed and not added, if you require
    # further assistance with your rails application, database infrastructure or any other problem, visit:
    #
    # http://www.railsmentors.org
    # http://www.railstutor.org
    # http://guides.rubyonrails.org
    
    add_index :quotations, :id
    add_index :dimensions, :id
    add_index :database_translation_fields, :id
    add_index :series, :id
    add_index :quotation_lines, :id
    add_index :customers, :id
    add_index :translations, :id
    add_index :translations, :translation_key
    add_index :product_colors, :id
    add_index :database_translations, :id
    add_index :companies, :id
    add_index :openings, :id
    add_index :preview_images, :id
    add_index :options_quotations, :id
    add_index :option_categories, :id
    add_index :users, :id
    add_index :users, :password_reset_code
    add_index :shapes, :id
    add_index :roles, :id
    add_index :options, :id
  end
  
  def self.down
    remove_index :quotations, :id
    remove_index :dimensions, :id
    remove_index :database_translation_fields, :id
    remove_index :series, :id
    remove_index :quotation_lines, :id
    remove_index :customers, :id
    remove_index :translations, :id
    remove_index :translations, :translation_key
    remove_index :product_colors, :id
    remove_index :database_translations, :id
    remove_index :companies, :id
    remove_index :openings, :id
    remove_index :preview_images, :id
    remove_index :options_quotations, :id
    remove_index :option_categories, :id
    remove_index :users, :id
    remove_index :users, :password_reset_code
    remove_index :shapes, :id
    remove_index :roles, :id
    remove_index :options, :id
  end
end
