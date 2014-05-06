/**
 * WkHtmlToPdf table splitting hack.
 *
 * Script to automatically split multiple-pages-spanning HTML tables for PDF
 * generation using webkit.
 *
 * To use, you must adjust pdfPage object's contents to reflect your PDF's
 * page format.
 * The tables you want to be automatically splitted when the page ends must
 * have a class name of "splitForPrint" (can be changed).
 * Also, it might be a good idea to update the splitThreshold value if you have
 * large table rows.
 *
 * Dependencies: jQuery.
 *
 * WARNING: WorksForMe(tm)!
 * If it doesn't work, first check for javascript errors using a webkit browser.
 *
 * @author Jason Playne <jason@jasonplayne.com>
 * @version 1.1
 *
 * @author Florin Stancu <niflostancu@gmail.com>
 * @version 1.0
 *
 * @license http://www.opensource.org/licenses/mit-license.php MIT License
 */


/**
 * PDF page settings.
 * Must have the correct values for the script to work.
 * All numbers must be in inches (as floats)!
 * Use google to convert margins from mm to in ;)
 *
 * @type {Object}
 */
var pdfPage = {
    width: 8.25, // inches
    height: 11.0, // inches
    margins: {
        top: 0.393701, left: 0.393701,
        right: 0.393701, bottom: 0.393701
    }
};

/**
 * The distance to bottom of which if the element is closer, it should moved on
 * the next page. Should be at least the element (TR)'s height.
 *
 * @type {Number}
 */
var splitThreshold = 0;

/**
 * Class name of the tables to automatically split.
 * Should not contain any CSS definitions because it is automatically removed
 * after the split.
 *
 * @type {String}
 */
var splitClassName = 'splitForPrint';

/**
 * Window load event handler.
 * We use this instead of DOM ready because webkit doesn't load the images yet.
 */
$(window).load(function () {
    // get document resolution
    var dpi = $('<div id="dpi"></div>')
        .css({
            height: '1in', width: '1in',
            top: '-100%', left: '-100%',
            position: 'absolute'
        })
        .appendTo('body')
        .height();

    // page height in pixels
    var pageHeight = Math.ceil(
        (pdfPage.height - pdfPage.margins.top - pdfPage.margins.bottom) * dpi);

//console.log("splitForPrint active: pageHeight is " + pageHeight);
    // temporary set body's width and padding to match pdf's size
    var $body = $('body');
    $body.css('width', (pdfPage.width - pdfPage.margins.left - pdfPage.margins.right) + 'in');
    $body.css('padding-left', pdfPage.margins.left + 'in');
    $body.css('padding-right', pdfPage.margins.right + 'in');

    //////
    $('table.' + splitClassName).each(function () {
        var $origin_table = $(this);
        var x_pos = $origin_table.position().top;
//console.log("splitForPrint running: x_pos " + x_pos);

        var $template = $origin_table.clone()
        var $orig_table = $origin_table.clone();

        $template.find('> tbody > tr').remove();
        $template.find('> tfoot > tr').remove();

        var current_table = 0
        var split_tables = Array()
        split_tables.push($origin_table)


        // see how many rows we can fit into the original table
        // before we need to do a page break
        //   first, clear all rows from the table still in the dom
        $origin_table.find('> tbody > tr').remove();
        $origin_table.find('> tfoot > tr').remove();
        insertPageBreak($origin_table);
        //   next, start adding rows until the table doesn't fit

        $orig_table.find('> tbody > tr').each(function () {
            var $tr = $(this);

            // move row to new table
            $tr.detach().appendTo(split_tables[current_table].find('> tbody'));

//console.log("current table height " + $(split_tables[current_table]).height() + ", usable page: " + ((pageHeight - splitThreshold)));
            if ($(split_tables[current_table]).height() + x_pos > (pageHeight - splitThreshold)) {
//console.log("splitting table at "  + ($(split_tables[current_table]).height() + x_pos));

                current_table++
                split_tables.push($template.clone())
                insertIntoDom($origin_table, split_tables[current_table])
                // move row to new table
                $tr.detach().appendTo(split_tables[current_table].find('> tbody'));
                x_pos = 0;
            }

        });

        //table footer
        var $tfoot = $orig_table.find('> tfoot')

        var last_table_height = $(split_tables[current_table]).height();// + $(split_tables[current_table]).position().top;
        if (last_table_height + $tfoot.height() > (pageHeight - splitThreshold)) {
            current_table++
            split_tables.push($template.clone())
            insertIntoDom($origin_table, split_tables[current_table])
            alert('made new table for footer')
        }
        $tfoot.detach().appendTo($(split_tables[current_table]))
//        $origin_table.remove()

        $('div.page-breaker').last().remove()
    });

    function insertIntoDom(after, what) {
        var $br = $('<div class="page-breaker" style="height: 10px;"></div>').css('page-break-before', 'always');
        $(what).appendTo($(after).parent());
        $br.insertAfter(what);
    }

    function insertPageBreak(after) {
        var $br = $('<div class="page-breaker" style="height: 10px;"></div>').css('page-break-before', 'always');
        $br.insertAfter(after);
    }


    // restore body's padding
    $body.css('padding-left', 0);
    $body.css('padding-right', 0);

});