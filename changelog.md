nanoGALLERY - jQuery plugin 
===========

ChangeLog
------

v5.1.0
------

##### New features
- possibility to define the image swipe animation. Default (`swipe`) is optimized for modern browser but is supported by older ones also.  
- image toolbar now in 2 sizes: minimized and standard. Minimized is used on small screens.  
- define different thumbnail size dependant on the screen resolution (note: the syntax has evolved since beta).  


##### New options
- **imageTransition**: image swipe animation. Possible values: `slideAppear`, `swipe`. Swipe is optimized for modern browser but is supported by older ones also.  
  *string; Default: `swipe`*  
- **viewerToolbar**: new option `autoMinimize` (*integer; Default: `800`*) to define a breakpoint for switching between minimized and standard toolbar. If the width is lower than this value, the toolbar is switched to minimized.  
- **thumbnailHeight** / **thumbnailWidth**: additional syntax to define sizes dependant of the screen resolution.
  Syntax: `'defaultValue XSn1 SMn2 MEn3 LAn4 XLn5'` where `n1` to `n5` are the values for resolutions `XS` to `XL`. Syntax is case sensitive.  
  Examples: `'200 XS80 SM150 LA250 XL400'` / `'200 XSauto SMauto LA250 XL400'`.  
  Picasa/Google+: thumbnails can be cropped (square) or not. To get the cropped thumbnail, add `C` after the size.  
  Example: `'200C XS80C SM150C LA250 XL400'`.    
- **thumbnailL1Height** / **thumbnailL1Width**: define the thumbnail size for the first navigation level. Same syntax as for **thumbnailHeight** / **thumbnailWidth**.  
- **thumbnailSizeSM**: screen width breakpoint for thumbnail size SM.  
  *integer; Default: `480`*  
- **thumbnailSizeME**: screen width breakpoint for thumbnail size ME.  
  *integer; Default: `992`*  
- **thumbnailSizeLA**: screen width breakpoint for thumbnail size LA.  
  *integer; Default: `1200`*  
- **thumbnailSizeXL**: screen width breakpoint for thumbnail size XL.  
  *integer; Default: `1800`*  

  
##### Misc
- cleanup of the delivery package. Only jQuery still integrated.
- removed thumbnails loading gif.
- bugfix parameter `breadcrumbAutoHideTopLevel` not showing breadcrumb at all in some cases.
- bugfix issue #40 - Script errors in requirejs app (thanks to @jefftmills).
- bugfix PR #44 - pagination container not hidden if not used (thanks to @grief-of-these-days).
- bugfix `thumbnailWidth='auto'` image does not fill 100% of the thumbnail area.


##### Deprecated options:
- **SmugMug support removed**.


v5.0.3
------

##### Google+ and Picasa galleries not loading since 08-25-2014  
Google has changed the MIME TYPE for JSONP preventing nanoGALLERY from executing.  
Issue fixed by switching the Google+/Picasa requests to HTTPS.

##### Deprecated options:
- WARNING: v5.0.x is the last version supporting SmugMug storage. This support will be removed by lack of users and because the SmugMug API is not very smart.



v5.0.2
------

##### New feature
- BETA **imageTransition**: image swipe animation. Possible values: `slideAppear`, `swipe`. Swipe is optimized for modern browser but is supported by older ones also.  
  *string; Default: `slideAppear`*

##### Misc
- fixed issue with `colorScheme` and thumbnail hover effects `labelAppear` and `labelAppear75`
- added `none` to the supported values of `thumbnailHoverEffect`
- parameter `albumList` now supports album IDs as well as album names

##### Deprecated options:
- WARNING: v5.0.x is the last version supporting SmugMug storage. This support will be removed by lack of users and because the SmugMug API is not very smart.


v5.0.1
------

##### New feature
- BETA : thumbnail sizes can be configured according to different screen resolutions (Flickr/Picasa/Google+)


##### Misc
- fixed thumbnail hover animation issue on grid layout
- fixed issue on 'randomN' (parameters: albumSorting and photoSorting)
- fixed incompatibility issue on Safari Mobile before v6.0
- fixed touch twice issue on thumbnail (touchAutoOpenDelay=-1)
- fixed swip up/down on image display
- fixed incompatibility issue between transit.js plugin detection and Bootstrap
- pagination: scroll to gallery top if top is out of the viewport
- breadcrumb label 'List of Albums' renamed 'Galleries'


##### Deprecated options:
- WARNING: v5.0.x is the last version supporting SmugMug storage. This support will be removed by lack of users and because the SmugMug API is not very smart.



v5.0.0
------


