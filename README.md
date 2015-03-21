# jquery-ajax-markup
Simple jQuery plugin to fill a container with ajax results using HTML markup only.

##Usage

With this markup the contents of the div will be replaced by the response of the url.
```html\
<div data-ajax-url="http://example.com/api/product"></div>
```

In this example `json` is specified as the data type and the `name` text will be replaced by the name property of the returned json.
```html
<div data-ajax-url="http://example.com/api/product" data-ajax-type="json">name</div>
```

Note that urls are only requested once even if multiple elements use the same one.
