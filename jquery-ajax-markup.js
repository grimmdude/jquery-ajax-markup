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
    $(function () {
        var urls = {}; // url : dataType 
        var regEx = /~([\s\S]*?)~/g;
        var $ajaxMarkupElements = $('*[data-ajax-url]');

        // First get a list of all the urls to be called.
        $ajaxMarkupElements.each(function (index, element) {
            var elementData = $(element).data();
            var dataType = elementData.ajaxType || false;

            if (!urls.hasOwnProperty(elementData.ajaxUrl)) {
                urls[elementData.ajaxUrl] = dataType;
            }
        });

        // Now call each url and handle the data replacement
        $.each(urls, function (url, dataType) {
            var data;

            $.ajax(url, {
                    dataType: dataType,
                    success: function (response) {
                        // Now cycle through each element using this url and populate the data
                        $ajaxMarkupElements.each(function (index, element) {
                            var $this = $(this);
                            var elementData = $(element).data();

                            if (elementData.ajaxUrl === url) {
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

                                if (dataType.toLowerCase() === 'html') {
                                    $(element).html(data).show(); 

                                } else {
                                   $(element).text(data).show();
                                }
                            }
                        });
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        //console.log(textStatus);
                    }
            });
        });
    });
}(jQuery));