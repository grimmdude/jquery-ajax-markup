(function ( $ ) {
    $(function() {
    	$('*[data-ajax-url]').each(function(index, element) {
    		//console.log($(element).data());
    		$.ajax($(element).data('ajaxUrl'), {
    			cache: false,
    			success: function(data) {
    				$(element).text(data);
    			},
    			error: function(jqXHR, textStatus, errorThrown) {
    				//console.log(textStatus);
    			}
    		});
    	});
    });
}( jQuery ));