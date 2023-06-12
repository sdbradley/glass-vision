(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // app/javascript/quotations.js
  var require_quotations = __commonJS({
    "app/javascript/quotations.js"(exports, module) {
      $("#quotation-search-form").bind("ajax:beforeSend", function(evt2, xhr2, settings) {
        jQuery("#loading").toggle();
      }).bind("ajax:success", function(evt, data, status, xhr) {
        eval(xhr.responseText);
      }).bind("ajax:failure", function(evt2, data2, status2, xhr2) {
      });
    }
  });
  require_quotations();
})();
