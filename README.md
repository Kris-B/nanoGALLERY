nanoGALLERY - jQuery plugin 
===========

###Image gallery simplified.

Touch enabled, responsive, fast and supporting cloud storage.

Featuring multi-level navigation in albums, combinable hover effects on thumbnails, slideshow, fullscreen, pagination, image lazy load, themes, deep linking, customizable, i18n, and pulling in Flickr, Picasa, Google+ and SmugMug photo albums among others.


### Usage can be as easy as: 
```js
	$('#elt').nanoGallery({
		kind : 'picasa',
		userID : 'YourEmail@gmail.com'
	});
```


New in v4.4
--------
- added native swipe support (hammer.js is no more required)
- SmugMug storage support
- new thumbnail display mode justified
- helpers to extend the capabilities of nanoGALLERY
- added image microdata
- refinement of demonstration panel
- removed support of browser-back to close the photo viewer
- added HTTPS support
- error messages displayed beneath the gallery (alert() was used up to now)
- restored icons in the light theme (hidding icons is now configurable)

For a full feature list look at the release note.


[View ChangeLog](/changelog.md)


Key features
--------
- Display image galleries
- Display thumbnails and images with titles and descriptions
- Numerous animated thumbnails hover effects (combinations are possible)
- Easy to setup and customizable
- Responsive layout - mobile friendly - Swipe support
- Breadcrumb for easy navigation in photo albums
- Image slideshow
- Deep linking of images and albums
- Optimized support of very large galleries (thumbnail image lazy loading or pagination)
- Keyboard shortcuts
- Browser Back/Forward navigation
- Ignore undesired albums or photosets (by keyword blacklisting)
- Multiple galleries on one page
- Color schemes / Themes
- Internationalization support (i18n)
- Helpers for custom extensions
- Supported image sources :
  * self hosted images
  * Flickr account
  * Picasa/Google+ account
  * SmugMug account


![Animation](/doc/nanoGALLERY4_demo.gif?raw=true "Animation")
![Screenshot1](/doc/nanogallery_screenshot.png?raw=true "Screenshot1")
![Screenshot2](/doc/nanoGALLERY4_screenshot7.png?raw=true "Screenshot2")
![Screenshot1](/doc/nanoGALLERY4_screenshot1a.png?raw=true "Screenshot3")

  
Documentation, Demonstrations and Tutorials
-------------

Visit the nanoGALLERY homepage: [http://nanogallery.brisbois.fr](http://www.nanogallery.brisbois.fr/)



Usage examples
-----


### Include JS and CSS files


``` HTML
<!-- Add jQuery library (MANDATORY) -->
<script type="text/javascript" src="third.party/jquery-1.7.1.min.js"></script> 

<!-- Add nanoGALLERY plugin files (MANDATORY) -->
<link href="css/nanogallery.css" rel="stylesheet" type="text/css">
<script type="text/javascript" src="jquery.nanogallery.js"></script>
```

Note: If you specify a theme, the corresponding css file must also be included.

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


For the full documentation, visit the nanoGALLERY homepage: [http://nanogallery.brisbois.fr](http://www.nanogallery.brisbois.fr/)
-------------


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

