(function ( $ ) {
    $(function() {
    	$('*[data-ajax-url]').each(function(index, element) {
    		var innerText = $(element).text();
    		var elementData = $(element).data();
    		var dataType = elementData.ajaxType || false;
            
            $.ajax(elementData.ajaxUrl, {
    			dataType: dataType,
    			success: function(response) {
                    if (innerText != '') {
                        $(element).text(response[innerText]);
                    }
                    else {
                        $(element).text(response);
                    }    				
    			},
    			error: function(jqXHR, textStatus, errorThrown) {
    				//console.log(textStatus);
    			}
    		});
    	});
    });
}( jQuery ));