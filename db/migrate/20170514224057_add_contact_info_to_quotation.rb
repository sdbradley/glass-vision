#encoding: utf-8
class AddContactInfoToQuotation < ActiveRecord::Migration
  def self.up
    add_column :quotations, :contact, :string, null:true
    add_column :quotations, :cell_phone, :string, null:true

    #    Translation.create(:translation_key =>'', :en =>'', :fr => '', :es =>'')
    Translation.create(:translation_key =>'LABEL_QUOTATION_CONTACT', :en =>'Contact', :fr => 'Contact', :es =>'Contacto')
    Translation.create(:translation_key =>'LABEL_QUOTATION_CELLPHONE', :en =>'Cell Phone', :fr => 'Téléphone cellulaire', :es =>'Teléfono móvil')
    Translation.create(:translation_key =>'PRINT_LABEL_QUOTATION_CONTACT', :en =>'Contact', :fr => 'Contact', :es =>'Contacto')
    Translation.create(:translation_key =>'PRINT_LABEL_QUOTATION_CELLPHONE', :en =>'Cell Phone', :fr => 'Téléphone cellulaire', :es =>'Teléfono móvil')


  end

  def self.down
    remove_column :quotations, :cell_phone
    remove_column :quotations, :contact

    Translation.find_by_translation_key('LABEL_QUOTATION_CONTACT').destroy
    Translation.find_by_translation_key('LABEL_QUOTATION_CELLPHONE').destroy
    Translation.find_by_translation_key('PRINT_LABEL_QUOTATION_CONTACT').destroy
    Translation.find_by_translation_key('PRINT_LABEL_QUOTATION_CELLPHONE').destroy
  end
end
