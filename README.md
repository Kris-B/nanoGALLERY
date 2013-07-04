nanoGALLERY - jQuery plugin 
===========

Really easy to implement and powerful jQuery plugin to display image galleries. Mobile-friendly and responsive. Support custom themes. Display also album and images stored in Flickr or Google+/Picasa.

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

### Step 2: create a container
Put a DIV element in you page at the place where you want the gallery to be displayed.
```
<div id="nanoGallery"></div>
```

### Step 3: create a gallery
Method 1: use a Flickr account

``` HTML
$(document).ready(function () {
	jQuery("#nanoGallery").nanoGallery({userID:'34858669@N00',kind:'flickr',topLabel:'Home',thumbnailWidth:100,thumbnailHeight:100});
});
```

Method 2: use a Picasa/Google+ account
``` HTML
$(document).ready(function () {
  jQuery("#nanoGallery").nanoGallery({userID:'cbrisbois@gmail.com',kind:'picasa',topLabel:'Albums'});
});
```

### Options

