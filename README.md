nanoGALLERY - jQuery plugin 
===========

Simplistic to use image gallery plugin for jQuery.

30 animated thumbnails **hover effects** (combinable). Support for pulling in **Flickr** and **Picasa/Google+** photo albums among others. Mobile-friendly and responsive. Smooth in/out transitions. Breadcrumb for multi-level navigation. Images are shown as clickable thumbnails, which will expand to full view via a modal popup window. Support custom themes.

### Usage can be as easy as: 
```js
	$('#elt').nanoGallery({
		'kind':'picasa',
		'userID':'cbrisbois@gmail.com'
	});
```


New in v4
--------
Version 4 has been optimized and layout customization is now much easyer.

- parameter to set the thumbnails animated hover effects (combinations possible)
- color schemes to avoid having to edit any CSS file
- display images faster (thanks to pre-loading)
- icons now font-based for a better hires (Retina) display


Key features
--------
- Display image galleries
- Display images with titles and descriptions
- Thumbnails with titles and descriptions
- 30 animated thumbnails hover effects (combinations are possible)
- Easy to setup and customizable
- Responsive layout - mobile friendly
- Breadcrumb for easy navigation in photo albums
- Ignore undesired albums or photosets (by keyword blacklisting)
- Multiple galleries on one page
- easy layout customisation with color schemes - support custom ones
- Delivered with multiple themes - Support custom themes
- Supported image sources :
  * list of images
  * Flickr account
  * Picasa/Google+ account


![Screenshot](/doc/nanoGALLERY4_screenshot1a.png?raw=true "Screenshot1")
![Screenshot](/doc/nanoGALLERY4_screenshot2.png?raw=true "Screenshot2")
![Screenshot](/doc/nanoGALLERY4_screenshot3.png?raw=true "Screenshot3")

  
Demonstration and Tutorials
-------------

