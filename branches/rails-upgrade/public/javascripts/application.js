// Place your application-specific JavaScript functions and classes here
// This file is automatically included by javascript_include_tag :defaults
/*
decimal_sep: character used as decimal separator, it defaults to '.' when omitted
thousands_sep: char used as thousands separator, it defaults to ',' when omitted
*/
Number.prototype.toMoney = function(decimals, decimal_sep, thousands_sep)
{
   var n = this,
   c = isNaN(decimals) ? 2 : Math.abs(decimals), //if decimal is zero we must take it, it means user does not want to show any decimal
   d = decimal_sep || '.', //if no decimal separator is passed we use the dot as default decimal separator (we MUST use a decimal separator)

   /*
   according to [http://stackoverflow.com/questions/411352/how-best-to-determine-if-an-argument-is-not-sent-to-the-javascript-function]
   the fastest way to check for not defined parameter is to use typeof value === 'undefined'
   rather than doing value === undefined.
   */
   t = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep, //if you don't want to use a thousands separator you can pass empty string as thousands_sep value

   sign = (n < 0) ? '-' : '',

   //extracting the absolute value of the integer part of the number and converting to string
   i = parseInt(n = Math.abs(n).toFixed(c)) + '',

   j = ((j = i.length) > 3) ? j % 3 : 0;
   return sign + (j ? i.substr(0, j) + t : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : '');
}


$(document).ajaxStart(function(){
    $("#loading_dialog").loading();
}).ajaxStop(function(){
    $("#loading_dialog").loading("loadStop");
});

(function($) {
    $.widget("artistan.loading", $.ui.dialog, {
        options: {
            // your options
            spinnerClassSuffix: 'spinner',
            spinnerHtml: 'Loading',// allow for spans with callback for timeout...
            maxHeight: false,
            maxWidth: false,
            minHeight: 80,
            minWidth: 220,
            height: 80,
            width: 220,
            modal: true
        },

        _create: function() {
            $.ui.dialog.prototype._create.apply(this);
            // constructor
            $(this.uiDialog).children('*').hide();
            var self = this,
            options = self.options;
            self.uiDialogSpinner = $('.ui-dialog-content',self.uiDialog)
                .html(options.spinnerHtml)
                .addClass('ui-dialog-'+options.spinnerClassSuffix);
        },
        _setOption: function(key, value) {
            var original = value;
            $.ui.dialog.prototype._setOption.apply(this, arguments);
            // process the setting of options
            var self = this;

            switch (key) {
                case "innerHeight":
                    // remove old class and add the new one.
                    self.uiDialogSpinner.height(value);
                    break;
                case "spinnerClassSuffix":
                    // remove old class and add the new one.
                    self.uiDialogSpinner.removeClass('ui-dialog-'+original).addClass('ui-dialog-'+value);
                    break;
                case "spinnerHtml":
                    // convert whatever was passed in to a string, for html() to not throw up
                    self.uiDialogSpinner.html("" + (value || '&#160;'));
                    break;
            }
        },
        _size: function() {
            $.ui.dialog.prototype._size.apply(this, arguments);
        },
        // other methods
        loadStart: function(newHtml){
            if(typeof(newHtml)!='undefined'){
                this._setOption('spinnerHtml',newHtml);
            }
            this.open();
        },
        loadStop: function(){
            this._setOption('spinnerHtml',this.options.spinnerHtml);
            this.close();
        }
    });
})(jQuery);