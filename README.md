# jquery-ajax-markup
jQuery plugin to make an ajax call and use the response with HTML markup only. 

##Usage

###HTML data

If the expected response of the ajax call is HTML simply specify `data-ajax-type="html"`.  With this markup the contents of the div will be filled by the response of the url.
```html
<div data-ajax-url="http://example.com/api/product" data-ajax-type="html"></div>
```

###JSON data
Any time `~property~` is used in the element text or attribute values it is replaced with the appropriate property of the json returned in the ajax call.

If the expected response of the ajax call is JSON then specify `data-ajax-type="json"`.  The properties of the JSON object will be accessible like `~property~`.  In this example the `~name~` text will be replaced by the `name` property of the returned JSON.  This also works in attribute values.
```html
<div data-ajax-url="http://example.com/api/product" data-ajax-type="json">~name~</div>
```

Note that urls are only requested once even if multiple elements use the same one.