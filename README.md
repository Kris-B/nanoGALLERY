nanoGALLERY - jQuery plugin 
===========

###Image gallery simplified.

It is touch enabled, responsive, fast and it supports cloud storage.

Featuring multi-level navigation in albums, lightbox, combinable hover effects on thumbnails, slideshow, fullscreen, pagination, image lazy load, themes, bootstrap compatibility, deep linking, customizable, i18n, and pulling in Flickr/Picasa/Google+ photo albums among others.


### Usage can be as easy as: 
```js
	$('#elt').nanoGallery({
		'kind':'picasa',
		'userID':'YourEmail@gmail.com'
	});
```


New in v4.3
--------
- new image display possibilities giving a larger area to the images (customizable position of navigation buttons and labels)
- set the maximum length of title and description to avoid too long content
- display or hide the icons of the thumbnails label and/or navigation breadcrumb
- breadcrumb: new icon for home folder
- sorting of photos and of albums
- preload also previous image
- added Text-Shadow attribute to color schemes
- refinement of the 'light' theme
- new thumbnail hover effects
- added support of Picasa/Google+ albums that are limited to people who have a link with an authkey

For a full feature list look at the release note.


[View ChangeLog](/changelog.md)


Key features
--------
- Display image galleries
- Display images with titles and descriptions
- Thumbnails with titles and descriptions
- numerous animated thumbnails hover effects (combinations are possible)
- Easy to setup and customizable
- Responsive layout - mobile friendly - swipe support
- Breadcrumb for easy navigation in photo albums
- Slideshow mode
- deep linking of images and albums
- optimized support of very large galleries (thumbnail image lazy loading or pagination)
- Keyboard shortcuts
- back/forward navigation
- Ignore undesired albums or photosets (by keyword blacklisting)
- Multiple galleries on one page
- easy layout customisation with color schemes - support custom ones
- Delivered with multiple themes - Support custom themes
- Internationalization support (i18n)
- Supported image sources :
  * list of images URL
  * Flickr account
  * Picasa/Google+ account


![Animation](/doc/nanoGALLERY4_demo.gif?raw=true "Animation")
![Screenshot1](/doc/nanoGALLERY4_screenshot1a.png?raw=true "Screenshot1")
![Screenshot2](/doc/nanoGALLERY4_screenshot2.png?raw=true "Screenshot2")
![Screenshot3](/doc/nanoGALLERY4_screenshot4.png?raw=true "Screenshot3")

  
Documentation, Demonstrations and Tutorials
-------------

Visit the nanoGALLERY homepage: [http://nanogallery.brisbois.fr](http://www.nanogallery.brisbois.fr/)



Usage (v4.3)
-----


### Include JS and CSS files


``` HTML
<!-- Add jQuery library (MANDATORY) -->
<script type="text/javascript" src="third.party/jquery-1.7.1.min.js"></script> 

<!-- Add Hammer.js plugin (OPTIONAL - this is only required for swipe support) -->
<script type="text/javascript" src="third.party/hammer.js/hammer.min.js"></script> 

<!-- Add nanoGALLERY plugin files (MANDATORY) -->
<link href="css/nanogallery.css" rel="stylesheet" type="text/css">
<script type="text/javascript" src="jquery.nanogallery.js"></script>
```

Note: If you specify a theme, the corresponding css file must also be included.

>>>>>>> a5ad3b854e129b5123dc46baa29c9026bb0347c7

### Method 1: use one Flickr account

* Create a container

Put a ```<DIV>``` element in the ```<BODY>``` of your HTML page where you want the gallery to be displayed.

```html
<div id="nanoGallery1"></div>
```

* Initialize the script

```js
$(document).ready(function () {
	jQuery("#nanoGallery1").nanoGallery({
		kind:'flickr',
		userID:'34858669@N00'
	});
});
```


### Method 2: use one Picasa/Google+ account

* Create a container

Put a ```<DIV>``` element in the ```<BODY>``` of your HTML page where you want the gallery to be displayed.

```html
<div id="nanoGallery2"></div>
```

* Initialize the script

```js
$(document).ready(function () {
  jQuery("#nanoGallery2").nanoGallery({
  	kind:'picasa',
  	userID:'cbrisbois@gmail.com',
    blackList:'Scrapbook|forhomepage|profil'
  	kind:'picasa'
  });
});
```

### Method 3: use inline elements

use a list of images using HREF attribute

* Create a container

Put a ```<DIV>``` element in the ```<BODY>``` of your HTML page where you want the gallery to be displayed.
And add some ```<A>``` elements to this container. Each element points to one image.

```html
<div id="nanoGallery3">
	<a href="demonstration/img_01.jpg" data-ngthumb="demonstration/img_01t.jpg" data-ngdesc="Description1">Image1</a>
	<a href="demonstration/img_02.jpg" data-ngthumb="demonstration/img_02t.jpg"></a>
</div>
```

* Initialize the script

```js
$(document).ready(function () {
  jQuery("#nanoGallery3").nanoGallery();
});
```

### Method 4: pass the list of images to the script (API)

* Create a container

Put a ```<DIV>``` element in the ```<BODY>``` of your HTML page where you want the gallery to be displayed.

```html
<div id="nanoGallery4"></div>
```

* Initialize the script

Use the 'items' parameter to set the list of images.

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
		]
	});
});
```


License
------------
nanoGALLERY is licensed under [Creative Commons Attribution-NonCommercial 3.0 license](http://creativecommons.org/licenses/by-nc/3.0/).
You are free to use nanoGALLERY for your personal or non-profit website projects.
You need to get the author's permission to use nanoGALLERY for commercial websites or for commercial activities. Contact nano@brisbois.fr



Requirements
------------
Mandatory:
* Javascript must be enabled
* jQuery

Optional:
* transit - jQuery plugin (http://ricostacruz.com/jquery.transit) (credits: Rico Sta. Cruz)
* Hammer.js - Jquery plugin (http://eightmedia.github.io/hammer.js/) (credits: Jorik Tangelder)
* imagesloaded (https://github.com/desandro/imagesloaded) (credits: David DeSandro)
* fancybox2 - jQuery plugin (https://github.com/fancyapps/fancyBox) (credits: Janis Skarnelis)

[![githalytics.com alpha](https://cruel-carlota.pagodabox.com/de295d45496c01bb871078aac2bcfcac "githalytics.com")](http://githalytics.com/Kris-B/nanoGALLERY)

