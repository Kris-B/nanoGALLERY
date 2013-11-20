nanoGALLERY - jQuery plugin 
===========

Image gallery for jQuery.
Powerful and easy to use image gallery with support for pulling in Flickr and Picasa/Google+ photo albums among others. Mobile-friendly and responsive. Smooth in/out transitions.
Breadcrumb for multi-level navigation. Images are shown as clickable thumbnails, which will expand to full view via a modal popup window. Support custom themes.


### Usage can be as easy as: 
```js
	$('#elt').nanoGallery({
		'userID':'cbrisbois@gmail.com',
		'kind':'picasa'
	});
```


Key features
--------
- Display image gallery
- Easy to setup and customizable
- Responsive layout - mobile friendly
- Smooth in/out transition
- Display image captions and descriptions
- Breadcrumb for easy navigation in photo albums
- Ignore undesired albums or photosets (by keyword blacklisting)
- Multiple galleries on one page
- Delivered with multiple themes - Support custom themes
- Supported image sources :
  * list of images
  * Flickr account
  * Picasa/Google+ account


![Screenshot](/doc/nanoGALLERY_screenshot.png?raw=true "Screenshot")
![Screenshot](/doc/nanoGALLERY_screenshot2.png?raw=true "Screenshot2")

  

  
Demonstration and Tutorials
-------------

