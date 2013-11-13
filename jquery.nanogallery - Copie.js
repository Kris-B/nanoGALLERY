//
// nanoGALLERY for jQuery v3.3.0
// Plugin for jQuery by Christophe Brisbois
// http://www.brisbois.fr
// 
// External components:
//  - jQuery (http://www.jquery.com)
//  - fancybox (http://www.fancybox.net)
//


////////////////// MaxDisplayedItems 

(function( $ ) {
	$.fn.nanoGallery = function(options) {

		var settings = $.extend(true, {
			// default settings
			userID:'',
			kind:'',
			album:'',
			photoset:'',
			blackList:'',
			whiteList:'',
			albumList:'',
			topLabel:'home',
			displayBreadcrumb:true,
			displayCaption:true,
			displayCaptionFolder:true,
			displayCaptionImage:true,
			thumbnailWidth:230,
			thumbnailHeight:154,
			theme:'default',
			items:null,
			itemsBaseURL:'',
			maxItemsPerLine:0,
			maxWidth:0,
			viewer:'internal',
			colorScheme:'none',
			colorSchemeViewer:'none',
			//thumbnailEffect:null,
			//thumbnailEffect:'imageFlipVertical,borderLighter',
			thumbnailEffect:[{'name':'labelOpacity50','duration':300}],
			thumbnailLabelPosition:'overImageOnBottom',
			preset:'none'
		}, options );
		
		return this.each(function() {
			var nanoGALLERY_obj = new nanoGALLERY();
			nanoGALLERY_obj.Initiate(this,settings);
		});
	};
}( jQuery ));


