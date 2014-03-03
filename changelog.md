nanoGALLERY - jQuery plugin 
===========

ChangeLog
------


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


**See readme.md for usage details**

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

**See readme.md for usage details**

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
