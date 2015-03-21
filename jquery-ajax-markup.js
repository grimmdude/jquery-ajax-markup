/**
* jquery-ajax-markup
*
* Copyright (c) 2015 Garrett Grimm (grimmdude.com)
* Dual licensed under the MIT and GPL licenses:
* http://www.opensource.org/licenses/mit-license.php
* http://www.gnu.org/licenses/gpl.html
*
*/

(function ( $ ) {
    $(function() {
        var urls = {}; // url : dataType 
        var $ajaxMarkupElements = $('*[data-ajax-url]');

        // First get a list of all the urls to be called.
        $ajaxMarkupElements.each(function(index, element) {
            var elementData = $(element).data();
            var dataType = elementData.ajaxType || false;

            if (!urls.hasOwnProperty(elementData.ajaxUrl)) {
                urls[elementData.ajaxUrl] = dataType;
            }
        });

        // Now call each url and cache the response
        $.each(urls, function(url, dataType) {
            var data;

            $.ajax(url, {
                    dataType: dataType,
                    success: function(response) {
                        // Now cycle through each element using this url and populate the data
                        $ajaxMarkupElements.each(function(index, element) {
                            var elementData = $(element).data();

                            if (elementData.ajaxUrl == url) {
                                var innerText = $(element).text();

                                if (innerText !== '') {
                                    data = response[innerText];

                                } else {
                                    data = response;
                                }

                                $(element).text(data); 
                            }
                        });
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                        //console.log(textStatus);
                    }
            });
        });
    });
}( jQuery ));