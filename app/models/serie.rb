class Serie < ActiveRecord::Base
  include Translatable

  validates_presence_of :name
  validates_uniqueness_of :name

  has_many :widths, :order => "value"
  has_many :heights, :order => "value"
  has_many :quotation_lines, :dependent => :destroy
  has_and_belongs_to_many :options, :order => 'description'
  has_and_belongs_to_many :openings
end