function nanoGALLERY() {
 	var g_options=null;
	var g_baseControl=null;
	var g_containerParent=null;
	var g_containerDemo=null;
	var g_containerThumbnails=null;
	var g_containerBreadcrumb=null;
	var g_containerViewer=null;
	var g_containerViewerDisplayed=false;
	var g_containerThumbnailsDisplayed=false;
	var g_containerViewerCloseFloating=null;
	var g_containerViewerContent=null;
	var g_containerViewerToolbar=null;
	var g_path2timthumb="";
	var g_itemInfo=[];
	var g_oneThumbnailWidth=100;
	var g_oneThumbnailHeight=100;
	var g_blackList=null;
	var g_whiteList=null;
	var g_albumList=null;
	// ### Picasa/Google+
	// square format : 32, 48, 64, 72, 104, 144, 150, 160 (cropped)
	// details: https://developers.google.com/picasa-web/docs/2.0/reference
	var g_picasaThumbSize=64;
	var g_picasaThumbAvailableSizes=new Array(32, 48, 64, 72, 94, 104, 110, 128, 144, 150, 160, 200, 220, 288, 320, 400, 512, 576, 640, 720, 800, 912, 1024, 1152, 1280, 1440, 1600);
	// ### Flickr
	// Details: http://www.flickr.com/services/api/misc.urls.html
	var g_flickrThumbSize='s';
	var g_flickrThumbAvailableSizes=new Array(75,100,150,240,320,500,640,800,1024);
	var g_flickrThumbAvailableSizesStr=new Array('s','t','q','m','n','-','z','c','b');
	var g_flickrApiKey="2f0e634b471fdb47446abcb9c5afebdc";
	var g_viewerCurrentItem=0;
	
	var g_colorScheme_default = {
		breadcrumb : { background:'#000', border:'1px dotted #555', color:'#ccc', colorHover:'#fff' },
		thumbnail : { background:'#000', border:'1px solid #000', labelBackground:'#222', titleColor:'#eee', descriptionColor:'#ccc'},
	};
	var g_colorScheme_darkRed = {
		// #ffa3a3 #ff7373 #ff4040 #ff0000 #a60000
		breadcrumb : { background:'#a60000', border:'1px dotted #ff0000', color:'#ffa3a3', colorHover:'#ff4040' },
		thumbnail : { background:'#a60000', border:'1px solid #ff0000', labelBackground:'#860000', titleColor:'#ffa3a3', descriptionColor:'#ff7373'},
	};
	var g_colorScheme_darkGreen = {
		// #97e697 #67e667 #39e639 #00cc00 #008500
		breadcrumb : { background:'#008500', border:'1px dotted #00cc00', color:'#97e697', colorHover:'#39e639' },
		thumbnail : { background:'#008500', border:'1px solid #00cc00', labelBackground:'#006500', titleColor:'#97e697', descriptionColor:'#67e667'},
	};
	var g_colorScheme_darkBlue = {
		// #a0b0d7 #7080d7 #4a60d7 #162ea2 #071871
		breadcrumb : { background:'#071871', border:'1px dotted #162ea2', color:'#a0b0d7', colorHover:'#4a60d7' },
		thumbnail : { background:'#071871', border:'1px solid #162ea2', labelBackground:'#070851', titleColor:'#a0b0d7', descriptionColor:'#7080d7'},
	};
	var g_colorScheme_darkOrange = {
		// #ffd7b7 #ffd773 #ffc840 #ffb600 #a67600
		breadcrumb : { background:'#a67600', border:'1px dotted #ffb600', color:'#ffd7b7', colorHover:'#ffc840' },
		thumbnail : { background:'#a67600', border:'1px solid #ffb600', labelBackground:'#865600', titleColor:'#ffd7b7', descriptionColor:'#ffd773'},
	};
	var g_colorScheme_light = {
		breadcrumb : { background:'#ddd', border:'1px dotted #999', color:'#eee', colorHover:'#000' },
		thumbnail : { background:'#fff', border:'1px solid #fff', labelBackground:'#aaa', titleColor:'#eee', descriptionColor:'#ccc'},
	};


	var g_colorSchemeViewer_default = {
		background:'rgba(1, 1, 1, 0.75)', imageBorder:'12px solid #f8f8f8', imageBoxShadow:'#888 0px 0px 20px', barBackground:'#222', barBorder:'2px solid #111', barColor:'#eee', barDescriptionColor:'#aaa'
	};
	var g_colorSchemeViewer_darkRed = {
		// #ffa3a3 #ff7373 #ff4040 #ff0000 #a60000
		background:'rgba(1, 1, 1, 0.75)', imageBorder:'12px solid #ffa3a3', imageBoxShadow:'#ff0000 0px 0px 20px', barBackground:'#a60000', barBorder:'2px solid #111', barColor:'#ffa3a3', barDescriptionColor:'#ff7373'
	};
	var g_colorSchemeViewer_darkGreen = {
		// #97e697 #67e667 #39e639 #00cc00 #008500
		background:'rgba(1, 1, 1, 0.75)', imageBorder:'12px solid #97e697', imageBoxShadow:'#00cc00 0px 0px 20px', barBackground:'#008500', barBorder:'2px solid #111', barColor:'#97e697', barDescriptionColor:'#67e667'
	};
	var g_colorSchemeViewer_darkBlue = {
		// #a0b0d7 #7080d7 #4a60d7 #162ea2 #071871
		background:'rgba(1, 1, 1, 0.75)', imageBorder:'12px solid #a0b0d7', imageBoxShadow:'#162ea2 0px 0px 20px', barBackground:'#071871', barBorder:'2px solid #111', barColor:'#a0b0d7', barDescriptionColor:'#7080d7'
	};
	var g_colorSchemeViewer_darkOrange = {
		// #ffd7b7 #ffd773 #ffc840 #ffb600 #a67600
		background:'rgba(1, 1, 1, 0.75)', imageBorder:'12px solid #ffd7b7', imageBoxShadow:'#ffb600 0px 0px 20px', barBackground:'#a67600', barBorder:'2px solid #111', barColor:'#ffd7b7', barDescriptionColor:'#ffd773'
	};
	var g_colorSchemeViewer_light = {
		background:'rgba(1, 1, 1, 0.75)', imageBorder:'12px solid #f8f8f8', imageBoxShadow:'#888 0px 0px 20px', barBackground:'#222', barBorder:'2px solid #111', barColor:'#eee', barDescriptionColor:'#aaa'
	};

	
	var g_oldBorderColor=0;
	var g_oldLabelOpacity=1;
	var g_ThumbnailEffect=[];
	
	
	this.Initiate=function(element, params) {
		"use strict";
		g_options=params;
		g_baseControl=element;
		
		if( g_options.blackList !='' ) { g_blackList=g_options.blackList.toUpperCase().split('|'); }
		if( g_options.whiteList !='' ) { g_whiteList=g_options.whiteList.toUpperCase().split('|'); }
		if( g_options.albumList !='' ) { g_albumList=g_options.albumList.toUpperCase().split('|'); }
		jQuery(element).addClass('nanogallery_theme_'+g_options.theme);
		SetColorScheme(element);
		SetColorSchemeViewer(element);


		
		if( g_options.photoset !== undefined ) {
			if( g_options.photoset.length > 0) { g_options.displayBreadcrumb=false; }
		}
		else { g_options.photoset=''; }
		if( g_options.album !== undefined ) {
			if( g_options.album.length > 0 ) { g_options.displayBreadcrumb=false; }
		}
		else { g_options.album=''; }

		if( g_options.maxWidth > 0 ) { 
			jQuery(element).css('maxWidth',+g_options.maxWidth);
			jQuery(element).css('margin-left','auto');
			jQuery(element).css('margin-right','auto');
		}
	

		//g_containerDemo =jQuery('<div class="nanoGalleryDemo"></div>').appendTo(element);
		//buildDemoPanel();


		if( g_options.displayBreadcrumb == true && ( g_options.kind=='picasa' || g_options.kind=='flickr')) {
			g_containerBreadcrumb =jQuery('<div class="nanoGalleryBreadcrumb"></div>').appendTo(element);
		}
		g_containerParent=jQuery('<div class="nanoGalleryContainerParent"></div>').appendTo(element);
		g_containerThumbnails=jQuery('<div class="nanoGalleryContainer"></div>').appendTo(g_containerParent);

		

		g_path2timthumb = ""; //timthumbFolder;

		// thumbnails effects
		// easing : jQuery supports only 'swing' and 'linear'
		switch( toType(g_options.thumbnailEffect) ) {
			case 'string':
				var tmp=g_options.thumbnailEffect.split(',');
				for(var i=0; i<tmp.length; i++) {
					g_ThumbnailEffect.push({'name':tmp[i],'duration':200,'durationBack':200,'easing':'swing','easingBack':'swing'});
				}
				break;
			case 'object':
				if( g_options.thumbnailEffect.name != undefined ) {
					g_ThumbnailEffect.push(jQuery.extend({'duration':200,'durationBack':150,'easing':'swing','easingBack':'swing'},g_options.thumbnailEffect));
				}
				break;
			case 'array':
				for(var i=0; i<g_options.thumbnailEffect.length; i++) {
					if( g_options.thumbnailEffect[i].name != undefined ) {
						g_ThumbnailEffect.push(jQuery.extend({'duration':200,'durationBack':150,'easing':'swing','easingBack':'swing'},g_options.thumbnailEffect[i]));
					}
				}
				break;
			case 'null':
				break;
			default:
				alert('nanoGALLERY: incorrect parameter for "thumbnailEffect".');
		}
		// check consistency
		for( var i=0; i<g_ThumbnailEffect.length; i++) {
			switch(g_ThumbnailEffect[i].name ) {
				case 'slideUp':
				case 'slideDown':
				case 'slideLeft':
				case 'slideRight':
				case 'imageSlideUp':
				case 'imageSlideDown':
				case 'imageSlideLeft':
				case 'imageSlideRight':
				case 'labelAppear':
				case 'labelAppear75':
				case 'labelSlideDown':
				case 'labelSlideUp':
				case 'labelOpacity50':
				case 'imageScale150':
				case 'imageScale150Outside':
				case 'scale120':
				case 'borderLighter':
				case 'borderDarker':
					break;

				case 'imageFlipHorizontal':
				case 'imageFlipVertical':
				//case 'flipHorizontal':
				//case 'flipVertical':
				case 'rotateCornerBR':
				case 'rotateCornerBL':
				case 'imageRotateCornerBR':
				case 'imageRotateCornerBL':
					if (!jQuery.support.transition) {
						alert('nanoGALLERY: the parameter "'+g_ThumbnailEffect[i].name+'" for "thumbnailEffect" requires the additional jQuery plugin "Transit".');
					}
					break;
				default:
					alert('nanoGALLERY: unknow parameter "'+g_ThumbnailEffect[i].name+'" for "thumbnailEffect".');
					break;
			}
		}
		
		var si=0;
		if( g_options.thumbnailWidth > g_options.thumbnailHeight ) { si=g_options.thumbnailWidth; }
		else { si=g_options.thumbnailHeight; }

		switch(g_options.kind) {
			case '':
				if( g_options.itemsBaseURL.length >0 ) {g_options.itemsBaseURL+='/';}
				if( g_options.items !== undefined && g_options.items !== null ) {
					ProcessItemOption();
				}
				else {
					var elements=jQuery(element).children('a');
					if( elements.length > 0 )
						ProcessHREF(elements);
					else
						alert('nanoGALLERY - error: no image to process.');
				}
				break;
			
			case 'getsimple':
				return;
				var url=params.pluginURL+'/nanogallery_getitems.php';
				alert(url);
				//$.getJSON(url+'/nanogallery_getitems.php', {limit: 1}, function(data) {
				//$.getJSON(url+'/nanogallery_getitems.php', function(data) {
				jQuery.ajaxSetup({ cache: false });
				jQuery.support.cors = true;
				jQuery.getJSON(url, function(data) {
					alert("ok");
					// data is now an array with all the images
					$.each(data, function(i) {
						alert(data[i]);
						// do something with each image
						// data[i] will have the image path
					});
				});
				alert("done");
				break;
				
			case 'flickr':
				for( i=0; i<g_flickrThumbAvailableSizes.length; i++) {
					g_flickrThumbSize=g_flickrThumbAvailableSizesStr[i];
					if( si < g_flickrThumbAvailableSizes[i] ) {
						break;
					}
				}
				FlickrGetItems(g_options.photoset,g_options.topLabel);
				break;
			case 'picasa':
			default:
				for(var i=0; i<g_picasaThumbAvailableSizes.length; i++) {
					g_picasaThumbSize=g_picasaThumbAvailableSizes[i];
					if( si < g_picasaThumbAvailableSizes[i] ) {
						break;
					}
				}
				PicasaGetItems(g_options.album,g_options.topLabel);
				break;
		}
		
		jQuery(window).resize(function() { 
			RePositionElements() ;
			//SetContainerWidth(); 
		});

		
	};
	
	// ##### LIST OF ITEMS IN OPTIONS #####
	function ProcessItemOption() {
		g_itemInfo.length=0;

		jQuery.each(g_options.items, function(i,item){
			var newObj=new Array(5);
			newObj.title=item.title;
			if( item.srct !== undefined && item.srct.length>0 ) {
				newObj.thumbsrc=g_options.itemsBaseURL+item.srct;
			}
			else {
				newObj.thumbsrc=g_options.itemsBaseURL+item.src;
			}
			newObj.src=g_options.itemsBaseURL+item.src;
			if( toType(item.description) == 'string' ) {
				newObj.description=item.description;
			}
			else {
				newObj.description='';	//'&nbsp;';
			}
			if( item.destURL !== undefined && item.destURL.length>0 ) {
				newObj.destinationURL=item.destURL;
			}
			else {
				newObj.destinationURL='';
			}
			newObj.kind='image';

			g_itemInfo.push(newObj);
		});
		
		renderGallery();
	};

	// ##### LIST OF HREF ATTRIBUTES #####
	function ProcessHREF(elements) {
		g_itemInfo.length=0;

		jQuery.each(elements, function(i,item){
			var newObj=new Array(5);
			newObj.title=jQuery(item).text();
			if( jQuery(item).attr('data-ngthumb') !== undefined && jQuery(item).attr('data-ngthumb').length>0 ) {
				newObj.thumbsrc=g_options.itemsBaseURL+jQuery(item).attr('data-ngthumb');
			}
			else {
				newObj.thumbsrc=g_options.itemsBaseURL+jQuery(item).attr('href');
			}
			newObj.src=g_options.itemsBaseURL+jQuery(item).attr('href');
			newObj.description=jQuery(item).attr('data-ngdesc');
			if( jQuery(item).attr('data-ngdesc') !== undefined && jQuery(item).attr('data-ngdesc').length>0 ) {
				newObj.description=jQuery(item).attr('data-ngdesc');
			}
			else {
				newObj.description='';
			}
			if( jQuery(item).attr('data-ngdest') !== undefined && jQuery(item).attr('data-ngdest').length>0 ) {
				newObj.destURL=jQuery(item).attr('data-ngdest');
			}
			else {
				newObj.destURL='';
			}
			newObj.kind='image';
			g_itemInfo.push(newObj);
		});
		
		jQuery.each(elements, function(i,item){
			jQuery(item).remove();
		});
		
		renderGallery();
	};

	
	// ##### FLICKR STORAGE #####
	function FlickrGetItems( itemID, albumLabel ) {
		var obj=null;

		// breadcrumb
		if( g_options.displayBreadcrumb == true ) {
			if( albumLabel != "" ) {
				if( jQuery(g_containerBreadcrumb).children().length > 0 ) {
					jQuery('<div class="separator"></div>').appendTo(g_containerBreadcrumb);
				}
				var newDiv =jQuery('<div class="folder">'+albumLabel+'</div>').appendTo(g_containerBreadcrumb);
				jQuery(newDiv).data("path",itemID);
				newDiv.click(function() {
					var folder=jQuery(this).data("path");
					jQuery(this).nextAll().remove();
					FlickrGetItems(folder,'');
				});;
			}
		}
		
		//jQuery(g_containerThumbnails).children().remove();

		// RETRIEVE PHOTOSETS
		if( itemID == '' ) {
			var url = "http://api.flickr.com/services/rest/?&method=flickr.photosets.getList&api_key=" + g_flickrApiKey + "&user_id="+g_options.userID+"&format=json&jsoncallback=?";
			kind='album';

			// get the content and display it
			jQuery.ajaxSetup({ cache: false });
			jQuery.support.cors = true;
			//jQuery.getJSON(url, function(data) {
			//})
			//.fail( function(jqxhr, textStatus, error) {
			//	var err = textStatus + ', ' + error;
			//	alert("Error with Flickr2: " + err);
			//});

			$.jsonp({
				"url": url,
				"success": function(data) {
					g_itemInfo.length=0;
					var ok=true;
					if( data.stat !== undefined ) {
						if( data.stat === 'fail' ) {
							alert("nanoGALLERY - Could not retrieve Flickr photoset list: " + data.message + " (code: "+data.code+").");
							ok=false;
						}
					}
					
					if( ok ) {
						jQuery.each(data.photosets.photoset, function(i,item){
							//Get the title 
							itemTitle = item.title._content;
							itemID=item.id;
							//Get the description
							itemDescription='';
							if (item.description._content != undefined)
								itemDescription=item.description._content;
							itemThumbURL = "http://farm" + item.farm + ".staticflickr.com/" + item.server + "/" + item.primary + "_" + item.secret + "_"+g_flickrThumbSize+".jpg";
							imgUrl=''
							itemKind=kind;

							if( CheckAlbumName(itemTitle) ) {
								newObj=new Array(5);
								newObj.title=itemTitle;
								newObj.thumbsrc=itemThumbURL;
								newObj.src=itemID;
								newObj.description=itemDescription;
								newObj.destinationURL='';
								newObj.kind=itemKind;
								g_itemInfo.push(newObj);
							}
						});
						
						renderGallery();
					}
				},
				"error": function(xOptions,textStatus) {
					alert("nanoGALLERY - Could not retrieve Flickr photoset list: "+textStatus);
				}
			});
			
		}
		// RETRIEVE PHOTOS
		else {
			var url = "http://api.flickr.com/services/rest/?&method=flickr.photosets.getPhotos&api_key=" + g_flickrApiKey + "&photoset_id="+itemID+"&extras=description,views,url_s,url_o,url_m&format=json&jsoncallback=?";
			kind='photo';

			// get the content and display it
			jQuery.ajaxSetup({ cache: false });
			jQuery.support.cors = true;
			//jQuery.getJSON(url, function(data) {
			//})
			//.fail( function(jqxhr, textStatus, error) {
			//	var err = textStatus + ', ' + error;
			//	alert("Error with Flickr2: " + err);
			//});

			$.jsonp({
				"url": url,
				"success": function(data) {
					g_itemInfo.length=0;

					jQuery.each(data.photoset.photo, function(i,item){
						//Get the title 
						itemTitle = item.title;		//._content;
						itemID=item.id;
						//Get the description
						itemDescription=item.description._content;
						itemThumbURL = "http://farm" + item.farm + ".staticflickr.com/" + item.server + "/" + item.id +"_" + item.secret + "_"+g_flickrThumbSize+".jpg";
						imgUrl = "http://farm" + item.farm + ".staticflickr.com/" + item.server + "/" + item.id + "_" + item.secret + "_o.jpg";
						itemKind=kind;
						
						var newObj=new Array(5);
						newObj.title=itemTitle;
						newObj.thumbsrc=itemThumbURL;
						newObj.src=item.url_o;			//imgUrl;
						newObj.description=itemDescription;
						newObj.destinationURL='';
						newObj.kind=itemKind;
						g_itemInfo.push(newObj);
						
					});
					renderGallery();
				},
				"error": function(xOptions,textStatus) {
					alert("nanoGALLERY - Could not retrieve Flickr photo list: "+textStatus);
				}
			});

		}
	};


	// ##### PICASA STORAGE #####
	function PicasaGetItems( itemID, albumLabel ) {
		var kind='';
		//jQuery(g_containerThumbnails).children().remove();
		//RemoveItems();
		if( itemID == '' ) {
			var url = 'http://picasaweb.google.com/data/feed/api/user/'+g_options.userID+'?alt=json&kind=album&thumbsize='+g_picasaThumbSize;
			kind='album';
		}
		else {
			var url = 'http://picasaweb.google.com/data/feed/api/user/'+g_options.userID+'/albumid/'+itemID+'?alt=json&kind=photo&thumbsize='+g_picasaThumbSize+'&imgmax=d';
			kind='photo';
		}

		// breadcrumb
		if( g_options.displayBreadcrumb == true ) {
			if( albumLabel != "" ) {
				if( jQuery(g_containerBreadcrumb).children().length > 0 ) {
					jQuery('<div class="separator"></div>').appendTo(g_containerBreadcrumb);
				}
				var newDiv =jQuery('<div class="folder">'+albumLabel+'</div>').appendTo(g_containerBreadcrumb);
				jQuery(newDiv).data("path",itemID);
				newDiv.click(function() {
					var folder=jQuery(this).data("path");
					jQuery(this).nextAll().remove();
					PicasaGetItems(folder,'');
				});;
			}
		}
		
		// get the content and display it
		jQuery.ajaxSetup({ cache: false });
		jQuery.support.cors = true;
		url = url + "&callback=?";

		//jQuery.getJSON(url, function(data) {
		//		})
		//.fail( function(jqxhr, textStatus, error) {
		//	var err = textStatus + ', ' + error;
		//	alert("Error with Picasa: " + err);
		//});

		$.jsonp({
			"url": url,	//+"?callback=?",
			"success": function(data) {
				g_itemInfo.length=0;
				
				jQuery.each(data.feed.entry, function(i,data){
					//Get the title 
					itemTitle = data.media$group.media$title.$t;
					//Get the URL of the thumbnail
					itemThumbURL = data.media$group.media$thumbnail[0].url;
					//Get the ID 
					itemID = data.id.$t;
					itemID = itemID.split('/')[9].split('?')[0];
					//Get the description
					itemDescription = data.media$group.media$description.$t;
					if( kind == 'photo') { 
						itemTitle=itemDescription;
						itemDescription='';
					}
					
					imgUrl=data.media$group.media$content[0].url
					itemKind=kind;

					var ok=true;
					if( kind == 'album' ) {
						if( !CheckAlbumName(itemTitle) ) { ok=false; }
					}
					
					if( ok ) {
						newObj=new Array(5);
						newObj.title=itemTitle;
						newObj.thumbsrc=itemThumbURL;
						if( kind == 'album' ) 
							newObj.src=itemID;
						else
							newObj.src=imgUrl;
						newObj.description=itemDescription;
						newObj.destinationURL='';
						newObj.kind=itemKind;
						g_itemInfo.push(newObj);
					}
					
				});
					
				renderGallery();
			},
			"error": function(xOptions,textStatus) {
				alert("nanoGALLERY - Could not retrieve Picasa/Google+ data: "+textStatus);
			}
		});
		
	

	};


	// ##### REPOSITION ITEMS ON SCREEN RESIZE EVENT
	function RePositionElements() {
		if( g_containerThumbnailsDisplayed ) {
			SetTumbnailsContainerWidth();
			SetTumbnailsContainerHeight();
		}
		if( g_containerViewerDisplayed ) {
			ResizeInternalViewer();
		}
	};
	
	function CheckAlbumName(title) {
		var s=title.toUpperCase();

		if( g_albumList !== null ) {
			for( var j=0; j<g_albumList.length; j++) {
				if( s == g_albumList[j].toUpperCase() ) {
					return true;
				}
			}
		}
		else {
			var found=false;
			if( g_whiteList !== null ) {
				//whiteList : authorize only album cointaining one of the specified keyword in the title
				for( var j=0; j<g_whiteList.length; j++) {
					if( s.indexOf(g_whiteList[j]) !== -1 ) {
						found=true;
					}
				}
				if( !found ) { return false; }
			}


			if( g_blackList !== null ) {
				//blackList : ignore album cointaining one of the specified keyword in the title
				for( var j=0; j<g_blackList.length; j++) {
					if( s.indexOf(g_blackList[j]) !== -1 ) { 
						return false;
					}
				}
			}
			
			return true;
		}
	};
	

	// ##### DISPLAY THE GALLERY #####
	function renderGallery() {
		var elt=jQuery(g_containerThumbnails).parent();
		jQuery(g_containerThumbnails).animate({'max-height': '0'}, 200);
		jQuery(elt).animate({opacity: 0},100).promise().done(function(){
			g_containerThumbnailsDisplayed=false;
			jQuery(g_containerThumbnails).children().remove();
			jQuery(elt).css('opacity','1');
			renderGallery2();
		});
	
	};
	
	function renderGallery2() {
		var w=0;
		var h=0;
		
		// if one description is defined then put a value to those without
		var foundDesc=false;
		if( g_options.thumbnailLabelPosition == 'onBottom'  ) {
			jQuery.each(g_itemInfo, function(i,item){
				if( item.description.length > 0 ) { foundDesc=true; }
			});
		}
		
		jQuery.each(g_itemInfo, function(i,item){
			
			var newDivTemp =jQuery('<div class="container"></div>');	
			var newDivTemp1 =jQuery('<div class="subcontainer"></div>');	
			//jQuery(newDivTemp1).append('<div class="imgContainer" style="width:'+g_options.thumbnailWidth+'px;height:'+g_options.thumbnailHeight+'px;"><img class="image" src="'+item['thumbsrc']+'" style="max-width:'+g_options.thumbnailWidth+'px;max-height:'+g_options.thumbnailHeight+'px;"></div>');
			var newImg=jQuery('<div class="imgContainer" style="width:'+g_options.thumbnailWidth+'px;height:'+g_options.thumbnailHeight+'px;"><img class="image" src="'+item['thumbsrc']+'" style="max-width:'+g_options.thumbnailWidth+'px;max-height:'+g_options.thumbnailHeight+'px;"></div>');
			jQuery(newDivTemp1).append(newImg);
			if( item['kind'] == 'album' ) {
				// album
				if( g_options.displayCaption == true && g_options.displayCaptionFolder == true ) {
					jQuery(newDivTemp1).append('<div class="iconInfo"></div>');
					var newLabel=jQuery(newDivTemp1).append('<div class="labelImage" style="width:'+g_options.thumbnailWidth+'px;max-height:'+g_options.thumbnailHeight+'px;"><div class="labelFolderTitle">'+item.title+'</div><div class="labelDescription">'+item.description+'</div></div>');
					jQuery(newDivTemp1).append(newLabel);
				}
			}
			else {
				// image
				var s=item.title;
				if( g_options.displayCaption == true && g_options.displayCaptionImage == true ) {
					if( s === undefined || s.length == 0 ) { s='&nbsp;'; }
					var desc=item.description;
					if( foundDesc && desc.length == 0 && g_options.thumbnailLabelPosition == 'onBottom' ) { desc='&nbsp;'; }
					var newLabel=jQuery('<div class="labelImage" style="width:'+g_options.thumbnailWidth+'px;max-height:'+g_options.thumbnailHeight+'px;"><div class="labelImageTitle">'+s+'</div><div class="labelDescription">'+desc+'</div></div>');
					jQuery(newDivTemp1).append(newLabel);
				}
			}
			jQuery(newDivTemp).append(newDivTemp1);	
			jQuery(newDivTemp).css('opacity','0');
			var newDiv =jQuery(newDivTemp).appendTo(g_containerThumbnails); //.animate({ opacity: 1},1000, 'swing');	//.show('slow'); //.fadeIn('slow').slideDown('slow');
			

			
			switch( g_options.thumbnailLabelPosition ){
				case 'onBottom':
					jQuery(newDiv).find('.labelImage').css('top','0');
					jQuery(newDiv).find('.labelImage').css('position','relative');
					jQuery(newDiv).find('.labelImageTitle').css('white-space','nowrap');
					jQuery(newDiv).find('.labelImageFolder').css('white-space','nowrap');
					jQuery(newDiv).find('.labelDescription').css('white-space','nowrap');
					break;
				case 'overImageOnTop':
					jQuery(newDiv).find('.labelImage').css('top','0');
					break;
				case 'overImageOnBottom':
				default :
					g_options.thumbnailLabelPosition='overImageOnBottom';
					jQuery(newDiv).find('.labelImage').css('bottom','0');
					break;
			}
			
			// CSS init depending on choosen effect
			for( j=0; j<g_ThumbnailEffect.length; j++) {
				var useTransitPlugin = false;
				switch(g_ThumbnailEffect[j].name ) {
					case 'rotateCornerBL':
						if( g_options.thumbnailLabelPosition == 'overImageOnTop' || g_options.thumbnailLabelPosition == 'overImageOnBottom' ) {
							jQuery(newDiv).css('overflow','hidden');
							jQuery(newDiv).find('.labelImage').css('opacity','1').css({ rotate: '-90deg', 'transform-origin': '100% 100%' });
							jQuery(newDiv).find('.imgContainer').css({ rotate: '0', 'transform-origin': '100% 100%' });
							useTransitPlugin=true;
						}
						break;
					case 'rotateCornerBR':
						if( g_options.thumbnailLabelPosition == 'overImageOnTop' || g_options.thumbnailLabelPosition == 'overImageOnBottom' ) {
							jQuery(newDiv).css('overflow','hidden');
							jQuery(newDiv).find('.labelImage').css('opacity','1').css({ rotate: '90deg', 'transform-origin': '0% 100%' });
							jQuery(newDiv).find('.imgContainer').css({ rotate: '0', 'transform-origin': '0 100%' });
							useTransitPlugin=true;
						}
						break;
					case 'imageRotateCornerBL':
						if( g_options.thumbnailLabelPosition == 'overImageOnTop' || g_options.thumbnailLabelPosition == 'overImageOnBottom' ) {
							setElementOnTop(newDiv, jQuery(newDiv).find('.imgContainer'));
							jQuery(newDiv).css('overflow','hidden');
							jQuery(newDiv).find('.labelImage').css('opacity','1');
							jQuery(newDiv).find('.imgContainer').css({ rotate: '0', 'transform-origin': '100% 100%' });
							useTransitPlugin=true;
						}
						break;
					case 'imageRotateCornerBR':
						if( g_options.thumbnailLabelPosition == 'overImageOnTop' || g_options.thumbnailLabelPosition == 'overImageOnBottom' ) {
							setElementOnTop(newDiv, jQuery(newDiv).find('.imgContainer'));
							jQuery(newDiv).css('overflow','hidden');
							jQuery(newDiv).find('.labelImage').css('opacity','1');
							jQuery(newDiv).find('.imgContainer').css({ rotate: '0', 'transform-origin': '0 100%' });
							useTransitPlugin=true;
						}
						break;
					case 'slideUp':
						if( g_options.thumbnailLabelPosition == 'overImageOnTop' || g_options.thumbnailLabelPosition == 'overImageOnBottom' ) {
							jQuery(newDiv).css('overflow','hidden');
							jQuery(newDiv).find('.labelImage').css('opacity','1').css('top','100%');
						}
						break;
					case 'slideDown':
						if( g_options.thumbnailLabelPosition == 'overImageOnTop' || g_options.thumbnailLabelPosition == 'overImageOnBottom' ) {
							jQuery(newDiv).css('overflow','hidden');
							jQuery(newDiv).find('.labelImage').css('opacity','1').css('top','-100%');
						}
						break;
					case 'slideRight':
						if( g_options.thumbnailLabelPosition == 'overImageOnTop' || g_options.thumbnailLabelPosition == 'overImageOnBottom' ) {
							jQuery(newDiv).css('overflow','hidden');
							jQuery(newDiv).find('.labelImage').css('opacity','1').css('left','-100%');
						}
						break;
					case 'slideLeft':
						if( g_options.thumbnailLabelPosition == 'overImageOnTop' || g_options.thumbnailLabelPosition == 'overImageOnBottom' ) {
							jQuery(newDiv).css('overflow','hidden');
							jQuery(newDiv).find('.labelImage').css('opacity','1').css('left','100%');
						}
						break;
					case 'imageSlideUp':
					case 'imageSlideDown':
					case 'imageSlideRight':
					case 'imageSlideLeft':
						if( g_options.thumbnailLabelPosition == 'overImageOnTop' || g_options.thumbnailLabelPosition == 'overImageOnBottom' ) {
							setElementOnTop(newDiv, jQuery(newDiv).find('.imgContainer'));
							jQuery(newDiv).css('overflow','hidden');
							jQuery(newDiv).find('.labelImage').css('opacity','1');
						}
						break;
					case 'labelAppear':
					case 'labelAppear75':
						if( g_options.thumbnailLabelPosition == 'overImageOnTop' || g_options.thumbnailLabelPosition == 'overImageOnBottom' ) {
							jQuery(newDiv).find('.labelImage').css('opacity','0');
						}
						break;
					case 'labelSlideUp':
						if( g_options.thumbnailLabelPosition == 'overImageOnTop' || g_options.thumbnailLabelPosition == 'overImageOnBottom' ) {
							jQuery(newDiv).css('overflow','hidden');
							jQuery(newDiv).find('.labelImage').css('bottom','-100%');
							jQuery(newDiv).find('.labelImage').css('top','none');
						}
						break;
					case 'labelSlideDown':
						if( g_options.thumbnailLabelPosition == 'overImageOnTop' || g_options.thumbnailLabelPosition == 'overImageOnBottom' ) {
							jQuery(newDiv).css('overflow','hidden');
							jQuery(newDiv).find('.labelImage').css('top','-100%');
							jQuery(newDiv).find('.labelImage').css('bottom','none');
						}
						break;
					case 'imageFlipHorizontal':
						var n= Math.round(jQuery(newDiv).outerHeight(true)*1.2) + 'px';
						jQuery(newDiv).find('.labelImage').css({ perspective: n, rotateX: '180deg', 'backface-visibility': 'hidden', 'opacity':'1', 'height':'100%' });
						useTransitPlugin=true;
						break;
					case 'imageFlipVertical':
						var n= Math.round(jQuery(newDiv).outerHeight(true)*1.2) + 'px';
						jQuery(newDiv).find('.labelImage').css({ perspective: n, rotateY: '180deg', 'backface-visibility': 'hidden', 'opacity':'1', 'height':'100%' });
						useTransitPlugin=true;
						break;
					case 'flipHorizontal':
						var n= Math.round(jQuery(newDiv).outerHeight(true)*1.2) + 'px';
						jQuery(newDiv).find('.labelImage').css({ perspective: n, rotateX: '180deg', 'backface-visibility': 'hidden', 'opacity':'1', 'height':'100%' });
						useTransitPlugin=true;
						break;
					case 'flipVertical':
						var n= Math.round(jQuery(newDiv).outerHeight(true)*1.2) + 'px';
						jQuery(newDiv).find('.labelImage').css({ perspective: n, rotateY: '180deg', 'backface-visibility': 'hidden', 'opacity':'1', 'height':'100%' });
						useTransitPlugin=true;
						break;
					case 'borderLighter':
					case 'borderDarker':
						//useTransitPlugin=true;
						break;
					case 'imageScale150':
						jQuery(newDiv).css('overflow','hidden');
						break;

				}
				if( jQuery.support.transition ) { useTransitPlugin = true; }
				if( useTransitPlugin ) {
					if( g_ThumbnailEffect[j].easing == 'swing' ) { g_ThumbnailEffect[j].easing = 'ease'; }
					if( g_ThumbnailEffect[j].easingBack == 'swing' ) { g_ThumbnailEffect[j].easingBack = 'ease'; }
				}

			}

			if( w == 0 ) { w=jQuery(newDiv).outerWidth(true); }
			if( h == 0 ) { h=jQuery(newDiv).outerHeight(true); }
			jQuery(newDiv).data("index",i);

			
			// backup values used in animations/transitions
			g_oldBorderColor=jQuery(newDiv).css('border-color');
			g_oldLabelOpacity=jQuery(newDiv).find('.labelImage').css('opacity');
			
			
			
			jQuery(newDiv).hover(
				function() {
					//if( jQueryMinVersion('1.9') ) { jQuery(this).find('*').finish(); }
					jQuery(this).find('*').stop();
					try {
						for( j=0; j<g_ThumbnailEffect.length; j++) {
							switch(g_ThumbnailEffect[j].name ) {
								case 'rotateCornerBL':
									if( g_options.thumbnailLabelPosition == 'overImageOnTop' || g_options.thumbnailLabelPosition == 'overImageOnBottom' ) {
										jQuery(this).find('.labelImage').transition({ rotate: '0deg'},g_ThumbnailEffect[j].duration, g_ThumbnailEffect[j].easing);
										jQuery(this).find('.imgContainer').transition({ rotate: '90deg'},g_ThumbnailEffect[j].duration, g_ThumbnailEffect[j].easing);
									}
									break;
								case 'rotateCornerBR':
									if( g_options.thumbnailLabelPosition == 'overImageOnTop' || g_options.thumbnailLabelPosition == 'overImageOnBottom' ) {
										jQuery(this).find('.labelImage').transition({ rotate: '0deg'},g_ThumbnailEffect[j].duration, g_ThumbnailEffect[j].easing);
										jQuery(this).find('.imgContainer').transition({ rotate: '-90deg'},g_ThumbnailEffect[j].duration, g_ThumbnailEffect[j].easing);
									}
									break;
								case 'imageRotateCornerBL':
									if( g_options.thumbnailLabelPosition == 'overImageOnTop' || g_options.thumbnailLabelPosition == 'overImageOnBottom' ) {
										jQuery(this).find('.imgContainer').transition({ rotate: '90deg'},g_ThumbnailEffect[j].duration, g_ThumbnailEffect[j].easing);
									}
									break;
								case 'imageRotateCornerBR':
									if( g_options.thumbnailLabelPosition == 'overImageOnTop' || g_options.thumbnailLabelPosition == 'overImageOnBottom' ) {
										jQuery(this).find('.imgContainer').transition({ rotate: '-90deg'},g_ThumbnailEffect[j].duration, g_ThumbnailEffect[j].easing);
									}
									break;
								case 'slideUp':
									if( g_options.thumbnailLabelPosition == 'overImageOnTop' || g_options.thumbnailLabelPosition == 'overImageOnBottom' ) {
										var n= '-' + jQuery(this).outerHeight(true) + 'px';
										if( jQuery.support.transition ) {
											jQuery(this).find('.imgContainer').transition({ 'top': n},g_ThumbnailEffect[j].duration, g_ThumbnailEffect[j].easing);
											jQuery(this).find('.labelImage').transition({ 'top': 0},g_ThumbnailEffect[j].duration, g_ThumbnailEffect[j].easing);
										}
										else {
											jQuery(this).find('.imgContainer').animate({ 'top': n},g_ThumbnailEffect[j].duration, g_ThumbnailEffect[j].easing);
											jQuery(this).find('.labelImage').animate({ 'top': 0},g_ThumbnailEffect[j].duration, g_ThumbnailEffect[j].easing);
										}
									}
									break;
								case 'slideDown':
									if( g_options.thumbnailLabelPosition == 'overImageOnTop' || g_options.thumbnailLabelPosition == 'overImageOnBottom' ) {
										var n= jQuery(this).outerHeight(true) + 'px';
										if( jQuery.support.transition ) {
											jQuery(this).find('.imgContainer').transition({ 'top': n},g_ThumbnailEffect[j].duration, g_ThumbnailEffect[j].easing);
											jQuery(this).find('.labelImage').transition({ 'top': 0},g_ThumbnailEffect[j].duration, g_ThumbnailEffect[j].easing);
										}
										else {
											jQuery(this).find('.imgContainer').animate({ 'top': n},g_ThumbnailEffect[j].duration, g_ThumbnailEffect[j].easing);
											jQuery(this).find('.labelImage').animate({ 'top': 0},g_ThumbnailEffect[j].duration, g_ThumbnailEffect[j].easing);
										}
									}
									break;
								case 'slideRight':
									if( g_options.thumbnailLabelPosition == 'overImageOnTop' || g_options.thumbnailLabelPosition == 'overImageOnBottom' ) {
										var n= jQuery(this).outerHeight(true) + 'px';
										if( jQuery.support.transition ) {
											jQuery(this).find('.imgContainer').transition({ 'left': n},g_ThumbnailEffect[j].duration, g_ThumbnailEffect[j].easing);
											jQuery(this).find('.labelImage').transition({ 'left': 0},g_ThumbnailEffect[j].duration, g_ThumbnailEffect[j].easing);
										}
										else {
											jQuery(this).find('.imgContainer').animate({ 'left': n},g_ThumbnailEffect[j].duration, g_ThumbnailEffect[j].easing);
											jQuery(this).find('.labelImage').animate({ 'left': 0},g_ThumbnailEffect[j].duration, g_ThumbnailEffect[j].easing);
										}
									}
									break;
								case 'slideLeft':
									if( g_options.thumbnailLabelPosition == 'overImageOnTop' || g_options.thumbnailLabelPosition == 'overImageOnBottom' ) {
										var n= '-'+jQuery(this).outerHeight(true) + 'px';
										if( jQuery.support.transition ) {
											jQuery(this).find('.imgContainer').transition({ 'left': n},g_ThumbnailEffect[j].duration, g_ThumbnailEffect[j].easing);
											jQuery(this).find('.labelImage').transition({ 'left': 0},g_ThumbnailEffect[j].duration, g_ThumbnailEffect[j].easing);
										}
										else {
											jQuery(this).find('.imgContainer').animate({ 'left': n},g_ThumbnailEffect[j].duration, g_ThumbnailEffect[j].easing);
											jQuery(this).find('.labelImage').animate({ 'left': 0},g_ThumbnailEffect[j].duration, g_ThumbnailEffect[j].easing);
										}
									}
									break;
								case 'imageSlideUp':
									if( g_options.thumbnailLabelPosition == 'overImageOnTop' || g_options.thumbnailLabelPosition == 'overImageOnBottom' ) {
										var n= '-' + jQuery(this).outerHeight(true) + 'px';
										if( jQuery.support.transition ) {
											jQuery(this).find('.imgContainer').transition({ 'top': n},g_ThumbnailEffect[j].duration, g_ThumbnailEffect[j].easing);
										}
										else {
											jQuery(this).find('.imgContainer').animate({ 'top': n},g_ThumbnailEffect[j].duration, g_ThumbnailEffect[j].easing);
										}
									}
									break;
								case 'imageSlideDown':
									if( g_options.thumbnailLabelPosition == 'overImageOnTop' || g_options.thumbnailLabelPosition == 'overImageOnBottom' ) {
										var n= jQuery(this).outerHeight(true) + 'px';
										if( jQuery.support.transition ) {
											jQuery(this).find('.imgContainer').transition({ 'top': n},g_ThumbnailEffect[j].duration, g_ThumbnailEffect[j].easing);
										}
										else {
											jQuery(this).find('.imgContainer').animate({ 'top': n},g_ThumbnailEffect[j].duration, g_ThumbnailEffect[j].easing);
										}
									}
									break;
								case 'imageSlideLeft':
									if( g_options.thumbnailLabelPosition == 'overImageOnTop' || g_options.thumbnailLabelPosition == 'overImageOnBottom' ) {
										var n= '-' + jQuery(this).outerHeight(true) + 'px';
										if( jQuery.support.transition ) {
											jQuery(this).find('.imgContainer').transition({ 'left': n},g_ThumbnailEffect[j].duration, g_ThumbnailEffect[j].easing);
										}
										else {
											jQuery(this).find('.imgContainer').animate({ 'left': n},g_ThumbnailEffect[j].duration, g_ThumbnailEffect[j].easing);
										}
									}
									break;
								case 'imageSlideRight':
									if( g_options.thumbnailLabelPosition == 'overImageOnTop' || g_options.thumbnailLabelPosition == 'overImageOnBottom' ) {
										var n= jQuery(this).outerHeight(true) + 'px';
										if( jQuery.support.transition ) {
											jQuery(this).find('.imgContainer').transition({ 'left': n},g_ThumbnailEffect[j].duration, g_ThumbnailEffect[j].easing);
										}
										else {
											jQuery(this).find('.imgContainer').animate({ 'left': n},g_ThumbnailEffect[j].duration, g_ThumbnailEffect[j].easing);
										}
									}
									break;
								case 'labelAppear':
									if( g_options.thumbnailLabelPosition == 'overImageOnTop' || g_options.thumbnailLabelPosition == 'overImageOnBottom' ) {
										if( jQuery.support.transition ) {
											jQuery(this).find('.labelImage').transition({ 'opacity': '1'},g_ThumbnailEffect[j].duration, g_ThumbnailEffect[j].easing);
										}
										else {
											jQuery(this).find('.labelImage').animate({ 'opacity': '1'},g_ThumbnailEffect[j].duration, g_ThumbnailEffect[j].easing);
										}
									}
									break;
								case 'labelAppear75':
									if( g_options.thumbnailLabelPosition == 'overImageOnTop' || g_options.thumbnailLabelPosition == 'overImageOnBottom' ) {
										if( jQuery.support.transition ) {
											jQuery(this).find('.labelImage').transition({ 'opacity': '0.75'},g_ThumbnailEffect[j].duration, g_ThumbnailEffect[j].easing);
										}
										else {
											jQuery(this).find('.labelImage').animate({ 'opacity': '0.75'},g_ThumbnailEffect[j].duration, g_ThumbnailEffect[j].easing);
										}
									}
									break;
								case 'labelSlideDown':
									if( g_options.thumbnailLabelPosition == 'overImageOnTop' || g_options.thumbnailLabelPosition == 'overImageOnBottom' ) {
										if( jQuery.support.transition ) {
											jQuery(this).find('.labelImage').transition({ 'top': 0},g_ThumbnailEffect[j].duration, g_ThumbnailEffect[j].easing);
										}
										else {
											jQuery(this).find('.labelImage').animate({ 'top': 0},g_ThumbnailEffect[j].duration, g_ThumbnailEffect[j].easing);
										}
									}
									break;
								case 'labelSlideUp':
									if( g_options.thumbnailLabelPosition == 'overImageOnTop' || g_options.thumbnailLabelPosition == 'overImageOnBottom' ) {
										if( jQuery.support.transition ) {
											jQuery(this).find('.labelImage').transition({ 'bottom': 0},g_ThumbnailEffect[j].duration, g_ThumbnailEffect[j].easing);
										}
										else {
											jQuery(this).find('.labelImage').animate({ 'bottom': 0},g_ThumbnailEffect[j].duration, g_ThumbnailEffect[j].easing);
										}
									}
									break;
								case 'labelOpacity50':
									if( jQuery.support.transition ) {
										jQuery(this).find('.labelImage').transition({ 'opacity': 0.5 },g_ThumbnailEffect[j].duration, g_ThumbnailEffect[j].easing);
									}
									else {
										jQuery(this).find('.labelImage').animate({ 'opacity': 0.5 },g_ThumbnailEffect[j].duration, g_ThumbnailEffect[j].easing);
									}
									break;
								case 'borderLighter':
									if( jQuery.support.transition ) {
										jQuery(this).transition({ 'borderColor': lighterColor(g_oldBorderColor,0.5) },g_ThumbnailEffect[j].duration, g_ThumbnailEffect[j].easing);
									}
									else {
										jQuery(this).animate({ 'borderColor': lighterColor(g_oldBorderColor,0.5) },g_ThumbnailEffect[j].duration, g_ThumbnailEffect[j].easing);
									}
									break;
								case 'borderDarker':
									if( jQuery.support.transition ) {
										jQuery(this).transition({ 'borderColor': darkerColor(g_oldBorderColor,0.5) },g_ThumbnailEffect[j].duration, g_ThumbnailEffect[j].easing);
									}
									else {
										jQuery(this).animate({ 'borderColor': darkerColor(g_oldBorderColor,0.5) },g_ThumbnailEffect[j].duration, g_ThumbnailEffect[j].easing);
									}
									break;
								case 'imageScale150':
									if( jQuery.support.transition ) {
										jQuery(this).find('img').transition({ scale: 1.5 },g_ThumbnailEffect[j].duration, g_ThumbnailEffect[j].easing);
									}
									else {
										jQuery(this).find('img').animate({ scale: 1.5 },g_ThumbnailEffect[j].duration, g_ThumbnailEffect[j].easing);
									}
									break;
								case 'imageScale150Outside':
									setElementOnTop('', this);
									if( jQuery.support.transition ) {
										jQuery(this).find('img').transition({ scale: 1.5 },g_ThumbnailEffect[j].duration, g_ThumbnailEffect[j].easing);
									}
									else {
										jQuery(this).find('img').animate({ scale: 1.5 },g_ThumbnailEffect[j].duration, g_ThumbnailEffect[j].easing);
									}
									break;
								case 'scale120':
									setElementOnTop('', this);
									if( jQuery.support.transition ) {
										jQuery(this).transition({ scale: 1.2 },g_ThumbnailEffect[j].duration, g_ThumbnailEffect[j].easing);
									}
									else {
										jQuery(this).animate({ scale: 1.2 },g_ThumbnailEffect[j].duration, g_ThumbnailEffect[j].easing);
									}
									break;
								case 'imageFlipHorizontal':
									setElementOnTop('', this);
									var n= Math.round(jQuery(this).outerHeight(true)*1.2) + 'px';
									jQuery(this).find('.subcontainer').transition({ perspective: n, rotateX: '180deg'}, g_ThumbnailEffect[j].duration, g_ThumbnailEffect[j].easing);
									break;
								case 'imageFlipVertical':
									//jQuery(this).find('.imgContainer').transition({ 'x':'50px' , 'perspective': '50px', rotateY: '90deg'}, g_ThumbnailEffect[i].duration, 'ease');
									setElementOnTop('', this);
									//jQuery(this).find('.imgContainer').css('visibility','hidden');
									//jQuery(this).find('.labelImage').transition({ 'x':'0' , 'perspective': '50px', rotateY: '0deg'}, 1000, 'ease');
									//jQuery(this).find('.subcontainer').transition({ 'x':'100' , perspective: '50px', rotateY: '90deg'}, g_ThumbnailEffect[i].duration, 'ease');
									var n= Math.round(jQuery(this).outerHeight(true)*1.2) + 'px';
									jQuery(this).find('.subcontainer').transition({ perspective: n, rotateY: '180deg'}, g_ThumbnailEffect[j].duration, g_ThumbnailEffect[j].easing);
									break;
								case 'flipHorizontal':
									setElementOnTop('', this);
									var n= Math.round(jQuery(this).outerHeight(true)*1.2) + 'px';
									jQuery(this).transition({ perspective: n, rotateX: '180deg'}, g_ThumbnailEffect[j].duration, g_ThumbnailEffect[j].easing);
									break;
								case 'flipVertical':
									setElementOnTop('', this);
									var n= Math.round(jQuery(this).outerHeight(true)*1.2) + 'px';
									jQuery(this).transition({ perspective: n, rotateY: '180deg'}, g_ThumbnailEffect[j].duration, g_ThumbnailEffect[j].easing);
									break;
								case 'TEST':
									//jQuery(this).find('img').stop(true, true);
									jQuery(this).find('.subcontainer').transition({ scale: 0.8 },150).transition({ perspective: '50px', rotateX: '180deg'}, 300, 'ease').transition({ scale: 1 },150);
									break;
							}
						}
					}
					catch (e) { 
						nanoAlert( 'error on hover ' +e.message );
					}
				}, function() {
					//if( jQueryMinVersion('1.9') ) { jQuery(this).find('*').finish(); }
					try {
						for( j=0; j<g_ThumbnailEffect.length; j++) {
							switch(g_ThumbnailEffect[j].name ) {
								case 'rotateCornerBL':
									if( g_options.thumbnailLabelPosition == 'overImageOnTop' || g_options.thumbnailLabelPosition == 'overImageOnBottom' ) {
										jQuery(this).find('.labelImage').transition({ rotate: '-90deg'},g_ThumbnailEffect[j].duration, g_ThumbnailEffect[j].easing);
										jQuery(this).find('.imgContainer').transition({ rotate: '0deg'},g_ThumbnailEffect[j].duration, g_ThumbnailEffect[j].easing);
									}
									break;
								case 'rotateCornerBR':
									if( g_options.thumbnailLabelPosition == 'overImageOnTop' || g_options.thumbnailLabelPosition == 'overImageOnBottom' ) {
										jQuery(this).find('.labelImage').transition({ rotate: '90deg'},g_ThumbnailEffect[j].duration, g_ThumbnailEffect[j].easing);
										jQuery(this).find('.imgContainer').transition({ rotate: '0deg'},g_ThumbnailEffect[j].duration, g_ThumbnailEffect[j].easing);
									}
									break;
								case 'imageRotateCornerBL':
								case 'imageRotateCornerBR':
									if( g_options.thumbnailLabelPosition == 'overImageOnTop' || g_options.thumbnailLabelPosition == 'overImageOnBottom' ) {
										jQuery(this).find('.imgContainer').transition({ 'rotate': '0'},g_ThumbnailEffect[j].durationBack, g_ThumbnailEffect[j].easingBack );
									}
									break;
								case 'slideUp':
									if( g_options.thumbnailLabelPosition == 'overImageOnTop' || g_options.thumbnailLabelPosition == 'overImageOnBottom' ) {
										var n= jQuery(this).outerHeight(true) + 'px';
										if( jQuery.support.transition ) {
											jQuery(this).find('.imgContainer').transition({ 'top': 0},g_ThumbnailEffect[j].duration, g_ThumbnailEffect[j].easing);
											jQuery(this).find('.labelImage').transition({ 'top': n},g_ThumbnailEffect[j].duration, g_ThumbnailEffect[j].easing);
										}
										else {
											jQuery(this).find('.imgContainer').animate({ 'top': 0},g_ThumbnailEffect[j].duration, g_ThumbnailEffect[j].easing);
											jQuery(this).find('.labelImage').animate({ 'top': n},g_ThumbnailEffect[j].duration, g_ThumbnailEffect[j].easing);
										}
									}
									break;
								case 'slideDown':
									if( g_options.thumbnailLabelPosition == 'overImageOnTop' || g_options.thumbnailLabelPosition == 'overImageOnBottom' ) {
										var n= '-'+jQuery(this).outerHeight(true) + 'px';
										if( jQuery.support.transition ) {
											jQuery(this).find('.imgContainer').transition({ 'top': 0},g_ThumbnailEffect[j].duration, g_ThumbnailEffect[j].easing);
											jQuery(this).find('.labelImage').transition({ 'top': n},g_ThumbnailEffect[j].duration, g_ThumbnailEffect[j].easing);
										}
										else {
											jQuery(this).find('.imgContainer').animate({ 'top': 0},g_ThumbnailEffect[j].duration, g_ThumbnailEffect[j].easing);
											jQuery(this).find('.labelImage').animate({ 'top': n},g_ThumbnailEffect[j].duration, g_ThumbnailEffect[j].easing);
										}
									}
									break;
								case 'slideRight':
									if( g_options.thumbnailLabelPosition == 'overImageOnTop' || g_options.thumbnailLabelPosition == 'overImageOnBottom' ) {
										var n= '-'+jQuery(this).outerHeight(true) + 'px';
										if( jQuery.support.transition ) {
											jQuery(this).find('.imgContainer').transition({ 'left': 0},g_ThumbnailEffect[j].duration, g_ThumbnailEffect[j].easing);
											jQuery(this).find('.labelImage').transition({ 'left': n},g_ThumbnailEffect[j].duration, g_ThumbnailEffect[j].easing);
										}
										else {
											jQuery(this).find('.imgContainer').animate({ 'left': 0},g_ThumbnailEffect[j].duration, g_ThumbnailEffect[j].easing);
											jQuery(this).find('.labelImage').animate({ 'left': n},g_ThumbnailEffect[j].duration, g_ThumbnailEffect[j].easing);
										}
									}
									break;
								case 'slideLeft':
									if( g_options.thumbnailLabelPosition == 'overImageOnTop' || g_options.thumbnailLabelPosition == 'overImageOnBottom' ) {
										var n= jQuery(this).outerHeight(true) + 'px';
										if( jQuery.support.transition ) {
											jQuery(this).find('.imgContainer').transition({ 'left': 0},g_ThumbnailEffect[j].duration, g_ThumbnailEffect[j].easing);
											jQuery(this).find('.labelImage').transition({ 'left': n},g_ThumbnailEffect[j].duration, g_ThumbnailEffect[j].easing);
										}
										else {
											jQuery(this).find('.imgContainer').animate({ 'left': 0},g_ThumbnailEffect[j].duration, g_ThumbnailEffect[j].easing);
											jQuery(this).find('.labelImage').animate({ 'left': n},g_ThumbnailEffect[j].duration, g_ThumbnailEffect[j].easing);
										}
									}
									break;
								case 'imageSlideUp':
								case 'imageSlideDown':
								case 'imageSlideLeft':
								case 'imageSlideRight':
									if( g_options.thumbnailLabelPosition == 'overImageOnTop' || g_options.thumbnailLabelPosition == 'overImageOnBottom' ) {
										if( jQuery.support.transition ) {
											jQuery(this).find('.imgContainer').transition({ 'top': '0'},g_ThumbnailEffect[j].durationBack, g_ThumbnailEffect[j].easingBack);
											jQuery(this).find('.imgContainer').transition({ 'left': '0'},g_ThumbnailEffect[j].durationBack, g_ThumbnailEffect[j].easingBack);
										}
										else {
											jQuery(this).find('.imgContainer').animate({ 'top': '0'},g_ThumbnailEffect[j].durationBack, g_ThumbnailEffect[j].easingBack);
											jQuery(this).find('.imgContainer').animate({ 'left': '0'},g_ThumbnailEffect[j].durationBack, g_ThumbnailEffect[j].easingBack);
										}
									}
									break;
								case 'labelAppear':
								case 'labelAppear75':
									if( g_options.thumbnailLabelPosition == 'overImageOnTop' || g_options.thumbnailLabelPosition == 'overImageOnBottom' ) {
										if( jQuery.support.transition ) {
											jQuery(this).find('.labelImage').transition({ 'opacity': '0'},g_ThumbnailEffect[j].durationBack, g_ThumbnailEffect[j].easingBack);
										}
										else {
											jQuery(this).find('.labelImage').animate({ 'opacity': '0'},g_ThumbnailEffect[j].durationBack, g_ThumbnailEffect[j].easingBack);
										}
									}
									break;
								case 'labelSlideDown':
									if( g_options.thumbnailLabelPosition == 'overImageOnTop' || g_options.thumbnailLabelPosition == 'overImageOnBottom' ) {
										if( jQuery.support.transition ) {
											jQuery(this).find('.labelImage').transition({ 'top': '-99%'},g_ThumbnailEffect[j].durationBack, g_ThumbnailEffect[j].easingBack);
										}
										else {
											jQuery(this).find('.labelImage').animate({ 'top': '-99%'},g_ThumbnailEffect[j].durationBack, g_ThumbnailEffect[j].easingBack);
										}
									}
									break;
								case 'labelSlideUp':
									if( g_options.thumbnailLabelPosition == 'overImageOnTop' || g_options.thumbnailLabelPosition == 'overImageOnBottom' ) {
										if( jQuery.support.transition ) {
											jQuery(this).find('.labelImage').transition({ 'bottom': '-99%'},g_ThumbnailEffect[j].durationBack, g_ThumbnailEffect[j].easingBack);
										}
										else {
											jQuery(this).find('.labelImage').animate({ 'bottom': '-99%'},g_ThumbnailEffect[j].durationBack, g_ThumbnailEffect[j].easingBack);
										}
									}
									break;
								case 'labelOpacity50':
									if( jQuery.support.transition ) {
										jQuery(this).find('.labelImage').transition({ 'opacity': g_oldLabelOpacity },g_ThumbnailEffect[j].durationBack, g_ThumbnailEffect[j].easingBack);
									}
									else {
										jQuery(this).find('.labelImage').animate({ 'opacity': g_oldLabelOpacity },g_ThumbnailEffect[j].durationBack, g_ThumbnailEffect[j].easingBack);
									}
									break;
								case 'borderLighter':
								case 'borderDarker':
									if( jQuery.support.transition ) {
										jQuery(this).transition({ 'borderColor': g_oldBorderColor },g_ThumbnailEffect[j].durationBack, g_ThumbnailEffect[j].easingBack);
									}
									else {
										jQuery(this).animate({ 'borderColor': g_oldBorderColor },g_ThumbnailEffect[j].durationBack, g_ThumbnailEffect[j].easingBack);
									}
									break;
								case 'imageScale150':
								case 'imageScale150Outside':
									if( jQuery.support.transition ) {
										jQuery(this).find('img').transition({ scale: 1 },g_ThumbnailEffect[j].durationBack, g_ThumbnailEffect[j].easingBack);
									}
									else {
										jQuery(this).find('img').animate({ scale: 1 },g_ThumbnailEffect[j].durationBack, g_ThumbnailEffect[j].easingBack);
									}
									break;
								case 'scale120':
									if( jQuery.support.transition ) {
										jQuery(this).transition({ scale: 1 },g_ThumbnailEffect[j].durationBack, g_ThumbnailEffect[j].easingBack);
									}
									else {
										jQuery(this).animate({ scale: 1 },g_ThumbnailEffect[j].durationBack, g_ThumbnailEffect[j].easingBack);
									}
									break;
								case 'imageFlipHorizontal':
									var n= Math.round(jQuery(this).outerHeight(true)*1.2) + 'px';
									jQuery(this).find('.subcontainer').transition({ perspective:n, rotateX: '0deg'}, g_ThumbnailEffect[j].durationBack, g_ThumbnailEffect[j].easingBack);
									break;
								case 'imageFlipVertical':
									var n= Math.round(jQuery(this).outerHeight(true)*1.2) + 'px';
									jQuery(this).find('.subcontainer').transition({ perspective:n, rotateY: '0deg'}, g_ThumbnailEffect[j].durationBack, g_ThumbnailEffect[j].easingBack);
									break;
								case 'flipHorizontal':
									var n= Math.round(jQuery(this).outerHeight(true)*1.2) + 'px';
									jQuery(this).transition({ perspective:n, rotateX: '0deg'}, g_ThumbnailEffect[j].durationBack, g_ThumbnailEffect[j].easingBack);
									break;
								case 'flipVertical':
									var n= Math.round(jQuery(this).outerHeight(true)*1.2) + 'px';
									jQuery(this).transition({ perspective:n, rotateY: '0deg'}, g_ThumbnailEffect[j].durationBack, g_ThumbnailEffect[j].easingBack);
									break;
								case 'TEST':
									//if( jQueryMinVersion('1.9') ) { jQuery(this).find('.subcontainer').finish(); }
									jQuery(this).find('.subcontainer').transition({ scale: 0.85 },150).transition({ perspective: '50px', rotateX: '0deg'}, 300, 'ease').transition({ scale: 1 },150);
									break;
							}
						}
					}
					catch (e) { 
						nanoAlert( 'error on hoverOut ' +e.message );
					}
				}
			);

			
			newDiv.click(function() {
				var n=jQuery(this).data("index");

				// open URL
				if( g_itemInfo[n].destinationURL !== undefined && g_itemInfo[n].destinationURL.length >0 ) {
					window.location = g_itemInfo[n].destinationURL;
					return;
				}

				if( g_itemInfo[n].kind == 'album' ) {
					
					if( g_options.kind == 'picasa' )
						// open Picasa/Google+ album
						PicasaGetItems(g_itemInfo[n].src,g_itemInfo[n].title);
					else
						// Open Flickr photoset
						FlickrGetItems(g_itemInfo[n].src,g_itemInfo[n].title);
				}
				else {
					// Display photo
					DisplayItem(this);
				}
			});
		});

		g_oneThumbnailWidth=w;
		g_oneThumbnailHeight=h;
		SetTumbnailsContainerWidth();
		var newH=SetTumbnailsContainerHeight();

		jQuery(g_containerThumbnails).animate({maxHeight: newH}, 200, function() {
			// animation to display the thumbnails
			jQuery(g_containerThumbnails).find('.container').each(function(i) {
				jQuery(this).delay((i++) * 50).fadeTo(200, 1);
			});
			g_containerThumbnailsDisplayed=true;
		});


	};
	
	function ThumbnailInit( elt ) {
	};

	function ThumbnailHover( elt ) {
	};
	
	function ThumbnailHoverOut( elt ) {
	};


	function SetTumbnailsContainerHeight() {
		var w=jQuery(g_containerThumbnails).width();
		var nbItemsPerLineLines=Math.floor(w/g_oneThumbnailWidth);
		var nbLines=Math.ceil(g_itemInfo.length/nbItemsPerLineLines);
		var h=nbLines*g_oneThumbnailHeight;
		if( g_containerThumbnailsDisplayed ) { jQuery(g_containerThumbnails).css('max-height',h); }
		return h;
	};
		
	function SetTumbnailsContainerWidth() {
		// set the max number of items per line
		if( g_oneThumbnailWidth > 0 ) {
			var wcont=jQuery(g_containerParent).width();
			if( g_options.maxItemsPerLine > 0 ) {
				if( g_options.maxItemsPerLine*g_oneThumbnailWidth <= wcont ) {
					jQuery(g_containerThumbnails).css('max-width',g_options.maxItemsPerLine*g_oneThumbnailWidth);
				}
				else {
					var w=parseInt(wcont/g_oneThumbnailWidth)
					jQuery(g_containerThumbnails).css('max-width',w*g_oneThumbnailWidth);
				}
			}
			else {
				var w=parseInt(wcont/g_oneThumbnailWidth)
				jQuery(g_containerThumbnails).css('max-width',w*g_oneThumbnailWidth);
			}
		}
	
	};


	// ##### DISPLAY IMAGE #####
	function DisplayItem(element) {
		if( g_options.viewer == 'fancybox' ) {
			OpenFancyBox(element);
		}
		else {
			OpenInternalViewer(element);
		}
	};
	
	function OpenInternalViewer(element) {
		g_viewerCurrentItem=jQuery(element).data("index");
		var url=g_itemInfo[g_viewerCurrentItem].src;
		
		//jQuery(g_containerViewer).children().remove();
		g_containerViewer=jQuery('<div class="nanoGalleryViewer" style="visibility:hidden"></div>').appendTo(g_baseControl);
		g_containerViewerContent=jQuery('<div class="content"><img class="image" src="" style="position:absolute;top:0;bottom:0;left:0;right:0;margin:auto;"><div class="contentAreaPrevious"></div><div class="contentAreaNext"></div></div>').appendTo(g_containerViewer);
		g_containerViewerCloseFloating=jQuery('<div class="closeButtonFloating"></div>').appendTo(g_containerViewer);
		//g_containerViewerCloseFloating=jQuery('<div class="closeButtonFloating"></div>').appendTo(jQuery(g_containerViewerContent).find('img'));
		g_containerViewerToolbar=jQuery('<div class="toolbar"><div class="previousButton"></div><div class="nextButton"></div><div class="closeButton"></div><div class="label"><div class="title"></div><div class="description"></div></div>').appendTo(g_containerViewer);

		setElementOnTop('',g_containerViewer);
		jQuery('body').css('overflow','hidden');	//avoid scrollbars

		DisplayInternalViewer();
		
		jQuery(document).keyup(function(e) {
			if (e.keyCode == 27) {		// Esc key
				CloseInternalViewer();
			}
		});
		
		jQuery(g_containerViewerCloseFloating).on("click",function(){
			CloseInternalViewer();
		});
		
		jQuery(g_containerViewerToolbar).find('.closeButton').on("click",function(){
			CloseInternalViewer();
		});

		jQuery(g_containerViewerToolbar).find('.nextButton').on("click",function(){
			if( g_viewerCurrentItem == g_itemInfo.length-1 ) {
				g_viewerCurrentItem=0;
			}
			else {
				g_viewerCurrentItem++;
			}
			DisplayInternalViewer();
		});
		jQuery(g_containerViewerToolbar).find('.previousButton').on("click",function(){
			if( g_viewerCurrentItem == 0 ) {
				g_viewerCurrentItem=g_itemInfo.length-1;
			}
			else {
				g_viewerCurrentItem--;
			}
			DisplayInternalViewer();
		});


		jQuery(g_containerViewerContent).find('.contentAreaNext').on("click",function(){
			if( g_viewerCurrentItem == g_itemInfo.length-1 ) {
				g_viewerCurrentItem=0;
			}
			else {
				g_viewerCurrentItem++;
			}
			DisplayInternalViewer();
		});
		jQuery(g_containerViewerContent).find('.contentAreaPrevious').on("click",function(){
			if( g_viewerCurrentItem == 0 ) {
				g_viewerCurrentItem=g_itemInfo.length-1;
			}
			else {
				g_viewerCurrentItem--;
			}
			DisplayInternalViewer();
		});

	};
	
	function DisplayInternalViewer() {
		var url=g_itemInfo[g_viewerCurrentItem].src;
		jQuery(g_containerViewerContent).find('img').attr('src',url);
		if( g_itemInfo[g_viewerCurrentItem]['title'] !== undefined ) {
			jQuery(g_containerViewerToolbar).find('.title').text(g_itemInfo[g_viewerCurrentItem]['title']);
		}
		else {
			jQuery(g_containerViewerToolbar).find('.title').text('');
		}
		if( g_itemInfo[g_viewerCurrentItem]['description'] !== undefined ) {
			jQuery(g_containerViewerToolbar).find('.description').text(g_itemInfo[g_viewerCurrentItem]['description']);
		}
		else {
			jQuery(g_containerViewerToolbar).find('.description').text('');
		}
		ResizeInternalViewer();
		g_containerViewerDisplayed=true;
	};
	
	function CloseInternalViewer() {
		if( g_containerViewerDisplayed ) {
			g_containerViewerDisplayed=false;
			jQuery(g_containerViewer).remove();
			jQuery('body').css('overflow','inherit');
		}
	};
	
	function ResizeInternalViewer() {
		var w=jQuery(window).width();
		var h=jQuery(window).height();
		jQuery(g_containerViewer).css({
			"visibility":"visible",
			"position": "fixed",		//"absolute",
			"top":0,
			"left":0,
			"width":jQuery(window).width(),
			"height":jQuery(window).height()
		});

		var elt=jQuery(g_containerViewerContent).find('img');
		
		var contentOuterWidthV=Math.abs(jQuery(g_containerViewerContent).outerHeight(true)-jQuery(g_containerViewerContent).height());	// vertical margin+border+padding
		var contentOuterWidthH=Math.abs(jQuery(g_containerViewerContent).outerHeight(true)-jQuery(g_containerViewerContent).height());	// horizontal margin+border+padding
		
		var imgBorderV=jQuery(elt).outerHeight(false)-jQuery(elt).innerHeight();
		var imgBorderH=Math.abs(jQuery(elt).outerWidth(false)-jQuery(elt).innerWidth());
		
		var imgPaddingV=Math.abs(jQuery(elt).innerHeight()-jQuery(elt).height());
		var imgPaddingH=Math.abs(jQuery(elt).innerHeight()-jQuery(elt).height());
		
		var tV=imgBorderV+imgPaddingV;	//+tmargin;
		var tH=imgBorderH+imgPaddingH;	//+tmargin;

		var h=jQuery(window).height()-jQuery(g_containerViewerToolbar).outerHeight(true)-contentOuterWidthV;
		var w=jQuery(window).width()-contentOuterWidthH;
		jQuery(g_containerViewerContent).css({'height':h, 'width':w	});
				
		jQuery(g_containerViewerContent).children('img').css({'max-width': (w-tV),'max-height':h-tH });
		
		var pt=(jQuery(g_containerViewerContent).find('img').outerHeight(true)-jQuery(g_containerViewerContent).find('img').outerHeight())/2;
		var pl=(jQuery(g_containerViewerContent).find('img').outerWidth(true)-jQuery(g_containerViewerContent).find('img').outerWidth())/2;
		jQuery(g_containerViewerCloseFloating).css('top',pt-11);
		jQuery(g_containerViewerCloseFloating).css('left',pl-11);
		
	};
	
	
	function OpenFancyBox(element) {
		var n=jQuery(element).data("index");
		var lstImages=new Array(g_itemInfo.length);
		var current=0;

		//lstImages[0]=g_itemInfo[n]['src'];
		lstImages[current]=new Object;	//{href:'"+g_itemInfo[n]['src']+"',title:'"+g_itemInfo[n]['title']+"'};
		lstImages[current].href=g_itemInfo[n]['src'];
		lstImages[current].title=g_itemInfo[n]['title'];
		
		for( var j=n+1; j<g_itemInfo.length; j++) {
			//lstImages[lstImages.length]=g_itemInfo[j]['src'];
			current++;
			lstImages[current]=new Object;	//{href:'"+g_itemInfo[n]['src']+"',title:'"+g_itemInfo[n]['title']+"'};
			lstImages[current].href=g_itemInfo[j]['src'];
			lstImages[current].title=g_itemInfo[j]['title'];
		}
		for( var j=0; j<n; j++) {
			//lstImages[lstImages.length]=g_itemInfo[j]['src'];
			current++;
			lstImages[current]=new Object;	//{href:'"+g_itemInfo[n]['src']+"',title:'"+g_itemInfo[n]['title']+"'};
			lstImages[current].href=g_itemInfo[j]['src'];
			lstImages[current].title=g_itemInfo[j]['title'];
		}
		jQuery.fancybox.open(lstImages,{'autoPlay':false, 'nextEffect':'fade', 'prevEffect':'fade','scrolling':'no',
			helpers		: {	buttons	: { 'position' : 'bottom'} }
		});
	};
	
	// ##### BREADCRUMB/THUMBNAIL COLOR SCHEME #####
	function SetColorScheme(element) {

		var cs=null;
		switch(toType(g_options.colorScheme)) {
			case 'object':		// user custom color scheme object 
				cs=g_colorScheme_default;
				jQuery.extend(true,cs,g_options.colorScheme);
				g_colorSchemeLabel='nanogallery_colorscheme_custom';
				break;
			case 'string':		// name of an internal defined color scheme
				switch( g_options.colorScheme ) {
					case 'none':
						return;
						break;
					case 'light':
						cs=g_colorScheme_light;
						g_colorSchemeLabel='nanogallery_colorscheme_light';
						break;
					case 'darkRed':
						cs=g_colorScheme_darkRed;
						g_colorSchemeLabel='nanogallery_colorscheme_darkred';
						break;
					case 'darkGreen':
						cs=g_colorScheme_darkGreen;
						g_colorSchemeLabel='nanogallery_colorscheme_darkgreen';
						break;
					case 'darkBlue':
						cs=g_colorScheme_darkBlue;
						g_colorSchemeLabel='nanogallery_colorscheme_darkblue';
						break;
					case 'darkOrange':
						cs=g_colorScheme_darkOrange;
						g_colorSchemeLabel='nanogallery_colorscheme_darkorange';
						break;
					case 'default':
					case 'dark':
					default:
						cs=g_colorScheme_default;
						g_colorSchemeLabel='nanogallery_colorscheme_default';
				}
				break;
			default:
				alert('nanoGALLERY - error in colorScheme parameter.');
				return;
		}

		
		//var s1='.nanogallery_theme_'+g_options.theme+' ';
		var s1='.' + g_colorSchemeLabel + ' ';
		var s=s1+'.nanoGalleryBreadcrumb { background:'+cs.breadcrumb.background+'; border:'+cs.breadcrumb.border+'; }'+'\n';
		s+=s1+'.nanoGalleryBreadcrumb .folder { color:'+cs.breadcrumb.color+'; }'+'\n';
		s+=s1+'.nanoGalleryBreadcrumb .separator:after { color:'+cs.breadcrumb.color+'; }'+'\n';
		s+=s1+'.nanoGalleryBreadcrumb .folder:hover { color:'+cs.breadcrumb.colorHover+'; }'+'\n';

		s+=s1+'.nanoGalleryContainer .container { background:'+cs.thumbnail.background+'; border:'+cs.thumbnail.border+'; }'+'\n';
		s+=s1+'.nanoGalleryContainer .container .imgContainer { background:'+cs.thumbnail.background+'; }'+'\n';
		//s+=s1+'.nanoGalleryContainer .container .imgContainer { background:'+cs.thumbnail.background+'; opacity:'+cs.thumbnail.labelOpacity+'}'+'\n';
		s+=s1+'.nanoGalleryContainer .container .labelImage { background:'+cs.thumbnail.labelBackground+'; }'+'\n';
		s+=s1+'.nanoGalleryContainer .container .labelImageTitle { color:'+cs.thumbnail.titleColor+'; }'+'\n';
		//s+=s1+'.nanoGalleryContainer .container .labelFolderTitle { color:'+cs.thumbnail.folderTitleColor+'; }'+'\n';
		s+=s1+'.nanoGalleryContainer .container .labelDescription { color:'+cs.thumbnail.descriptionColor+'; }'+'\n';

		jQuery("head").append('<style>'+s+'</style>');
		jQuery(element).addClass(g_colorSchemeLabel);

	};
	
	// ##### VIEWER COLOR SCHEME #####
	function SetColorSchemeViewer(element) {

		var cs=null;
		switch(toType(g_options.colorSchemeViewer)) {
			case 'object':		// user custom color scheme object 
				cs=g_colorSchemeViewer_default;
				jQuery.extend(true,cs,g_options.colorSchemeViewer);
				g_colorSchemeLabel='nanogallery_colorschemeviewer_custom';
				break;
			case 'string':		// name of an internal defined color scheme
				switch( g_options.colorSchemeViewer ) {
					case 'none':
						return;
						break;
					case 'light':
						cs=g_colorSchemeViewer_light;
						g_colorSchemeLabel='nanogallery_colorschemeviewer_light';
						break;
					case 'darkRed':
						cs=g_colorSchemeViewer_darkRed;
						g_colorSchemeLabel='nanogallery_colorschemeviewer_darkred';
						break;
					case 'darkGreen':
						cs=g_colorSchemeViewer_darkGreen;
						g_colorSchemeLabel='nanogallery_colorschemeviewer_darkgreen';
						break;
					case 'darkBlue':
						cs=g_colorSchemeViewer_darkBlue;
						g_colorSchemeLabel='nanogallery_colorschemeviewer_darkblue';
						break;
					case 'darkOrange':
						cs=g_colorSchemeViewer_darkOrange;
						g_colorSchemeLabel='nanogallery_colorschemeviewer_darkorange';
						break;
					case 'default':
					case 'dark':
					default:
						cs=g_colorSchemeViewer_default;
						g_colorSchemeLabel='nanogallery_colorschemeviewer_default';
				}
				break;
			default:
				alert('nanoGALLERY - error in colorSchemeViewer parameter.');
				return;
		}

		
		//var s1='.nanogallery_theme_'+g_options.theme+' ';
		var s1='.' + g_colorSchemeLabel + ' ';
		var s=s1+'.nanoGalleryViewer { background:'+cs.background+'; }'+'\n';
		//s+=s1+'.nanoGalleryViewer { background:'+cs.viewer.background+'; color:'+cs.viewer.color+'; }'+'\n';
		s+=s1+'.nanoGalleryViewer .content img { border:'+cs.imageBorder+'; box-shadow:'+cs.imageBoxShadow+'; }'+'\n';
		s+=s1+'.nanoGalleryViewer .toolbar { background:'+cs.barBackground+'; border:'+cs.barBorder+'; color:'+cs.barColor+'; }'+'\n';
		s+=s1+'.nanoGalleryViewer .toolbar .previousButton:after { color:'+cs.barColor+'; }'+'\n';
		s+=s1+'.nanoGalleryViewer .toolbar .nextButton:after { color:'+cs.barColor+'; }'+'\n';
		s+=s1+'.nanoGalleryViewer .toolbar .closeButton:after { color:'+cs.barColor+'; }'+'\n';
		s+=s1+'.nanoGalleryViewer .toolbar .label .title { color:'+cs.barColor+'; }'+'\n';
		s+=s1+'.nanoGalleryViewer .toolbar .label .description { color:'+cs.barDescriptionColor+'; }'+'\n';
		jQuery("head").append('<style>'+s+'</style>');
		jQuery(element).addClass(g_colorSchemeLabel);
	};

	
	// DEMO PANEL
	//	g_containerDemo =jQuery('<div class="nanoGalleryDemo"></div>').appendTo(element);
	function buildDemoPanel() {
		var bs='style="display:inline;border:1px solid #555;padding:2px;margin:0 2px;"';
		//var s='<div style="display:inline-block;margin:0 auto;">';
		var s='<div style="display:inline-block;text-align:center;">';
		s+='<div '+bs+'>Demo 1</div>';
		s+='<div '+bs+'>Demo 2</div>';
		s+='<div '+bs+'>Demo 3</div>';
		s+='<div '+bs+'>Demo 4</div>';
		s+='<div '+bs+'>Demo 5</div>';
		s+='</div><br><br>';
		jQuery(g_containerDemo).append(s);
	};
	
	
	
	
	
	// ##### TOOLS #####
	
	// Display a message
	function nanoAlert( msg ) {
		alert('nanoGALLERY: ' + msg);
	};
	
	
	// set z-index to display element on top of all others
	function setElementOnTop( start, elt ) {
		var highest_index = 0;
		if( start=='' ) { start= '*'; }
		//jQuery('[z-index]').each(function() {
		jQuery(start).each(function() {
			var cur = parseInt($(this).css('z-index'));
			highest_index = cur > highest_index ? cur : highest_index;

			// if (jQuery(this).css("z-index") > highest_index) {
				//highest_index = parseInt(jQuery(this).attr("z-index"));
			// }
		});
		highest_index++;
		jQuery(elt).css('z-index',highest_index);
	};

	
	// return the real type of the object
	var toType = function(obj) {
		// by Angus Croll - http://javascriptweblog.wordpress.com/2011/08/08/fixing-the-javascript-typeof-operator/
		return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
	};

	
	// return true if current jQuery version match the minimum required
	function jQueryMinVersion(version) {
		var $vrs = window.jQuery.fn.jquery.split('.'),
		min = version.split('.');
		for (var i=0, len=$vrs.length; i<len; i++) {
			if (min[i] && (+$vrs[i]) < (+min[i])) {
				return false;
			}
		}
		return true;
	};
	
	// color lighter or darker
	// found on http://stackoverflow.com/questions/1507931/generate-lighter-darker-color-in-css-using-javascript/5747818#5747818
	// Ratio is between 0 and 1
	var changeColor = function(color, ratio, darker) {
		// Trim trailing/leading whitespace
		color = color.replace(/^\s*|\s*$/, '');

		// Expand three-digit hex
		color = color.replace(
			/^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i,
			'#$1$1$2$2$3$3'
		);

		// Calculate ratio
		var difference = Math.round(ratio * 256) * (darker ? -1 : 1),
			// Determine if input is RGB(A)
			rgb = color.match(new RegExp('^rgba?\\(\\s*' +
				'(\\d|[1-9]\\d|1\\d{2}|2[0-4][0-9]|25[0-5])' +
				'\\s*,\\s*' +
				'(\\d|[1-9]\\d|1\\d{2}|2[0-4][0-9]|25[0-5])' +
				'\\s*,\\s*' +
				'(\\d|[1-9]\\d|1\\d{2}|2[0-4][0-9]|25[0-5])' +
				'(?:\\s*,\\s*' +
				'(0|1|0?\\.\\d+))?' +
				'\\s*\\)$'
			, 'i')),
			alpha = !!rgb && rgb[4] != null ? rgb[4] : null,

			// Convert hex to decimal
			decimal = !!rgb? [rgb[1], rgb[2], rgb[3]] : color.replace(
				/^#?([a-f0-9][a-f0-9])([a-f0-9][a-f0-9])([a-f0-9][a-f0-9])/i,
				function() {
					return parseInt(arguments[1], 16) + ',' +
						parseInt(arguments[2], 16) + ',' +
						parseInt(arguments[3], 16);
				}
			).split(/,/),
			returnValue;

		// Return RGB(A)
		return !!rgb ?
			'rgb' + (alpha !== null ? 'a' : '') + '(' +
				Math[darker ? 'max' : 'min'](
					parseInt(decimal[0], 10) + difference, darker ? 0 : 255
				) + ', ' +
				Math[darker ? 'max' : 'min'](
					parseInt(decimal[1], 10) + difference, darker ? 0 : 255
				) + ', ' +
				Math[darker ? 'max' : 'min'](
					parseInt(decimal[2], 10) + difference, darker ? 0 : 255
				) +
				(alpha !== null ? ', ' + alpha : '') +
				')' :
			// Return hex
			[
				'#',
				pad(Math[darker ? 'max' : 'min'](
					parseInt(decimal[0], 10) + difference, darker ? 0 : 255
				).toString(16), 2),
				pad(Math[darker ? 'max' : 'min'](
					parseInt(decimal[1], 10) + difference, darker ? 0 : 255
				).toString(16), 2),
				pad(Math[darker ? 'max' : 'min'](
					parseInt(decimal[2], 10) + difference, darker ? 0 : 255
				).toString(16), 2)
			].join('');
	};
	var lighterColor = function(color, ratio) {
		return changeColor(color, ratio, false);
	};
	var darkerColor = function(color, ratio) {
		return changeColor(color, ratio, true);
	};
	var pad = function(num, totalChars) {
		var pad = '0';
		num = num + '';
		while (num.length < totalChars) {
			num = pad + num;
		}
		return num;
	};	
	

}



