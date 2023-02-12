console.log('quotations.js')
$('#quotation-search-form').bind('ajax:beforeSend', function(evt, xhr, settings){
    jQuery("#loading").toggle();
})
.bind('ajax:success', function(evt, data, status, xhr){
    eval(xhr.responseText);
 })
.bind('ajax:failure', function(evt, data, status, xhr){
});