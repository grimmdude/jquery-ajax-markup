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
            $.ajax(url, {
                    dataType: dataType,
                    success: function(response) {
                        // Now cycle through each element using this url and populate the data
                        $ajaxMarkupElements.each(function(index, element) {
                            var elementData = $(element).data();

                            if (elementData.ajaxUrl == url) {
                                var innerText = $(element).text();

                                if (innerText != '') {
                                    var data = response[innerText];

                                } else {
                                    var data = response;
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