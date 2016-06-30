nanoGALLERY - jQuery plugin 
===========

ChangeLog 
------

v5.10.3
------
- nanoPhotosProvider : underscores are replaced with spaces in title an description  
- nanoPhotosProvider : remove leading @@NNNN in title  

v5.10.2
------
- bugfix issue #119 iPhone issue - version detection error  
  (thanks to Sean Kenny - https://github.com/seankenny)  

  
v5.10.1
------

##### New   
- embeded script imagesLoaded: new version v4.1.0 included  

##### Misc  
- bugfix issue #117 Images sometimes fail to load after upon folder navigation in Safari  
- bugfix in the handling of multi resolution thumbnail images  


v5.10.0
------

##### New options
- **paginationVisiblePages**: thumbnail pagination - maximum visible pages.  
  *integer; Default: 10*  
- content source nanoPhotosProvider now supports options `albumList`, `whiteList`, `blackList`, `album`  
  
##### Misc
- spanish translation (thanks to eae710 - https://github.com/eae710)  


v5.9.1
------

- bugfix: issue #97 - ThumbnailL1 issue  
- bugfix: images incorrectly displayed in some cases


v5.9.0
------

##### New options
- **albumMax**: Maximum number of albums to display (Flickr, Picasa/Google+, nanoPhotosProvider) (0=disabled).  
  *integer; Default: 0*  
- **galleryEnableKeyboard**: Enables keyboard navigation beween albums.  
  *boolean; Default: false*  
  ESC: display first level  
  Up, Right, PageUp: Display next album  
  Down, Left, PageDown: Display previous album  
  (credits: Victor A. Banuelos - https://github.com/vbanuelos)  
  
##### New API methods  
- **refreshSize**: Force a gallery resize.  
  When the gallery container is hidden and is set to visible at a later time, this method will avoid incorrect thumbnail position.  
  `$('#yourElement').nanoGallery('refreshSize');`  
  (credits: Daniel Eck - https://github.com/Ecksters)  
- **minimizeToolbar**: minimize image viewer toolbar.  
  `$('#yourElement').nanoGallery('minimizeToolbar');`  
  (credits: Victor A. Banuelos - https://github.com/vbanuelos)  
- **maximizeToolbar**: maximize image viewer toolbar.  
  `$('#yourElement').nanoGallery('maximizeToolbar');`  
  (credits: Victor A. Banuelos - https://github.com/vbanuelos)  
- **galleryCountImages**: Returns the number of images in the current displayed album.  
  `$('#yourElement').nanoGallery('galleryCountImages');`  
  (credits: Victor A. Banuelos - https://github.com/vbanuelos)  
- **moveToNextAlbum**: Display next gallery album.  
  `$('#yourElement').nanoGallery('moveToNextAlbum');`  
  (credits: Victor A. Banuelos - https://github.com/vbanuelos)  
- **moveToPreviousAlbum**: Display previous gallery album.  
  `$('#yourElement').nanoGallery('moveToPreviousAlbum');`  
  (credits: Victor A. Banuelos - https://github.com/vbanuelos)  
  
##### Misc
- fixed `nanoPhotosProvider` compatibility issue (https://github.com/Kris-B/nanoPhotosProvider)  
- removed option 'jsonCharset'  
- bugfix: issue #86 - error on hoverOut n[r].toFixed is undefined (credits: Andrea Grassi - https://github.com/andrea-sdl)  
- bugfix: issue #78 - NGTweenable undefined when loading in a page using AMD and requirejs (credits: Jeff Mills - https://github.com/jefftmills)  


**Many thanks to Victor A. Banuelos, Daniel Eck, Jeff Mills and Andrea Grassi for their contribution.**


v5.8.0
------

##### New API methods  
- **closeViewer**: close the image viewer.  
  `$('#yourElement').nanoGallery('closeViewer');`  
  (credits: Victor A. Banuelos - https://github.com/vbanuelos)  
- **paginationPreviousPage**: go to previous gallery page (when in pagination mode).  
  `$('#yourElement').nanoGallery('paginationPreviousPage');`  
- **paginationNextPage**: go to next gallery page (when in pagination mode).  
  `$('#yourElement').nanoGallery('paginationNextPage');`  
- **paginationCountPages**: returns the number of gallery pages (when in pagination mode).  
  `var countPages = $('#yourElement').nanoGallery('paginationCountPages');`  
- **paginationGotoPage**: go to a specific gallery page (when in pagination mode).  
  `$('#yourElement').nanoGallery('paginationGotoPage', pageNumber);`  
- **getCurrentViewedItem**: get the currently viewed item. Returns `null` if viewer not displayed.
  `var item=$('#yourElement').nanoGallery('getCurrentViewedItem');`  
  (credits: Daniel Eck - https://github.com/Ecksters)  
- **getCurrentViewedItemIdx**: get the index of the currently viewed image. Returns `-1` if viewer not displayed.
  `var itemIdx=$('#yourElement').nanoGallery('getCurrentViewedItemIdx');`  
  (credits: Daniel Eck - https://github.com/Ecksters)  

  
##### Misc
- Picasa/Google+: now supports more than 1.000 images per album (credits: Giovanni Chiodi).  
- bugfix: hover animations becoming choppy after navigating fastly in images.  
- bugfix: loading CSS animation consuming memory even if not visible.  
- bugfix: issue #78 - NGTweenable undefined when loading in a page using AMD and requirejs (credits: Jeff Mills - https://github.com/jefftmills)  
  
**Many thanks to Giovanni Chiodi, AlexRed, Jeff Mills, Victor A. Banuelos and Daniel Eck for their contribution.**  

v5.7.0
------

##### New callback  
- **fnThumbnailOpen**: called after a thumbnail is clicked/touched to display the image.  
  Can be used to replace the standard viewer/lightbox with an external lightbox.   

##### New options
- **thumbnailOpenImage**: enable the viewer/lightbox to display images after a thumbnail is clicked/touched.  
  *boolean; Default: true*  
- **paginationSwipe**: on the gallery, enable swipe to go to next/previous page.  
  *boolean; Default: true*  
  
##### Misc
- included new version of Shifty (v1.5)  
- disabled AMD  


v5.6.0
------

##### New API method  
- **setSelectMode**: Enter/leave the selection mode, and set the kind.  
  Possible values: true, false or can be a single kind : 'album' or 'image'.  
  `$('#yourElement').nanoGallery('setSelectMode', true|false|'album'|'image');`  

##### New option  
- **keepSelection**: do not lose selection on navigation  .
  *boolean; Default: false*  

##### Misc
- changed the touch swipe sensibility on gallery  

**Many thanks to Raphaël Renaudon (https://github.com/sevarg) for his contribution.**


v5.5.4
------

##### New API method  
- **displayItem**: display an item (album or image).  
  `$('#yourElement').nanoGallery('displayItem', 'itemID');`  
  itemID syntax to display an album: 'albumID'  
  itemID syntax to display an image: 'albumID/imageID'  


v5.5.3
------

- bugfix - Flickr image size L (1024 pixels) ignored  


v5.5.2
------

##### New features  
- Display directly an album or an image on plugin start  
- Display the images instead of the thumbnails of the album's content  
  
##### New options  
- **openOnStart**: opens an album or an image at start. Syntax: `albumID` or `albumID/imageID`.  
  *string; Default: ''*  
- **thumbnailAlbumDisplayImage**: on album's thumbnail click, displays the images instead of the thumbnails of the album's content.  
  *boolean; Default: false*  


##### Misc  
- bugfix scrollbar not displayed in gallery fullpage mode for thumbnail effects `scale120, imageScale150Outside, overScaleOutside, imageFlipHorizontal, imageFlipVertical`  
- bugfix lazy load not working in gallery fullpage mode  
- bugfix thumbnail effects `borderLighter` and `borderDarker` not working on Firefox  


v5.5.1
------

- bugfix thumbnail effects 'labelAppear' and 'labelAppear75' crashing on some browser


v5.5.0
------

##### New features
- Gallery rendering: significant performance improvements  
- Thumbnail selection on long touch  
  
##### New options
- **showCheckboxes**: displays a checkbox over selected thumbnails.  
  *boolean; Default: true*  
- **checkboxStyle** : inline style for selection checkbox.  
  *string, Default: 'left:15px; top:15px;'*  
- inline method: new data attribute to store custom data: `customdata`  
  Usage example: `<a href="img.jpg" data-ngthumb="imgt.jpg" data-customdata='{"a":"1", "b":"2"}'>title</a>`  
- API method: new property to store custom data: `customData`  
  Usage example: `{src: 'img.jpg', srct: 'imgt.jpg', title: 'image01', albumID:0, customData:{v1:1, v2:2} }`  
- **viewerFullscreen**: displays images in fullscreen (on supported browser).  
  *boolean; Default: false*  

##### New callbacks
- **fnInitGallery(albumIdx, pageNumber)**: called after each gallery construction.
- **fnChangeSelectMode(currSelectionMode)**: called when entering or leaving selection mode.
  
##### New API methods
- **destroy**: remove the gallery.  
  `$('#yourElement').nanoGallery('destroy');`  
- **setSelectMode**: enter/leave selection mode.  
  `$('#yourElement').nanoGallery('setSelectMode', true|false);`  
- **getSelectMode**: is the gallery in selection mode.  
  `$('#yourElement').nanoGallery('getSelectMode');`  

##### Misc
- bugfix location hash not working on web page with frames (SecurityError: Blocked a frame with origin)  
- bugfix deeplinking to image didn't display the gallery on close  
- bugfix fullscreen mode not correctly disabled after closing an image with ESC key  
- minor bugfixes  

**Many thanks to Raphaël Renaudon (https://github.com/sevarg) for his contribution.**

v5.4.0
------

##### New features
- Pagination with dots (additionally to page numbers)
- Settings specific to first navigation level: extended to thumbnailL1Label (#53), thumbnailL1HoverEffect , touchAnimationL1
- Responsive image sizes now supported by API and inline methods
- Better support of custom HTML elements in thumbnails
- Selectable thumbnails
- New API methods (beta)
  
##### New options
- **paginationDots**: display dots for thumbnail pagination  
  *boolean; Default: false*  
- **thumbnailL1Label**: set thumbnail's label options for first navigation level  
- **thumbnailL1HoverEffect**: set thumbnail's hover effects options for first navigation level  
- **touchAnimationL1**: enable touch animation on first navigation level
- inline method: new properties to define responsive image sources `data-ngSrcXS`, `data-ngSrcSM`, `data-ngSrcME`, `data-ngSrcLA`, `data-ngSrcXL`  
- API method: new properties to define responsive image sources: `srcXS`, `srcSM`, `srcME`, `srcLA`, `srcXL`  
- **breakpointSizeSM**, **breakpointSizeME**, **breakpointSizeLA**, **breakpointSizeXL**: new syntax to define resolution breakpoints  
- **itemsSelectable**: enable thumbnail selection  
  *boolean; Default: false*  

##### New callbacks
- **fnThumbnailClicked($elt, item)**: fired on click/touch event on thumbnail. Open is cancelled if function returns false.  
- **fnImgDisplayed($elt, item)**: fired after an image is displayed.  
- **fnThumbnailSelection($elt, item)**: fired when a thumbnail is selected.  
  
##### New API methods (beta)
- Reload current album: `$('#yourElement').nanoGallery('reload');`  
- Get an option: `$('#yourElement').nanoGallery('option', option_name);`  
- Set an option: `$('#yourElement').nanoGallery('option', option_name, new_value);` (note: only some options are supported)  
- Get an item: `$('#yourElement').nanoGallery('getItem', item_index);`  
- Get every items: `$('#yourElement').nanoGallery('getItems');`  
- Get the indexes of some items: `$('#yourElement').nanoGallery('getItemsIndex', [item1, item2, item3, ...]);`  
- List selected items: `$('#yourElement').nanoGallery('getSelectedItems');`  
- Select some items: `$('#yourElement').nanoGallery('selectItems', [item1, item2, item3, ...]);`  
- Unselect some items: `$('#yourElement').nanoGallery('unselectItems', [item1, item2, item3, ...]);`  

##### Misc
- Option locationHash: default value changed from false to true
- Some code redesign
- bugfix: click/touch handling on custom HTML elements on thumbnails (specify class 'customEventHandler' to force custom click/touch event handling)  
- bugfix: cascading layout/thumbnails invisible in some cases  

##### Depreciated options
- `thumbnailSizeSM` -> replaced by `breakpointSizeSM`, but still supported  
- `thumbnailSizeME` -> replaced by `breakpointSizeME`, but still supported  
- `thumbnailSizeLA` -> replaced by `breakpointSizeLA`, but still supported  
- `thumbnailSizeXL` -> replaced by `breakpointSizeXL`, but still supported  
  
**Many thanks to Raphaël Renaudon (https://github.com/sevarg) for his contribution.**  


v5.3.0
------

##### New feature
- PHP extension to publish dynamically self-hosted pictures to the gallery (see https://github.com/Kris-B/nanoPhotosProvider)  

##### New options
- **kind**: new possible value `json` for self-hosted photos (see https://github.com/Kris-B/nanoPhotosProvider)  
- **jsonProvider**: set URL to the nanoPhotosProvider extension (see https://github.com/Kris-B/nanoPhotosProvider)  
  *string; Default: ''*  
- **jsonCharset**: set the string charset for json data. Possible values: `Latin`, `UTF-8`  
  *string; Default: 'Latin'*  

##### Misc
- request #63: added Bower support  
- added npm support  


v5.2.3
------

##### New options
- **picasaUseUrlCrossDomain**: access Picasa/Google+ using the cross domain URL instead of the standard one.
  *boolean; Default: true*  
- **supportIE8**: enable IE8 support.
  *boolean; Default: true*  

##### Misc
- bugfix #53 (Chrome browser) scrollbar not enabled back after closing an image displayed in fullscreen
- bugfix hover out thumbnail animation not triggered
- bugfix image URL with spaces not supported
- bugfix imageTransition:'fade' not working
- bugfix #58 pagination issue when only used on second level



v5.2.2
------

- bugfix thumbnails not displayed when thumbnailWidth='auto' and gallery is outside the viewport
- bugfix #53 scrollbar not enabled back after closing image in some cases
- bugfix image toolbar - info button not displayed when fnViewerInfo defined
- bugfix incorrect image position after swipe when imageTransition='slideAppear'



v5.2.1
------

##### New features
- support right-to-Left display direction (RTL)
- customize image toolbar (content and order)
- added partial support for IE8 (update warning displayed on IE7/6)
- direct link to the Flickr/Google+ image page
- fancyBox custom settings
- CSS files: additional versions with embedded WOFF icons font (to avoid same origin policy issues)


##### New options
- **RTL**: display direction from right to left.  
  *boolean; Default: false*  
- **viewerToolbar**: new display options for the image toolbar:  
  `display` (*boolean; Default: `false`*): display or hide the toolbar.  

  `standard` (*string;*): list of items to display in the standard toolbar (comma separated). The order is taken into account.
    Default value: `'minimizeButton,previousButton,pageCounter,nextButton,playPauseButton,fullscreenButton,infoButton,linkOriginalButton,closeButton,label'`
    Possible values: `minimizeButton`, `previousButton`, `pageCounter`, `nextButton`, `playPauseButton`, `fullscreenButton`, `infoButton`, `linkOriginalButton`, `closeButton`, `label`, `customN`  

  `minimized` (*string*): list of items to display in the minimized toolbar (comma separated). The order is taken into account.
    Default value: `'minimizeButton,label'`
    Possible values: `minimizeButton`, `previousButton`, `pageCounter`, `nextButton`, `playPauseButton`, `fullscreenButton`, `infoButton`, `linkOriginalButton`, `closeButton`, `label`, `customN`
- **fancyBoxOptions**: options for fancyBox. This will overwrite the default settings.  
  *object; Default: null*  
- **fnImgToolbarCustInit**: called once on toolbar building to define the specified custom element.  
  Parameters: elementName (current custom element name)
- **fnImgToolbarCustDisplay**: called on each image display. Called once for all image toolbar custom elements.  
  Parameters: $elements (custom elements), item (thumbnail object), data (public data)
- **fnImgToolbarCustClick**: fired on click event on one image toolbar custom element.  
  Parameters: elementName (current custom element name), $element (current custom element), item (thumbnail object), data (public data)

  
##### Misc
- image default swipe animation now with requestAnimationFrame
- changed image counter layout on album thumbnail
- added a workaround on jQuery JSONP error handling
- devicePixelRatio now used to determine the size of the image to display (Flickr/Picasa)
- bugfix label on bottom not displayed in grid layout
- bugfix breadcrumb broken on navigation level 3
- bugfix refresh issue in gallery rendering with webkit browser
- bugfix API options imgtHeight/imgtWidth ignored
- bugfix #51 - gallery not working after scrolling in mobile phones / swipe issue
- bugfix sort option titleAsc/titleDesc based on original filename (Picasa/Google+)
- bugfix scrollbar lost after using fullscreen mode on OS X Maverick
- bugfix no thumbnail displayed because of conflict between thumbnailHoverEffect and thumbnailLabel.display=false


v5.2.0
------

- Not released due to an incorrect tag previously used in Github


v5.1.1
------

 
##### Misc
- embeded imagesLoaded.js updated to v3.1.8
- bugfix thumbnail images not loading when thumbnailHoverEffect='scale120'
- bugfix Picasa/Google+ wrong thumbnail image URL on albums
- bugfix on Firefox with thumbnail lazy load: Picasa/Google+ wrong thumbnail image size on albums



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
