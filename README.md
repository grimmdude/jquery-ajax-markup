# jquery-ajax-markup
This is a petite jQuery plugin that allows you to make ajax calls directly from HTML elements without writing any JavaScript.  The idea 
came from the need to load and display data on a page in multiple places after the page was all loaded up.  It's usage is inspired a bit by AngularJS, but obviously much simpler and lighter.

##Usage

To use simply add `data-ajax-url="http://example.com/api"` to any element.  By default the response from the url will be inserted 
into the element as text. 

###HTML data

If the expected response of the ajax call is HTML specify `data-ajax-type="html"`.  With this markup the contents of the div will be filled by the response of the url.
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