Visit the demonstration page for some usefull code samples and to test online some settings: [http://nanogallery.brisbois.fr](http://www.nanogallery.brisbois.fr/)


- Flickr account
   * [display full portfolio with breadcrumb navigation](http://jsfiddle.net/Kris_B/Gukd3/)
   * [display a specific photoset](http://jsfiddle.net/Kris_B/Npw9e/)
- Picasa/Google+ account
   * [display full portfolio with breadcrumb navigation](http://jsfiddle.net/Kris_B/AX9z9/)
   * [display a specific album](http://jsfiddle.net/Kris_B/C6DFv/)
- [list of images using HREF attribute](http://jsfiddle.net/Kris_B/ZeA5b/)
- [list of images passed to the script (API)](http://jsfiddle.net/Kris_B/gvauS/)


Usage (v4.0)
-----


### Include JS and CSS files


``` HTML
<!-- Add jQuery library -->
<script type="text/javascript" src="third.party/jquery-1.8.2.min.js"></script> 

<!-- Add jsonp plugin (only mandatory for Flickr, Google+ and Picasa) -->
<script type="text/javascript" src="third.party/jquery-jsonp/jquery.jsonp.js"></script>

<!-- Add Transit plugin (this is only required for some hover effets) -->
<link href="css/nanogallery.css" rel="stylesheet" type="text/css">

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
		kind:'flickr',
		userID:'34858669@N00'
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
  	kind:'picasa',
  	userID:'cbrisbois@gmail.com',
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

### Method 4: use a list of images passed to the script (API)

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
		]
	});
});
```



Syntax and options
------------------

### General options

**Name** | **Description**
------- | -------
**thumbnailHeight** | Height in pixels of the thumbnails
    | *integer*
**thumbnailWidth** | Width in pixels of the thumbnails
    | *integer*
**maxItemsPerLine** | Maximum number of thumbnails per line
    | *integer; Default: 0 (undefined)*
**maxWidth** | Maximum width of the gallery in pixel
    | *integer; Default: 0 (undefined)*
**viewer** | Image display method (possible values: `internal`, `fancybox`)
    | *string; Default: `internal`*
**thumbnailLabel** | Display options for the image label (title and description)
	| *object; Default: `{position:'overImageOnBottom',display:true,displayDescription:true}`*
	| **position** : Position of the label (possible values: `overImageOnBottom`, `overImageOnTop`, `onBottom`)
	|	*string; Default: `overImageOnBottom`*
	| **display** : Display or not the label.
	|	*Boolean; Default: `true`*
	| **displayDescription** : Display or not the description
	|	*Boolean; Default: `true`*
**thumbnailHoverEffect** | Set the thumbnail mouse hover effect
	| *string, object, array; Default: `none`*
	| Possible values: `slideUp`, `slideDown`, `slideLeft`, `slideRight`, `imageSlideUp`, `imageSlideDown`, `imageSlideLeft`, `imageSlideRight`, `labelAppear`, `labelAppear75`, `labelSlideDown`, `labelSlideUp`, `labelOpacity50`, `imageOpacity50`, `borderLighter`, `borderDarker`, `imageInvisible`, `descriptionSlideUp`
	| Transit plugin is required for following values: `imageScale150`, `imageScale150Outside`, `scale120`, `overScale`, `overScaleOutside`, `scaleLabelOverImage`, `rotateCornerBR`, `rotateCornerBL`, `imageRotateCornerBR`, `imageRotateCornerBL`, `imageFlipHorizontal`, `imageFlipVertical`
**theme** | Name of the theme - the corresponding css-file must also be included in the html file (Possible values: `default`, `clean`)
	| *string; Default: `default`*
**itemsBaseURL** | URL prefix for the images defined with method#1 or method#2
	| *string*
**colorScheme** | Set the color scheme for the gallery (breadcrumb and thumbnails) (possible values: `none`, `dark`,`darkRed`, `darkGreen`, `darkBlue`, `darkOrange`, `light`). Custom color schemes are supported.
	| *string, object; Deault: 'dark'*
**colorSchemeViewer** | Set the color scheme for the image viewer (possible values: `none`, `dark`,`darkRed`, `darkGreen`, `darkBlue`, `darkOrange`, `light`). Custom color schemes are supported.
	| *string, object; Deault: 'dark'*
**touchAnimation** | Enable/Disable animation on touch event
    | *boolean; Default: `true`*
	
	

	

### Picasa/Google+ specific arguments
**Name** | **Description**
------- | -------
**kind** | Set the storage type (**mandatory**). Must be set to `picasa`
    | *string*
**userID** | User ID of the Picasa/Google+ account (**mandatory**)
    | *string*
**album** | Album ID - to display only the specified album 
    | *string*
**displayBreadcrumb** | Display or not the navigation breadcrumb
	|	*Boolean; Default: `true`*
**topLabel** | Label to display in the breadcrumb for the top level
    | *string*
**blackList** | List of keywords to ignore - albums containing one of the keywords in the title will be ignored. Keyword separator is  `|`.
    | *string*
**whiteList** | List of keywords to authorize - albums must contain one of the keywords to be displayed. Keyword separator is `|`.
    | *string*
**albumList** | List of albums to display. Separator is `|`.
    | *string*

#### Example:

```js
$(document).ready(function () {
  jQuery("#nanoGallery").nanoGallery({
  	kind:'picasa',
  	userID:'cbrisbois@gmail.com',
  	thumbnailWidth:150,
  	thumbnailHeight:150,
  	blackList:'scrapbook|forhomepage|profil'
  });
});
```



### Flickr specific arguments
**Name** | **Description**
------- | -------
**kind** | Set the storage type (**mandatory**). Must be set to `flickr`
    | *string*
**userID** | User ID of the Picasa/Google+ account (**mandatory**)
    | *string*
**photoset** | Photoset ID - to display only the specified photoset 
    | *string*
**displayBreadcrumb** | Display or not the navigation breadcrumb
	|	*Boolean; Default: `true`*
**topLabel** | Label to display in the breadcrumb for the top level
    | *string*
**blackList** | List of keywords to ignore - albums containing one of the keywords in the title will be ignored. Keyword separator is `|`.
    | *string*
**whiteList** | List of keywords to authorize - albums must contain one of the keywords to be displayed. Keyword separator is `|`.
    | *string*
**albumList** | List of albums to display. Separator is `|`.
    | *string*

	
To retrieve your Flickr user ID, use this page:
```
http://www.flickr.com/services/api/explore/flickr.people.findByUsername
```



Transit hover effects
------

The thumbnail mouse hover effects `imageScale150`, `imageScale150Outside`, `scale120`, `overScale`, `overScaleOutside`, `scaleLabelOverImage`, `rotateCornerBR`, `rotateCornerBL`, `imageRotateCornerBR`, `imageRotateCornerBL`, `imageFlipHorizontal`, `imageFlipVertical` require to use the Transit jQuery plugin.

For this, just include following JS in your page


``` HTML
<!-- Add Transit plugin -->
<script type="text/javascript" src="third.party/transit/jquery.transit.min.js"></script> 
```


Advanced thumbnail mouse hover effects settings
------
Settings to fine tune the ```thumbnailHoverEffect``` parameter: ```name``` ```duration``` ```durationBack``` ```easing``` ```easingBack```
Only ```name``` is mandatory.


### Example:

```js
$(document).ready(function () {
  jQuery("#nanoGallery").nanoGallery({
  	kind:'picasa',
  	userID:'cbrisbois@gmail.com',
  	blackList:'scrapbook|forhomepage|profil',
	thumbnailHoverEffect:[{'name':'slideUp','duration':400,'durationBack':200,'easing':'swing','easingBack':'swing'}]
  });
});
```


Combine thumbnail mouse hover effects
------

### Example:

```js
$(document).ready(function () {
  jQuery("#nanoGallery").nanoGallery({
  	kind:'picasa',
  	userID:'cbrisbois@gmail.com',
  	blackList:'scrapbook|forhomepage|profil',
	thumbnailHoverEffect:
		[{'name':'slideUp','duration':400,'durationBack':200,'easing':'swing','easingBack':'swing'},
		{'name':'borderLighter','duration':300,'durationBack':200}]
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
  	kind:'picasa',
  	userID:'cbrisbois@gmail.com',
	blackList:'Scrapbook|forhomepage|profil',
	viewer:'fancybox'
  });
});
```


Themes
------

CSS layout description:
![CSS layout](/doc/css_map.png?raw=true "CSS Layout")


Licence
------------
nanoGALLERY is licensed under [Creative Commons Attribution-NonCommercial 3.0 license](http://creativecommons.org/licenses/by-nc/3.0/).
You are free to use nanoGALLERY for your personal or non-profit website projects.
You need to get the author's permission to use nanoGALLERY for commercial websites.



Requirements
------------
* Javascript must be enabled
* jQuery
* jsonp - jQuery plugin (https://github.com/jaubourg/jquery-jsonp) (credits: Julian Aubourg)
* transit - jQuery plugin (http://ricostacruz.com/jquery.transit) (credits: Rico Sta. Cruz)
* fancybox2 - jQuery plugin (https://github.com/fancyapps/fancyBox) (credits: Janis Skarnelis)

[![githalytics.com alpha](https://cruel-carlota.pagodabox.com/de295d45496c01bb871078aac2bcfcac "githalytics.com")](http://githalytics.com/Kris-B/nanoGALLERY)


