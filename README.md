nanoGALLERY - jQuery plugin 
===========

Really easy to implement and powerful jQuery plugin to display image galleries. Mobile-friendly and responsive. Support custom themes. Display albums and images stored in Flickr or Google+/Picasa.

Demonstration
-------------

[Go to the demonstration site](http://www.brisbois.fr/cms/nanogallery/)

Usage
-----

### Step 1: include JS and CSS files

``` HTML

<script type="text/javascript" src="third.party/jquery-1.8.2.min.js"></script> 

<link href="third.party/fancybox/jquery.fancybox.css?v=2.1.4" rel="stylesheet" type="text/css">
<script type="text/javascript" src="third.party/fancybox/jquery.fancybox.pack.js?v=2.1.4"></script> 
<link href="third.party/fancybox/helpers/jquery.fancybox-buttons.css?v=1.0.5" rel="stylesheet" type="text/css">
<script type="text/javascript" src="third.party/fancybox/helpers/jquery.fancybox-buttons.js?v=1.0.5"></script> 
<script type="text/javascript" src="third.party/fancybox/helpers/jquery.fancybox-media.js?v=1.0.5"></script> 

<link href="css/nanogallery.css" rel="stylesheet" type="text/css">
<script type="text/javascript" src="jquery.nanogallery.js"></script> 
```

note: If you already use jQuery on your site, do not include it a second time.


### Step 2: create a container
Put a DIV element in you page at the place where you want the gallery to be displayed.
```html
<div id="nanoGallery"></div>
```

### Step 3: create a gallery
Method 1: use a Flickr account

```js
$(document).ready(function () {
	jQuery("#nanoGallery").nanoGallery({
		userID:'34858669@N00',
		kind:'flickr'
	});
});
```

Method 2: use a Picasa/Google+ account
```js
$(document).ready(function () {
  jQuery("#nanoGallery").nanoGallery({
  	userID:'cbrisbois@gmail.com',
  	kind:'picasa'
  });
});
```

Syntax and options
------------------

* userID : user ID of the Picasa/Google+ or Flickr account (mandatory)
* kind : picasa / flickr - set the storage type (optional, default is picasa)
* displayCaption : true / false - display or not the title of the images (optional)
* album : Picasa/Google+ album ID - display only the content of the specific album
* photoset : Flickr album ID - display only the content of the specific album
* thumbnailHeight : integer - Height in pixels of the thumbnails (optional)
* thumbnailWidth : integer - Width in pixels of the thumbnails (optional)
* blackList : list of keywords to ignore - album containing one the keyword in the title will be ignored. Keywords separator is '|'. (optional)
* displayBreadcrumb : true / false - display or not the navigation breadcrumb

Example:

```js
$(document).ready(function () {
  jQuery("#nanoGallery").nanoGallery({
  	userID:'cbrisbois@gmail.com',
  	kind:'picasa',
  	thumbnailWidth:150,
  	thumbnailHeight:150,
  	blackList:'scrapbook|profil'
  });
});
```
