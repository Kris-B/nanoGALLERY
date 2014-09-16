nanoGALLERY - image gallery for jQuery
===========

### Image gallery simplified.

Touch enabled, responsive, justified/cascading/grid layout and supporting cloud storage.

Featuring multi-level navigation in albums, combinable hover effects on thumbnails, responsive thumbnail sizes, multiple layouts, slideshow, fullscreen, pagination, image lazy load, themes, deep linking, customizable, i18n, and pulling in Flickr, Picasa and Google+ photo albums among others.


### Usage can be as easy as: 
```js
	$('#elt').nanoGallery({
		kind : 'picasa',
		userID : 'YourUserID'
	});
```

[View ChangeLog](/changelog.md)  
  
Documentation, Demonstrations and Tutorials
-------------

Visit the nanoGALLERY homepage: [http://nanogallery.brisbois.fr](http://www.nanogallery.brisbois.fr/)   
  

![Animation](/doc/nanoGALLERY4_demo.gif?raw=true "Animation")
![Screenshot1](/doc/nanogallery_screenshot.png?raw=true "Screenshot1")
![Screenshot2](/doc/nanoGALLERY4_screenshot7.png?raw=true "Screenshot2")
![Screenshot1](/doc/nanoGALLERY4_screenshot1a.png?raw=true "Screenshot3")


Usage example with images from a Flickr account
-----


### Include JS and CSS files


``` HTML
<!-- Add jQuery library (MANDATORY) -->
<script type="text/javascript" src="third.party/jquery-1.7.1.min.js"></script> 

<!-- Add nanoGALLERY plugin files (MANDATORY) -->
<link href="css/nanogallery.css" rel="stylesheet" type="text/css">
<script type="text/javascript" src="jquery.nanogallery.js"></script>
```

Note: If you specify a theme, the corresponding css file must be included.


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



### License

nanoGALLERY is licensed under [CC BY-NC 3.0](http://creativecommons.org/licenses/by-nc/3.0/).  
Only for personal, non-profit organizations, or open source projects, you may use nanoGALLERY for free.



### Requirements
* Javascript must be enabled
* jQuery 1.7.1