/**!
 * @preserve Color animation 20120928
 * http://www.bitstorm.org/jquery/color-animation/
 * Copyright 2011, 2012 Edwin Martin <edwin@bitstorm.org>
 * Released under the MIT and GPL licenses.
 */

(function($) {
	/**
	 * Check whether the browser supports RGBA color mode.
	 *
	 * Author Mehdi Kabab <http://pioupioum.fr>
	 * @return {boolean} True if the browser support RGBA. False otherwise.
	 */
	function isRGBACapable() {
		var $script = $('script:first'),
				color = $script.css('color'),
				result = false;
		if (/^rgba/.test(color)) {
			result = true;
		} else {
			try {
				result = ( color != $script.css('color', 'rgba(0, 0, 0, 0.5)').css('color') );
				$script.css('color', color);
			} catch (e) {
			}
		}

		return result;
	}

	$.extend(true, $, {
		support: {
			'rgba': isRGBACapable()
		}
	});

	var properties = ['color', 'backgroundColor', 'borderBottomColor', 'borderLeftColor', 'borderRightColor', 'borderTopColor', 'outlineColor'];
	$.each(properties, function(i, property) {
		$.Tween.propHooks[ property ] = {
			get: function(tween) {
				return $(tween.elem).css(property);
			},
			set: function(tween) {
				var style = tween.elem.style;
				var p_begin = parseColor($(tween.elem).css(property));
				var p_end = parseColor(tween.end);
				tween.run = function(progress) {
					style[property] = calculateColor(p_begin, p_end, progress);
				}
			}
		}
	});

	// borderColor doesn't fit in standard fx.step above.
	$.Tween.propHooks.borderColor = {
		set: function(tween) {
			var style = tween.elem.style;
			var p_begin = [];
			var borders = properties.slice(2, 6); // All four border properties
			$.each(borders, function(i, property) {
				p_begin[property] = parseColor($(tween.elem).css(property));
			});
			var p_end = parseColor(tween.end);
			tween.run = function(progress) {
				$.each(borders, function(i, property) {
					style[property] = calculateColor(p_begin[property], p_end, progress);
				});
			}
		}
	}

	// Calculate an in-between color. Returns "#aabbcc"-like string.
	function calculateColor(begin, end, pos) {
		var color = 'rgb' + ($.support['rgba'] ? 'a' : '') + '('
				+ parseInt((begin[0] + pos * (end[0] - begin[0])), 10) + ','
				+ parseInt((begin[1] + pos * (end[1] - begin[1])), 10) + ','
				+ parseInt((begin[2] + pos * (end[2] - begin[2])), 10);
		if ($.support['rgba']) {
			color += ',' + (begin && end ? parseFloat(begin[3] + pos * (end[3] - begin[3])) : 1);
		}
		color += ')';
		return color;
	}

	// Parse an CSS-syntax color. Outputs an array [r, g, b]
	function parseColor(color) {
		var match, triplet;

		// Match #aabbcc
		if (match = /#([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})/.exec(color)) {
			triplet = [parseInt(match[1], 16), parseInt(match[2], 16), parseInt(match[3], 16), 1];

			// Match #abc
		} else if (match = /#([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])/.exec(color)) {
			triplet = [parseInt(match[1], 16) * 17, parseInt(match[2], 16) * 17, parseInt(match[3], 16) * 17, 1];

			// Match rgb(n, n, n)
		} else if (match = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(color)) {
			triplet = [parseInt(match[1]), parseInt(match[2]), parseInt(match[3]), 1];

		} else if (match = /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9\.]*)\s*\)/.exec(color)) {
			triplet = [parseInt(match[1], 10), parseInt(match[2], 10), parseInt(match[3], 10),parseFloat(match[4])];

			// No browser returns rgb(n%, n%, n%), so little reason to support this format.
		}
		return triplet;
	}
})(jQuery);