[Go to the demonstration site](http://www.nanogallery.brisbois.fr/)

Usage (v3.3.0)
-----

### Include JS and CSS files


``` HTML
<!-- Add jQuery library -->
<script type="text/javascript" src="third.party/jquery-1.8.2.min.js"></script> 
<!-- Add jsonp plugin -->
<script type="text/javascript" src="third.party/jquery-jsonp/jquery.jsonp.js"></script>

<!-- Add nanoGALLERY plugin -->
<link href="css/nanogallery.css" rel="stylesheet" type="text/css">
<script type="text/javascript" src="jquery.nanogallery.js"></script>

```

Note 1: If you already use jQuery on your site, do not include it a second time.

Note 2: If you specify a theme, the corresponding css file must also be included.


### Method 1: use a Flickr account

* Create a container

Put a ```<DIV>``` element in the ```<BODY>``` on the place where you want the gallery to be displayed.

```html
<div id="nanoGallery1"></div>
```

* Call the plugin

```js
$(document).ready(function () {
	jQuery("#nanoGallery1").nanoGallery({
		userID:'34858669@N00',
		kind:'flickr'
	});
});
```

### Method 2: use a Picasa/Google+ account

* Create a container

Put a ```<DIV>``` element in the ```<BODY>``` on the place where you want the gallery to be displayed.

```html
<div id="nanoGallery2"></div>
```

* Call the plugin

```js
$(document).ready(function () {
  jQuery("#nanoGallery2").nanoGallery({
  	userID:'cbrisbois@gmail.com',
  	kind:'picasa',
	blackList:'Scrapbook|forhomepage|profil'
  });
});
```

### Method 3: use a list of images using HREF attribute

* Create a container

Put a ```<DIV>``` element in the ```<BODY>``` on the page at the place where you want the gallery to be displayed.
Add ```<A>``` elements to this container. Each element points to one image.

```html
<div id="nanoGallery3">
	<a href="demonstration/img_01.jpg" data-ngthumb="demonstration/img_01t.jpg" data-ngdesc="Description1">Image1</a>
	<a href="demonstration/img_02.jpg" data-ngthumb="demonstration/img_02t.jpg"></a>
</div>
```

* Call the plugin

```js
$(document).ready(function () {
  jQuery("#nanoGallery3").nanoGallery();
});
```

### Method 4: use a list of images passed to the script

* Create a container

Put a ```<DIV>``` element in the ```<BODY>``` on the place where you want the gallery to be displayed.

```html
<div id="nanoGallery4"></div>
```

* Call the plugin

Use the 'items' parameter to pass the list of images to the plugin.

```js
$(document).ready(function () {
	jQuery("#nanoGallery4").nanoGallery({thumbnailWidth:100,thumbnailHeight:100,
		items: [
			{
				src: 'demonstration/img_01.jpg',		// image url
				srct: 'demonstration/img_01t.jpg',		// thumbnail url
				title: 'image 1', 						// thumbnail title
				description : 'image 1 description'		// thumbnail description
			},
			{
				src: 'demonstration/img_02.jpg',
				srct: 'demonstration/img_02t.jpg',
				title: 'image 2' 
			}
		],
		displayCaption:false
	});
});
```



Syntax and options
------------------

### General arguments
* ```displayCaption``` : ```true``` / ```false``` - display or not the title of the thumbnails (optional)
* ```thumbnailHeight``` : integer - Height in pixels of the thumbnails (optional)
* ```thumbnailWidth``` : integer - Width in pixels of the thumbnails (optional)
* ```itemsBaseURL``` : URL prefix for the images defined with method#1 or method#2
* ```theme``` : name of the theme (optional) - the corresponding css-file must also be included in the html file
    Possible values : ```animdark``` ```animlight``` ```classicdark``` ```classiclight``` ```largedark``` ```largelight``` ```light```
* ```maxItemsPerLine``` : integer - max number of thumbnails per line
* ```viewer``` : ```internal``` / ```fancybox``` - display images with the default viewer or with FancyBox (optional)

### Picasa/Google+ specific arguments
* ```userID``` : user ID of the Picasa/Google+ account (mandatory)
* ```kind``` : ```picasa``` - set the storage type (mandatory)
* ```album``` : album ID - to display only the specified album 
* ```displayBreadcrumb``` : ```true``` / ```false``` - display or not the navigation breadcrumb
* ```displayCaptionFolder``` : ```true``` / ```false``` - display or not the title of the folders (optional)
* ```displayCaptionImage``` : ```true``` / ```false``` - display or not the title of the images (optional)
* ```topLabel``` : label to display in the breadcrumb for the top level
* ```blackList``` : list of keywords to ignore - albums containing one of the keywords in the title will be ignored. Keyword separator is '|'. (optional)
* ```whiteList``` : list of keywords to authorize - albums must contain one of the keywords to be displayed. Keyword separator is '|'. (optional)
* ```albumList``` : list of albums to display. Separator is '|'. (optional)


### Flickr specific arguments
* ```userID``` : user ID of the Flickr account (mandatory)
* ```kind``` : ```flickr``` - set the storage type (mandatory)
* ```photoset``` : photoset ID - to display only the specified photoset 
* ```displayBreadcrumb``` : ```true``` / ```false``` - display or not the navigation breadcrumb
* ```displayCaptionFolder``` : ```true``` / ```false``` - display or not the title of the folders (optional)
* ```displayCaptionImage``` : ```true``` / ```false``` - display or not the title of the images (optional)
* ```topLabel``` : label to display in the breadcrumb for the top level
* ```blackList``` : list of keywords to ignore - photosets containing one of the keywords in the title will be ignored. Keyword separator is '|'. (optional)
* ```whiteList``` : list of keywords to authorize - photosets must contain one of the keywords to be displayed. Keyword separator is '|'. (optional)
* ```albumList``` : list of photosets to display. Separator is '|'. (optional)

To retrieve your Flickr user ID, use this page:
```
http://www.flickr.com/services/api/explore/flickr.people.findByUsername
```

### Example:

```js
$(document).ready(function () {
  jQuery("#nanoGallery").nanoGallery({
  	userID:'cbrisbois@gmail.com',
  	kind:'picasa',
  	thumbnailWidth:150,
  	thumbnailHeight:150,
  	blackList:'scrapbook|forhomepage|profil'
  });
});
```


Display images with FancyBox
------

You can use FancyBox to display images instead of the default internal viewer.

For this, include following JS and CSS files


``` HTML
<!-- Add fancyBox plugin -->
<link href="third.party/fancybox/jquery.fancybox.css?v=2.1.4" rel="stylesheet" type="text/css">
<script type="text/javascript" src="third.party/fancybox/jquery.fancybox.pack.js?v=2.1.4"></script> 
<link href="third.party/fancybox/helpers/jquery.fancybox-buttons.css?v=1.0.5" rel="stylesheet" type="text/css">
<script type="text/javascript" src="third.party/fancybox/helpers/jquery.fancybox-buttons.js?v=1.0.5"></script> 
<script type="text/javascript" src="third.party/fancybox/helpers/jquery.fancybox-media.js?v=1.0.5"></script> 
```

And call the plugin with the parameter ```viewer```, like in :

```js
$(document).ready(function () {
  jQuery("#nanoGallery2").nanoGallery({
  	userID:'cbrisbois@gmail.com',
  	kind:'picasa',
	blackList:'Scrapbook|forhomepage|profil',
	viewer:'fancybox'
  });
});
```


Themes
------

CSS layout description:
![CSS layout](/doc/css_map.png?raw=true "CSS Layout")


Requirements
------------
* Javascript must be enabled
* jQuery
* jsonp - jQuery plugin (https://github.com/jaubourg/jquery-jsonp) (credits: Julian Aubourg
* fancybox2 - jQuery plugin (https://github.com/fancyapps/fancyBox) (credits: Janis Skarnelis)

[![githalytics.com alpha](https://cruel-carlota.pagodabox.com/de295d45496c01bb871078aac2bcfcac "githalytics.com")](http://githalytics.com/Kris-B/nanoGALLERY)


