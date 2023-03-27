# == Schema Information
#
# Table name: option_categories
#
#  id            :integer          not null, primary key
#  name          :string(255)
#  description   :string(255)
#  display_order :integer
#  multiselect   :boolean
#

class OptionCategory < ApplicationRecord
  translates :name, :description
  accepts_nested_attributes_for :translations

  validates :name, presence: true
  validates :name, uniqueness: true
  validates :display_order, presence: true
  validates :display_order, numericality: true

  has_and_belongs_to_many :options, class_name: 'Option'
  #  has_many :options, :through => "option_categories_options"
  #  has_many :options, :class_name => "Option", :foreign_key => "option_id", :through => "option_categories_options"
  #  belongs_to :options, :class_name => "Option"

  # returns true
  def has_options?
    options.exists?
  end
end
