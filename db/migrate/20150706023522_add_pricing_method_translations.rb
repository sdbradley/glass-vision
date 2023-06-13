class AddPricingMethodTranslations < ActiveRecord::Migration[7.0]
#   def self.up
#     Translation.create(:translation_key =>'MSG_ERROR', :en =>'error', :fr => 'erreur', :es =>'error')
#     Translation.create(:translation_key =>'MSG_ERROR_TEXT', :en =>'prohibited this pricing method from being saved:', :fr => 'interdit cette méthode être enregistré :', :es =>'prohíbe este método se guardara los precios:')
#     Translation.create(:translation_key =>'EDIT_PRICING_METHOD', :en =>'Edit Pricing Method', :fr => 'Modifier la méthode de tarification', :es =>'Editar método de precios')
#     Translation.create(:translation_key =>'PRICING_METHODS', :en =>'Pricing Methods', :fr => 'Méthodes de tarification', :es =>'Métodos de fijación de precios')
#     Translation.create(:translation_key =>'PRICING_METHOD_UPDATED', :en =>'Pricing method was successfully updated.', :fr => 'Méthode de tarification a été mis à jour.', :es =>'Método de fijación de precios se actualizó correctamente.')
# #    Translation.create(:translation_key =>'', :en =>'', :fr => '', :es =>'')
#   end

#   def self.down
#     Translation.find_by_translation_key('MSG_ERROR').destroy
#     Translation.find_by_translation_key('MSG_ERROR_TEXT').destroy
#     Translation.find_by_translation_key('EDIT_PRICING_METHOD').destroy
#     Translation.find_by_translation_key('PRICING_METHODS').destroy
#     Translation.find_by_translation_key('PRICING_METHOD_UPDATED').destroy
#   end
end