##### New features:
- new gallery layout engine
- gallery alignment (left, right, center, justified)
- gutter space between thumbnails
- highly improved thumbnail hover effects (better combinations and now layout style regardless)
- removed the dependency to transit.js (no more required)
- removed support of hammer.js
- display full flickr photostream (set photoset='none', limited to 500 photos)
- new option to automatically start the slideshow
- new gallery fullpage mode
- new thumbnail hover effects
- sort content on title (Flickr, Picasa, Google+, SmugMug)
- thumbnail hover effects: 
    - new option to delay the effect
    - changed default duration from 200ms to 400ms
- new loading animation (now even if breadcrumb is not visible)
- on touch-devices:
    - delay to open automatically the touched thumbnail
    - improved usability (gallery and image display)
- new embedded font version with additional icons (nano_icon_font3)
- imagesloaded is now embedded to avoid conflict with other version
- new javascript helpers (fnViewerInfo, fnProcessData, fnThumbnailHoverResize)
- possibility to define thumbnail images real size (inline and API methods)
- better IE9 support


##### New options:
- **thumbnailAlignment**: set the thumbnail alignment. Possible values: `left`, `right`, `justified`, `center`  
  *string; Default: `center`*
- **thumbnailGutterWidth**: set the horizontal gutter space between thumbnails  
  *integer; Default: `2`*
- **thumbnailGutterHeight**: set the vertical gutter space between thumbnails  
  *integer; Default: `2`*
- **touchAutoOpenDelay**: delay in ms before opening the touched thumbnail. Particular values: `-1`=disabled, `0`=automatic.  
  *integer; Default:`0`*
- **slideshowAutoStart**: start automatically the slideshow when an image is displayed  
  *boolean; default:`false`*
- **thumbnailHoverEffect**: new hover effects `descriptionAppear`, `imageScaleIn80`
- **thumbnailHoverEffect**: new parameters `delay`, `delayBack`
- **photoSorting** / **albumSorting** : new possible values `titleAsc`, `titleDesc`, `randomN` (N=integer representing the maximum number of items to display)
- **dataSorting**: Items sort order (only markup and API method). Possible values: `standard`, `reversed`, `random`  
  *string; default:`'standard'`*
- **galleryFullpageButton**: button to display the gallery in fullpage  
  *boolean; Default:`false`*
- **galleryFullpageBgColor**: background color when the gallery is displayed in fullpage  
  *string; Default:`'#111'`*
- **imgtHeigt** and **imgtWidth**: set the real size of thumbnail images (API method)
- **data-ngthumbImgHeight** and **data-ngthumbImgWidth**: set the real size of thumbnail images (inline method)
- **thumbnailAdjustLastRowHeight**: Automatically lower the last row height to avoid layout breaks (only for justified layout - thumbailWidth='auto')
  *boolean; default:`true`*
  
- **fnProcessData**: javascript helper to extend data associated to thumbnails/images (Flickr, Picasa, Google+, SmugMug)
    Parameters: item (thumbnail object), kind (api, markup, flickr, picasa, smugmug), sourceData (original data retrieved from the online photo sharing site)
- **fnThumbnailHoverResize**: javascript helper fired on gallery resize  
    Parameters: $elt (thumbail element), item (thumbnail object), data (public data)
- **fnViewerInfo**: javascript helper for info button on viewer toolbar  
    Parameters: item (thumbnail object), data (public data)
  
##### Deprecated options:
- removed support of hammer.js
- `paginationMaxItemsPerPage`
- `thumbnailWidth`=`autoUpScale`
- `viewerScrollBarHidden`
- effect `labelSlideUp2`

##### Misc
- fixed broken image icon on some browser
- fixed some bugs in themes clean and light
- added management of browser prefix for a better browser support even with odler jQuery versions
- some css optimization
- many code refactoring
- minor bugfixes




v4.4.2
------

##### New features:
- added native swipe support (hammer.js no more needed but still used if present)

##### New options:
- **viewerScrollBarHidden**: hide the viewer scrollbars
	*boolean; Default: `true`*


##### Deprecated options:
- none

##### Misc
- enhanced Picasa / Google+ filename decode
- minor bugfixes


v4.4.1
------


##### New features:
- Flickr images now only over HTTPS (Flickr is going SSL-Only on June 27th, 2014)
- lazy gallery building
- use image filename as image title
- Flickr: new algorithm to retrieve the best image size depending on the screen resolution
- Flickr: do not display the original uploaded image (e.g. to avoid rotation issue)


##### New options:
- **lazyBuild**: display the gallery only when visible (possible values: 'loadData', 'display', 'none')
	*string; Default: `display`*
- **lazyBuildTreshold**: Shorten the viewport area height (in pixel) for lazyBuild
	*integer; Default: `150`*
