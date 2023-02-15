class Quotation < ActiveRecord::Base
  has_many :quotation_lines, :dependent => :destroy
  has_many :door_lines, :dependent => :destroy
  has_many :options_quotations, :dependent => :destroy
  has_many :manual_lines, :dependent => :destroy
  belongs_to :user
  belongs_to :company


  validates_presence_of :project_name
  validates_numericality_of :markup, :allow_nil => true, :greater_than_or_equal_to => 0, :less_than_or_equal_to => 60
  validates_numericality_of :deposit, :allow_nil => true, :greater_than_or_equal_to => 0

  after_initialize :set_tax_rates

  def set_tax_rates
    if new_record? && !changed?
      self.taxes ||= 5.0
      self.taxes_pst ||= 9.5
    end
  end

  def use_billing_address?
    if (customer_address.nil? || delivery_address.nil?)
     return false
    end

   return customer_address == delivery_address
  end

  def calculate_taxes(total)
   total * self.taxes / 100.0
  end

  def calculate_pst(total)
    if !self.taxes_pst.blank?
      total * self.taxes_pst / 100.0
    else
     0.0
    end
  end

  # given a source quotation, copy to new with derivative slug
  def self.copy(orig_quotation)
    quotation = orig_quotation.deep_clone include: [:manual_lines, :options_quotations, 
      {:quotation_lines => [:quotation_lines_openings, :options_quotation_lines, :section_heights, :section_widths] }, 
      {:door_lines => [:door_line_sections, :door_line_options]}
    ]
    quotation.slug = quotation.generate_new_slug(orig_quotation.slug)
    quotation.created_at = nil # ensure the new quotation has the current date.
    quotation.save!
    quotation
  end

  def regenerate_previews(base_url)
    quotation_lines.each do |line|
      line.create_image
    end
    door_lines.each do |line|
      line.create_image(base_url)
    end
  end

  def generate_new_slug(slug)
    last = 1

    base_slug = Quotation.get_base_slug(slug)
    existing_slugs = Quotation.connection.select_all("select slug from quotations where slug like '#{base_slug}%'")
    existing_slugs = existing_slugs.collect {|s| s["slug"]}
    last = existing_slugs.collect{|s| s[((s.rindex('-')||-1)+1)..-1].to_i}.max() + 1  unless existing_slugs.empty?

    return base_slug + last.to_s
  end

  def has_manual_lines?
    manual_lines.length > 0
  end

  def has_options?
    options_quotations.length > 0
  end

  private
  def self.get_base_slug(slug)
    # we have to handle the following cases:
    # 1) quotation that's never been copied and slug is original id (eg 900), no dashes at all
    # 2) quotation with new format slug (eg 13-0101), never copied
    # 3) quotation with id + copy (eg 900-2)
    # 4) quotation with new format slug that's been copied (13-01010-1)

    # cases 2 and 4 can be handled the same way, as we just want the root slug.
    base_slug = slug.slice(/\d+-\d{4}-/) # case #4
    base_slug ||= slug.slice(/\d+-/) unless slug.match(/^\d+(-\d{4})*$/) # case 3
    base_slug ||= slug + '-'
  end
end
