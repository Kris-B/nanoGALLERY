/*
 * nanoGALLERY for jQuery v3.3.0
 * Plugin for jQuery by Christophe Brisbois
 * http://www.brisbois.fr
 * 
 * External components:
 *  - jQuery (http://www.jquery.com)
 *  - fancybox (http://www.fancybox.net)
 */

(function( $ ) {
	$.fn.nanoGallery = function(options) {

		var settings = $.extend( {
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
			viewer:'internal'
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
	// Detaild: http://www.flickr.com/services/api/misc.urls.html
	var g_flickrThumbSize='s';
	var g_flickrThumbAvailableSizes=new Array(75,100,150,240,320,500,640,800,1024);
	var g_flickrThumbAvailableSizesStr=new Array('s','t','q','m','n','-','z','c','b');
	var g_flickrApiKey="2f0e634b471fdb47446abcb9c5afebdc";
	var g_viewerCurrentItem=0;
	
	this.Initiate=function(element, params) {
		"use strict";
		g_options=params;
		g_baseControl=element;
		
		if( g_options.blackList !='' ) { g_blackList=g_options.blackList.toUpperCase().split('|'); }
		if( g_options.whiteList !='' ) { g_whiteList=g_options.whiteList.toUpperCase().split('|'); }
		if( g_options.albumList !='' ) { g_albumList=g_options.albumList.toUpperCase().split('|'); }
		jQuery(element).addClass('nanogallery_theme_'+g_options.theme);
	
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
	
		if( g_options.displayBreadcrumb == true && ( g_options.kind=='picasa' || g_options.kind=='flickr')) {
			g_containerBreadcrumb =jQuery('<div class="nanoGalleryBreadcrumb"></div>').appendTo(element);
		}
		g_containerParent=jQuery('<div class="nanoGalleryContainerParent"></div>').appendTo(element);
		g_containerThumbnails=jQuery('<div class="nanoGalleryContainer"></div>').appendTo(g_containerParent);

		if( g_options.viewer != 'fancybox' ) {
//			g_containerViewer=jQuery('<div class="nanoGalleryViewer" style="visibility:hidden"></div>').appendTo(element);
		}


		g_path2timthumb = ""; //timthumbFolder;

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
		
		$(window).resize(function() { 
			RePositionElements() ;
			//SetContainerWidth(); 
		});

	};
	
	// ##### LIST OF ITEMS IN OPTIONS #####
	function ProcessItemOption() {
		g_itemInfo.length=0;

		jQuery.each(g_options.items, function(i,item){
			var newObj=new Array(5);
			newObj['title']=item.title;
			if( item.srct !== undefined && item.srct.length>0 ) {
				newObj['thumbsrc']=g_options.itemsBaseURL+item.srct;
			}
			else {
				newObj['thumbsrc']=g_options.itemsBaseURL+item.src;
			}
			newObj['src']=g_options.itemsBaseURL+item.src;
			newObj['description']=item.description;
			newObj['kind']='image';

			g_itemInfo.push(newObj);
		});
		
		renderGallery();
	};

	// ##### LIST OF HREF ATTRIBUTES #####
	function ProcessHREF(elements) {
		g_itemInfo.length=0;

		jQuery.each(elements, function(i,item){
			var newObj=new Array(5);
			newObj['title']=jQuery(item).text();
			if( jQuery(item).attr('data-ngthumb') !== undefined && jQuery(item).attr('data-ngthumb').length>0 ) {
				newObj['thumbsrc']=g_options.itemsBaseURL+jQuery(item).attr('data-ngthumb');
			}
			else {
				newObj['thumbsrc']=g_options.itemsBaseURL+jQuery(item).attr('href');
			}
			newObj['src']=g_options.itemsBaseURL+jQuery(item).attr('href');
			newObj['description']=jQuery(item).attr('data-ngdesc');
			if( jQuery(item).attr('data-ngdesc') !== undefined && jQuery(item).attr('data-ngdesc').length>0 ) {
				newObj['description']=jQuery(item).attr('data-ngdesc');
			}
			else {
				newObj['description']='';
			}
			newObj['kind']='image';
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

							//var found=false;
							//if( g_blackList !== null ) {
							//	//blackList : ignore album cointaining one of the specified keyword in the title
							//	var s=itemTitle.toUpperCase();
							//	for( var j=0; j<g_blackList.length; j++) {
							//		if( s.indexOf(g_blackList[j]) !== -1 ) { return true; }
							//	}
							//}
							
							//if( !found ) {
							if( CheckAlbumName(itemTitle) ) {
								newObj=new Array(5);
								newObj['title']=itemTitle;
								newObj['thumbsrc']=itemThumbURL;
								newObj['src']=itemID;
								newObj['description']=itemDescription;
								newObj['kind']=itemKind;
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
						newObj['title']=itemTitle;
						newObj['thumbsrc']=itemThumbURL;
						newObj['src']=item.url_o;			//imgUrl;
						newObj['description']=itemDescription;
						newObj['kind']=itemKind;
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

					//var found=false;
					//if( g_blackList != null && kind == 'album' ) {
					//	//blackList : ignore album cointaining one of the specified keyword in the title
					//	var s=itemTitle.toUpperCase();
					//	for( var j=0; j<g_blackList.length; j++) {
					//		if( s.indexOf(g_blackList[j]) !== -1 ) { return true; }
					//	}
					//}
					
					//if( !found ) {
					
					var ok=true;
					if( kind == 'album' ) {
						if( !CheckAlbumName(itemTitle) ) { ok=false; }
					}
					
					if( ok ) {
						newObj=new Array(5);
						newObj['title']=itemTitle;
						newObj['thumbsrc']=itemThumbURL;
						if( kind == 'album' ) 
							newObj['src']=itemID;
						else
							newObj['src']=imgUrl;
						newObj['description']=itemDescription;
						newObj['kind']=itemKind;
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
		jQuery.each(g_itemInfo, function(i,item){
			
			var newDivTemp =jQuery('<div class="container"></div>');	
			jQuery(newDivTemp).append('<div class="imgContainer" style="width:'+g_options.thumbnailWidth+'px;height:'+g_options.thumbnailHeight+'px;"><img class="image" src="'+item['thumbsrc']+'" style="max-width:'+g_options.thumbnailWidth+'px;max-height:'+g_options.thumbnailHeight+'px;"></div>');
			if( item['kind'] == 'album' ) {
				if( g_options.displayCaption == true && g_options.displayCaptionFolder == true ) {
					jQuery(newDivTemp).append('<div class="iconInfo"></div>');
					var newLabel=jQuery(newDivTemp).append('<div class="labelImage" style="width:'+g_options.thumbnailWidth+'px;"><div class="labelFolderTitle">'+item['title']+'</div><div class="labelDescription">'+item['description']+'</div></div>');
				}
			}
			else {
				var s=item['title'];
				if( g_options.displayCaption == true && g_options.displayCaptionImage == true ) {
					if( s ===undefined || s.length == 0 ) { s='&nbsp;'; }
					jQuery(newDivTemp).append('<div class="iconInfo"></div>');
					var newLabel=jQuery(newDivTemp).append('<div class="labelImage" style="width:'+g_options.thumbnailWidth+'px;"><div class="labelImageTitle">'+s+'</div><div class="labelDescription">'+item['description']+'</div></div>');
				}
			}
			jQuery(newDivTemp).css('opacity','0');
			
			var newDiv =jQuery(newDivTemp).appendTo(g_containerThumbnails); //.animate({ opacity: 1},1000, 'swing');	//.show('slow'); //.fadeIn('slow').slideDown('slow');
			if( w == 0 ) { w=jQuery(newDiv).outerWidth(true); }
			if( h == 0 ) { h=jQuery(newDiv).outerHeight(true); }
			jQuery(newDiv).data("index",i);
			
			newDiv.click(function() {
				var n=jQuery(this).data("index");
				if( g_itemInfo[n]['kind'] == 'album' ) {
					
					if( g_options.kind == 'picasa' )
						// open Picasa/Google+ album
						PicasaGetItems(g_itemInfo[n]['src'],g_itemInfo[n]['title']);
					else
						// Open Flickr photoset
						FlickrGetItems(g_itemInfo[n]['src'],g_itemInfo[n]['title']);
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
		var url=g_itemInfo[g_viewerCurrentItem]['src'];
		
		//jQuery(g_containerViewer).children().remove();
		g_containerViewer=jQuery('<div class="nanoGalleryViewer" style="visibility:hidden"></div>').appendTo(g_baseControl);
		g_containerViewerContent=jQuery('<div class="content"><img class="image" src="" style="position:absolute;top:0;bottom:0;left:0;right:0;margin:auto;"><div class="contentAreaPrevious"></div><div class="contentAreaNext"></div></div>').appendTo(g_containerViewer);
		g_containerViewerCloseFloating=jQuery('<div class="closeButtonFloating"></div>').appendTo(g_containerViewer);
		//g_containerViewerCloseFloating=jQuery('<div class="closeButtonFloating"></div>').appendTo(jQuery(g_containerViewerContent).find('img'));
		g_containerViewerToolbar=jQuery('<div class="toolbar"><div class="previousButton"></div><div class="nextButton"></div><div class="closeButton"></div><div class="label"><div class="title"></div><div class="description"></div></div>').appendTo(g_containerViewer);


		var highest_index = 0;
		jQuery("[z-index]").each(function() {
			if ($(this).css("z-index") > highest_index) {
				 highest_index = $(this).attr("z-index");
			}
		});
		jQuery(g_containerViewer).css('z-index',highest_index+1);

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
		var url=g_itemInfo[g_viewerCurrentItem]['src'];
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

		//alert(jQuery(g_containerViewerToolbar).css("height"));
		
		var elt=jQuery(g_containerViewerContent).find('img');
		
		
		var contentOuterWidthV=Math.abs(jQuery(g_containerViewerContent).outerHeight(true)-jQuery(g_containerViewerContent).height());	// vertical margin+border+padding
		var contentOuterWidthH=Math.abs(jQuery(g_containerViewerContent).outerHeight(true)-jQuery(g_containerViewerContent).height());	// horizontal margin+border+padding
		
		var imgBorderV=jQuery(elt).outerHeight(false)-jQuery(elt).innerHeight();
		var imgBorderH=Math.abs(jQuery(elt).outerWidth(false)-jQuery(elt).innerWidth());
		
		//var tmargin=jQuery(elt).css('margin');		//Math.abs(jQuery(elt).outerHeight(true)-jQuery(elt).outerHeight());
		//var tpadding=jQuery(elt).css('padding-top');
		var imgPaddingV=Math.abs(jQuery(elt).innerHeight()-jQuery(elt).height());
		var imgPaddingH=Math.abs(jQuery(elt).innerHeight()-jQuery(elt).height());
		
		//alert(tpadding);
		//alert(tmargin);
		//alert(jQuery(g_containerViewerContent).find('img').outerHeight(false) +"-"+ jQuery(g_containerViewerContent).find('img').innerHeight());
		var tV=imgBorderV+imgPaddingV;	//+tmargin;
		var tH=imgBorderH+imgPaddingH;	//+tmargin;

		//var h=jQuery(window).height()jQuery(g_containerViewerCloseFloating).outerHeight(true)-jQuery(g_containerViewerToolbar).outerHeight(true)-contentOuterWidthV;
		var h=jQuery(window).height()-jQuery(g_containerViewerToolbar).outerHeight(true)-contentOuterWidthV;
		var w=jQuery(window).width()-contentOuterWidthH;
		jQuery(g_containerViewerContent).css({
			"height":h,
			"width":w		//'100%'
			});

		
		jQuery(g_containerViewerContent).children('img').css({
			"max-width":w-tV,	//jQuery(g_containerViewerContent).width(),
			"max-height":h-tH
		});
		
		var pt=(jQuery(g_containerViewerContent).find('img').outerHeight(true)-jQuery(g_containerViewerContent).find('img').outerHeight())/2;
		var pl=(jQuery(g_containerViewerContent).find('img').outerWidth(true)-jQuery(g_containerViewerContent).find('img').outerWidth())/2;
		//jQuery(g_containerViewerCloseFloating).css(p);
		//alert(p);
		//p=jQuery(g_containerViewerContent).find('img').css('left');
		jQuery(g_containerViewerCloseFloating).css('top',pt-11);
		jQuery(g_containerViewerCloseFloating).css('left',pl-11);
		//alert(p.top);
		
		
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
	
	
	
}




