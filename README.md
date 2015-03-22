# jquery-ajax-markup
jQuery plugin to make an ajax call and use the response using HTML markup only.

##Usage

With this markup the contents of the div will be replaced by the response of the url.
```html
<div data-ajax-url="http://example.com/api/product" data-ajax-type="html"></div>
```

Any time `~property~` is used in the element text or attribute values it is replaced with the appropriate property of the json returned in the ajax call.

In this example `json` is specified as the data type and the `~name~` text will be replaced by the `name` property of the returned json.  This also works on attribute values.
```html
<div data-ajax-url="http://example.com/api/product" data-ajax-type="json">~name~</div>
```

Note that urls are only requested once even if multiple elements use the same one.