- **thumbnailLabel.title**: variable to set the image title (undescores are replaced by spaces). Possible values: '%filename', '%filemaneNoExt'
  *string; default:''*
- **thumbnailLabel.itemsCount: add the number of items in one per photo album (possible values: 'none', 'title', 'description')
	*string; Default: `none`*
- **flickrSkipOriginal**: do not display the original uploaded image (e.g. to avoid rotation issue)
  *boolean; default:true*

**Visit nanoGALLERY homepage for usage details: [http://nanogallery.brisbois.fr](http://www.nanogallery.brisbois.fr/)**

##### Deprecated options:
- **flickrSizeB**: no longer needed / new algorithm implemented

##### Misc
- improved Firefox for Android support
- removed demo panel from main plugin file (now available in jquery.nanogallerydemo.js)
- fixed on location hash not refreshed by breadcrumb
- fixed bug on Flickr album sorting (thanks to Mark Koh)
- fixed bug in fnThumbnailInit() call (thanks to Houlala - https://github.com/Houlala)
- minor bugfixes


v4.4.0
------


##### New features:
- SmugMug storage support
- new thumbnail display mode justified
- helpers to extend the capabilities of nanoGALLERY
- added image microdata
- refinement of demonstration panel
- removed support of browser-back to close the photo viewer
- added HTTPS support
- error messages displayed beneath the gallery (alert() was used up to now)
- restored icons in the light theme (hidding icons is now configurable)

##### New options:
- **thumbnailWidth**: new possible values 'auto' and 'autoUpScale'
- **fnThumbnailInit**, **fnThumbnailHoverInit**, **fnThumbnailHover**, **fnThumbnailHoverOut**, **fnThumbnailDisplayEffect**: javascript helpers
- **breadcrumbAutoHideTopLevel**: hide the breadcrumb if user on first level
	*boolean; Default: `false`*
- **flickrSizeB**: include the large size (B-size / 1024) when needed
	*boolean; Default: `false`*
- **imageTransition**: transition animation when moving from image to image (`default`, `fade')
	*string; Default: `default`*

**Visit nanoGALLERY homepage for usage details: [http://nanogallery.brisbois.fr](http://www.nanogallery.brisbois.fr/)**

##### Deprecated options:
- none

##### Misc
- change default colorSchemeViewer default from 'none' to 'default'
- fixed compatibility issue with niceScroll plugin (http://areaaperta.com/nicescroll)
- minor bugfixes


v4.3.0
------

##### New features:
- new image display possibilities giving a larger area to the images (customizable position of navigation buttons and labels)
- set the maximum length of title and description to avoid too long content
- display or hide the icons of the thumbnails label and/or navigation breadcrumb
- thumbnail text alignment
- breadcrumb: new icon for home folder
- sorting of photos and of albums
- preload also previous image
- added Text-Shadow attribute to color schemes
- refinement of the 'light' theme
- new thumbnail hover effects
- added support of Picasa/Google+ albums that are limited to people who have a link with an authkey

##### New options:
- **viewerToolbar**: Display options for toolbar of the viewer (navigation buttons and captions)
	*object; Default: `{position:'bottom', style:'innerImage'}`*
	**position** : Position of the viewer toolbar (possible values: `top`, `bottom`)
	*string; Default: `bottom`*
	**style** : style of the toolbar (possible values: `innerImage`, `stuckImage`, `fullWidth`)
	*string; Default: `innerImage`*
- **thumbnailLabel**: new parameters `titleMaxLength`, `descriptionMaxLength`, `hideIcons` and 'align'
- **galleryToolbarHideIcons**: display or not the icons in the navigation breadcrumb
- **photoSorting**: sort photo albums (possible values: `standard`, `reversed`, `random`) (Flickr/Picasa/Google+)
	*string; Default: `standard`*
- **albumSorting**: sort photos in albums (possible values: `standard`, `reversed`, `random`) (Flickr/Picasa/Google+)
	*string; Default: `standard`*
- **thumbnailHoverEffect**:	new possible values: `labelSplitVert`, `labelSplit4`, `labelAppearSplitVert`, `labelAppearSplit4`, `imageSplitVert`, `imageSplit4`
  
**Visit nanoGALLERY homepage for usage details: [http://nanogallery.brisbois.fr](http://www.nanogallery.brisbois.fr/)**

##### Deprecated options:
- none

##### Misc
- CSS: renamed 'container' to 'nanoGalleryContainerParent'
- remove support of jQuery-JSONP
- bufix incorrect label display under the thumbnail
- minor bugfixes

**Contributors: Giovanni Chiodi and AlexRed --> many thanks!**


v4.2.1
------

##### New features:
- global photo/album title and description
- new label position `overImageOnMiddle`
- new theme `light` (optimized for light backgrounds)


##### New options:
- **i18n**: new elements `thumbnailImageTitle` `thumbnailAlbumTitle` `thumbnailImageDescription` `thumbnailAlbumDescription`.
- **thumbnailLabel**: new possible value `{position:'overImageOnMiddle'}

##### Deprecated options:
- none

##### Misc
- bug **mouse click outside gallery not working** - fixed


v4.2.0
------

##### New features:
- display current image number and total count of images
- close button in upper right corner
- use responsive image resolution with Flickr/Picasa/Google+ (small images on lowres display)
- back/forward navigation
- deep linking of images and albums
- thumbnail height auto: fill the thumbnail with the entire image (no black space)


##### New options:
**Name** | **Description**
------- | -------
**locationHash** | Enable or disable back/forward navigation and deep linking of images and photo albums.
    | *boolean; Default: `false`*
    | Note: only one gallery per page should use this feature.
**viewerDisplayLogo** | Enable or disable logo display on top of images (defined in CSS file)
    | *boolean; Default: `false`*
**thumbnailHeight** | Height in pixels of the thumbnails
    | *integer|auto*


##### Deprecated options:
- none

##### misc
- UI is no more freezed during thumbnails rendering
- removed hover delay on thumbnail (animation starts immediately on mouse hiver now)
- removed tags parameter in Flickr API requests
- changed default color scheme from 'default' to 'none'
- optimized image display
- fixed fancybox-related code (thanks to grief-of-these-days - https://github.com/grief-of-these-days)
- minor bugfixes


v4.1.0
------

##### New features:
- gesture support
- pagination
- optimized support of large galleries (thumbnails image lazy loading or pagination)
- support browser back-button to close the lightbox
- albums content are now cached to avoid reloads
- slideshow mode
- keyboard shortcuts
- i18n support in gallery content (titles and descriptions) and in UI elements
- fullscreen mode
- multi-level navigation support to API and HREF-methods
- dependency to jQuery-JSONP plugin is now optional (affects only Flickr/Picasa/Google+ storage)

##### New options:
* `paginationMaxItemsPerPage`: maximum number of thumbnails per page (pagination)
* `paginationMaxLinesPerPage`: maximum number of thumbnails lines per page (pagination)
* `galleryToolbarWidthAligned`: toolbar is automatically resized to the width of the thumbnails area
* `slideshowDelay`: delay in ms before displaying next image (slideshow)
* `thumbnailDisplayInterval`: interval in ms between the display of 2 thumbnails
* `thumbnailDisplayTransition`: enable transition animation before displaying one thumbnail
* `thumbnailLazyLoad`: enable lazy load of thumbnails image (image is loaded when displayed in the viewport)
* `thumbnailLazyLoadTreshold`: extend the viewport area for thumbnails image lazy load
* `i18n`: UI string translations

##### Outdated options:
* `topLabel`: replaced by i18n

##### Minor bugfixes


v4.0.3
------

*  new: animation on touch event 
*  bugfix Flickr - no image displayed when original size is disabled
*  bugfix on slow speed connection


v4.0.2
------

*  Improved compatibility to Bootstrap Framework.
*  Minor bug fixes.


v4.0.1
------

Typo in nanogallery.jquery.json


v4.0.0
------

Version 4 has been optimized and layout customization is now much easyer.
Main new features:
- parameter to set the thumbnails animated hover effects (combinations possible)
- color schemes to avoid having to edit any CSS file
- display images faster (thanks to pre-loading)


##### New general options:
* `thumbnailLabel`: Display options for the image label (title and description)
* `thumbnailHoverEffect`: Set the thumbnail mouse hover effect
* `colorScheme`: Set the color scheme for the gallery (breadcrumb and thumbnails)
* `colorSchemeViewer`: Set the color scheme for the image viewer

**See readme.md for details**

##### Note about CSS files / themes:
CSS files have been complety rewritten and files from previous version are not compatible with v4. Thumbnails hover effects are no more managed with CSS files/themes. The new `thumbnailHoverEffect` option should be used instead.


v3.3.0
------

Now even easier to implement thanks to the new internal viewer for displaying the images (less external files to include). Fancybox is still available but optional.

PNG-icons have been replaced by the icon font "Font Awesome" allowing an optimized display.

##### New general option:
* ```viewer``` : ```internal``` / ```fancybox``` - display images with the default viewer or with FancyBox. Internal viewer will be used if not defined.

##### New options specific to Picasa/Google+/Flickr storage:

* ```whiteList``` : list of keywords to authorize - albums must contain one of the keywords to be displayed. Keyword separator is '|'.
* ```albumList``` : list of albums to display. Separator is '|'.
