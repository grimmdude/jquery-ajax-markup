/**
* jquery-ajax-markup
*
* Copyright (c) 2015 Garrett Grimm (grimmdude.com)
* Dual licensed under the MIT and GPL licenses:
* http://www.opensource.org/licenses/mit-license.php
* http://www.gnu.org/licenses/gpl.html
*
*/

(function ($) {
    var Url = function(params) {
        this.url = params.url || '';
        this.dataType = params.dataType || '';
        this.data;
    };

    /**
     * Wrapper for $.ajaxMarkup({collection : $('#selector')})
     * @return jQuery object
     */
    $.fn.ajaxMarkup = function() {
        $.ajaxMarkup({collection : this});
        return this;
    };

    $.ajaxMarkup = function(options) {
        options = $.extend({
            reload          : false, // If urls should be reloaded
            container       : null,  // jQuery selector string
            collection      : null   // jQuery object.  If passed this overrides container.  Mainly used as $('#selector').ajaxMarkup()
        }, options);

        var urls = []; // Array of Url objects

        var regEx = /~([\s\S]*?)~/g;
        var $ajaxMarkupElements;
        
        if (options.collection) {
            $ajaxMarkupElements = options.collection.filter(function() {
                var urlAttr = $(this).attr('data-ajax-url');
                if (typeof urlAttr !== typeof undefined && urlAttr !== false) {
                    return true;
                }
            });

        } else if (options.container) {
            $ajaxMarkupElements = $(options.container).find('*[data-ajax-url]');

        } else {
            $ajaxMarkupElements = $('*[data-ajax-url]');
        }

        // First get a list of all the urls to be called.
        $ajaxMarkupElements.each(function (index, element) {
            var elementData = $(element).data();
            var dataType = elementData.ajaxType || '';

            if ((!elementData.hasOwnProperty('ajaxLoaded') || options.reload) && !urls.hasOwnProperty(elementData.ajaxUrl)) {
                urls.push(new Url({url: elementData.ajaxUrl, dataType: dataType}));
            }
        });

        // Now call each url and handle the data replacement
        $.each(urls, function (index, url) {
            var data;

            $.ajax(url.url, {
                    dataType: url.dataType,
                    success: function (response) {
                        url.data = response;
                        // Now cycle through each element using this url and populate the data
                        $ajaxMarkupElements.each(function (index, element) {
                            var $this = $(this);
                            var elementData = $(element).data();

                            if (elementData.ajaxUrl === url.url) {
                                var innerText = $(element).text();

                                // Go through each attribute and execute any variables
                                $.each(this.attributes, function (index, attribute) {
                                    $this.attr(attribute.name, attribute.value.replace(regEx, function (x) {
                                                return eval(('response.' + x).replace(/~/g, ''));
                                            })
                                    );
                                });

                                // Now do the same for inner text
                                if (innerText !== '') {
                                    data = innerText.replace(regEx, function (x) {
                                        return eval(('response.' + x).replace(/~/g, ''));
                                    });

                                } else {
                                    data = response;
                                }

                                if (url.dataType.toLowerCase() === 'html') {
                                    $(element).html(data).show(); 

                                } else {
                                   $(element).text(data).show();
                                }

                                $this.data('ajaxLoaded', true);
                            }
                        });
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        //console.log(textStatus);
                    }
            });
        });

        // Store data to use later if needed.
        $('html').data('ajaxMarkupData', urls);

        return $ajaxMarkupElements;
    };

    $(function () {
        $.ajaxMarkup();
    });
}(jQuery));