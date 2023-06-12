(() => {
  // app/javascript/autocomplete-rails.js
  (function(jQuery2) {
    var self = null;
    jQuery2.fn.railsAutocomplete = function() {
      return this.live("focus", function() {
        if (!this.railsAutoCompleter) {
          this.railsAutoCompleter = new jQuery2.railsAutocomplete(this);
        }
      });
    };
    jQuery2.railsAutocomplete = function(e) {
      _e = e;
      this.init(_e);
    };
    jQuery2.railsAutocomplete.fn = jQuery2.railsAutocomplete.prototype = {
      railsAutocomplete: "0.0.1"
    };
    jQuery2.railsAutocomplete.fn.extend = jQuery2.railsAutocomplete.extend = jQuery2.extend;
    jQuery2.railsAutocomplete.fn.extend({
      init: function(e) {
        e.delimiter = jQuery2(e).attr("data-delimiter") || null;
        function split(val) {
          return val.split(e.delimiter);
        }
        function extractLast(term) {
          return split(term).pop().replace(/^\s+/, "");
        }
        jQuery2(e).autocomplete({
          source: function(request, response) {
            jQuery2.getJSON(jQuery2(e).attr("data-autocomplete"), {
              term: extractLast(request.term)
            }, function() {
              if (arguments[0].length == 0) {
                arguments[0] = [];
                arguments[0][0] = { id: "", label: "no existing match" };
              }
              jQuery2(arguments[0]).each(function(i, el) {
                var obj = {};
                obj[el.id] = el;
                jQuery2(e).data(obj);
              });
              response.apply(null, arguments);
            });
          },
          change: function(event, ui) {
            if (jQuery2(jQuery2(this).attr("data-id-element")).val() == "") {
              return;
            }
            jQuery2(jQuery2(this).attr("data-id-element")).val(ui.item ? ui.item.id : "");
            var update_elements = jQuery2.parseJSON(jQuery2(this).attr("data-update-elements"));
            var data = ui.item ? jQuery2(this).data(ui.item.id.toString()) : {};
            if (update_elements && jQuery2(update_elements["id"]).val() == "") {
              return;
            }
            for (var key in update_elements) {
              jQuery2(update_elements[key]).val(ui.item ? data[key] : "");
            }
          },
          search: function() {
            var term = extractLast(this.value);
            if (term.length < 2) {
              return false;
            }
          },
          focus: function() {
            return false;
          },
          select: function(event, ui) {
            var terms = split(this.value);
            terms.pop();
            terms.push(ui.item.value);
            if (e.delimiter != null) {
              terms.push("");
              this.value = terms.join(e.delimiter);
            } else {
              this.value = terms.join("");
              if (jQuery2(this).attr("data-id-element")) {
                jQuery2(jQuery2(this).attr("data-id-element")).val(ui.item.id);
              }
              if (jQuery2(this).attr("data-update-elements")) {
                var data = jQuery2(this).data(ui.item.id.toString());
                var update_elements = jQuery2.parseJSON(jQuery2(this).attr("data-update-elements"));
                for (var key in update_elements) {
                  jQuery2(update_elements[key]).val(data[key]);
                }
              }
            }
            var remember_string = this.value;
            jQuery2(this).bind("keyup.clearId", function() {
              if (jQuery2(this).val().trim() != remember_string.trim()) {
                jQuery2(jQuery2(this).attr("data-id-element")).val("");
                jQuery2(this).unbind("keyup.clearId");
              }
            });
            jQuery2(e).trigger("railsAutocomplete.select", ui);
            return false;
          }
        });
      }
    });
    jQuery2(document).ready(function() {
      jQuery2("input[data-autocomplete]").railsAutocomplete();
    });
  })(jQuery);
})();
