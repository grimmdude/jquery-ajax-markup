# jquery-ajax-markup
jQuery plugin to make an ajax call and use the response with HTML markup only. 

##Usage

###HTML data

If the expected response of the ajax call is HTML simply specify `data-ajax-type="html"`.  With this markup the contents of the div will be filled by the response of the url.
```html
<div data-ajax-url="http://example.com/api/product" data-ajax-type="html"></div>
```

###JSON data

If the expected response of the ajax call is JSON then specify `data-ajax-type="json"`.  The properties of the JSON object will be accessible like `~property~`.  In this example the `~name~` and `~sku~` text will be replaced by the `name` and `sku` property of the returned JSON.  This works in attribute values as well as inner text.
```html
<div data-ajax-url="http://example.com/api/product" data-ajax-type="json" class="~sku~ active">
	~name~
</div>
```

Note that urls are only requested once even if multiple elements use the same one.