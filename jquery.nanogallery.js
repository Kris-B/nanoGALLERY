/*
 * nanoGallery v3.2.0
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
			topLabel:'home',
			displayBreadcrumb:true,
			displayCaption:true,
			thumbnailWidth:230,
			thumbnailHeight:154,
			theme:'default'
		}, options );
		
		return this.each(function() {
			var nanoGALLERY_obj = new nanoGALLERY();
			nanoGALLERY_obj.Initiate(this,settings);
		});
	};
}( jQuery ));


function nanoGALLERY() {
 	var g_options=null;
	var g_containerFolder=null;
	var g_containerBreadcrumb=null;
	var g_path2timthumb="";
	var g_picasaThumbSize=64;
	var g_picasaThumbAvailableSizes=new Array(32, 48, 64, 72, 94, 104, 110, 128, 144, 150, 160, 200, 220, 288, 320, 400, 512, 576, 640, 720, 800, 912, 1024, 1152, 1280, 1440, 1600);
	var g_flickrThumbSize='s';
	var g_flickrThumbAvailableSizes=new Array(75,100,150,240,320,500,640,800,1024);		//see http://www.flickr.com/services/api/misc.urls.html
	var g_flickrThumbAvailableSizesStr=new Array('s','t','q','m','n','-','z','c','b');
	var g_itemInfo=null;	//new Array();
	var g_flickrApiKey="2f0e634b471fdb47446abcb9c5afebdc";
	var g_blackList=null;
	
	this.Initiate=function(element, params) {
		"use strict";
		g_options=params;
	
		if( g_options.blackList !='' ) { g_blackList=g_options.blackList.toUpperCase().split('|'); }
		jQuery(element).addClass('nanogallery_theme_'+g_options.theme);
	
		if( g_options.photoset !== undefined ) {
			if( g_options.photoset.length > 0) { g_options.displayBreadcrumb=false; }
		}
		else { g_options.photoset=''; }
		if( g_options.album !== undefined ) {
			if( g_options.album.length > 0 ) { g_options.displayBreadcrumb=false; }
		}
		else { g_options.album=''; }
	
		if( g_options.displayBreadcrumb == true ) { g_containerBreadcrumb =jQuery('<div class="nanoGalleryBreadcrumb"></div>').appendTo(element); }
		g_containerFolder =jQuery('<div class="nanoGalleryContainer"></div>').appendTo(element);
		g_path2timthumb = ""; //timthumbFolder;


		var si=0;
		if( g_options.thumbnailWidth > g_options.thumbnailHeight ) { si=g_options.thumbnailWidth; }
		else { si=g_options.thumbnailHeight; }

		switch(g_options.kind) {
			case "getsimple":
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
				
			case "flickr":
				for( i=0; i<g_flickrThumbAvailableSizes.length; i++) {
					g_flickrThumbSize=g_flickrThumbAvailableSizesStr[i];
					if( si < g_flickrThumbAvailableSizes[i] ) {
						break;
					}
				}
				FlickrGetItems(g_options.photoset,g_options.topLabel);
				break;
			default:
				for(var i=0; i<g_picasaThumbAvailableSizes.length; i++) {
					g_picasaThumbSize=g_picasaThumbAvailableSizes[i];
					if( si < g_picasaThumbAvailableSizes[i] ) {
						break;
					}
				}
				//PicasaGetItems(g_options.album,g_options.topLabel);
				PicasaGetItems('',g_options.topLabel);
				break;
		}

	};
	
	// ##### FLICKR STORAGE #####
	function FlickrGetItems( itemID, albumLabel ) {
		var obj=null;

		// breadcrumb
		if( g_options.displayBreadcrumb == true ) {
			if( albumLabel != "" ) {
				if( jQuery(g_containerBreadcrumb).children().length > 0 ) {
					jQuery('<div class="separator">&nbsp;>&nbsp;</div>').appendTo(g_containerBreadcrumb);
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
		
		jQuery(g_containerFolder).children().remove();

		// RETRIEVE PHOTOSETS
		if( itemID == '' ) {
			var url = "http://api.flickr.com/services/rest/?&method=flickr.photosets.getList&api_key=" + g_flickrApiKey + "&user_id="+g_options.userID+"&format=json&jsoncallback=?";
			kind='album';

			// get the content and display it
			jQuery.ajaxSetup({ cache: false });
			jQuery.support.cors = true;
			jQuery.getJSON(url, function(data) {
				settingsObj = data;
				//g_itemInfo=new Array();
				g_itemInfo=new Array(data.photosets.photoset.length);

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

					if( g_blackList !== null ) {
						//blackList : ignore album cointaining one of the specified keyword in the title
						var found=false;
						var s=itemTitle.toUpperCase();
						for( var j=0; j<g_blackList.length; j++) {
							if( s.indexOf(g_blackList[j]) !== -1 ) { return true; }
						}
					}

					var newDiv =jQuery('<div class="container"></div>').appendTo(g_containerFolder);
					jQuery(newDiv).append('<div class="imgcont"><div class="nanoGalleryLoading"></div><img class="image" src="'+itemThumbURL+'"></div>');

					if( g_options.displayCaption == true ) {jQuery(newDiv).append('<div class="labelFolder">'+itemTitle+'</div>'); }
					//g_itemInfo[i]=new Array(itemTitle, itemThumbURL, itemID, itemDescription,itemKind);
					g_itemInfo[i]=new Array(5);
					g_itemInfo[i]['title']=itemTitle;
					g_itemInfo[i]['thumbsrc']=itemThumbURL;
					g_itemInfo[i]['src']=itemID;
					g_itemInfo[i]['description']=itemDescription;
					g_itemInfo[i]['kind']=itemKind;
					
					jQuery(newDiv).data("index",i);
					newDiv.click(function() {
						var n=jQuery(this).data("index");
						FlickrGetItems(g_itemInfo[i]['src'],g_itemInfo[i]['title']);
					});
				});
				SetContainerSize();

			});		
			
		}
		// RETRIEVE PHOTOS
		else {
			var url = "http://api.flickr.com/services/rest/?&method=flickr.photosets.getPhotos&api_key=" + g_flickrApiKey + "&photoset_id="+itemID+"&extras=views,url_s,url_o,url_m&format=json&jsoncallback=?";
			kind='photo';

			// get the content and display it
			jQuery.ajaxSetup({ cache: false });
			jQuery.support.cors = true;
			jQuery.getJSON(url, function(data) {
				settingsObj = data;
				//g_itemInfo=new Array();
				g_itemInfo=new Array(data.photoset.photo.length);

				jQuery.each(data.photoset.photo, function(i,item){
					//Get the title 
					itemTitle = item.title._content;
					itemID=item.id;
					//Get the description
					itemDescription='';
					itemThumbURL = "http://farm" + item.farm + ".staticflickr.com/" + item.server + "/" + item.id +"_" + item.secret + "_"+g_flickrThumbSize+".jpg";
					imgUrl = "http://farm" + item.farm + ".staticflickr.com/" + item.server + "/" + item.id + "_" + item.secret + "_o.jpg";

					itemKind=kind;

					var newDiv =jQuery('<div class="container"></div>').appendTo(g_containerFolder);
					jQuery(newDiv).append('<div class="imgcont"><div class="nanoGalleryLoading"></div><img class="image" src="'+itemThumbURL+'"></div>');

					var s=itemTitle;
					if( g_options.displayCaption == true ) {
						if( s ===undefined || s.length == 0 ) { s=i+1; }
						jQuery(newDiv).append('<div class="labelImage">'+s+'</div>');
					}
					//g_itemInfo[i]=new Array(itemTitle, itemThumbURL, imgUrl, itemDescription, itemKind);
					g_itemInfo[i]=new Array(5);
					g_itemInfo[i]['title']=itemTitle;
					g_itemInfo[i]['thumbsrc']=itemThumbURL;
					g_itemInfo[i]['src']=imgUrl;
					g_itemInfo[i]['description']=itemDescription;
					g_itemInfo[i]['kind']=itemKind;

					
					jQuery(newDiv).data("index",i);
					newDiv.click(function() { OpenFancyBox(this); });
				});
				SetContainerSize();
			});		
		}
	};


	// ##### PICASA STORAGE #####
	function PicasaGetItems( itemID, albumLabel ) {
		var kind='';
		jQuery(g_containerFolder).children().remove();
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
					jQuery('<div class="separator">&nbsp;>&nbsp;</div>').appendTo(g_containerBreadcrumb);
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
		jQuery.getJSON(url, function(data) {
			g_settingsObj = data;
			g_itemInfo=new Array(data.feed.entry.length);
			
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
				imgUrl=data.media$group.media$content[0].url
				itemKind=kind;

				if( g_blackList != null && kind == 'album' ) {
					//blackList : ignore album cointaining one of the specified keyword in the title
					var found=false;
					var s=itemTitle.toUpperCase();
					for( var j=0; j<g_blackList.length; j++) {
						if( s.indexOf(g_blackList[j]) !== -1 ) { return true; }
					}
				}

				var newDiv =jQuery('<div class="container"></div>').appendTo(g_containerFolder);
				jQuery(newDiv).append('<div class="imgcont"><div class="nanoGalleryLoading"></div><img class="image" src="'+itemThumbURL+'"></div>');
				if( kind == 'album' ) {
					if( g_options.displayCaption == true ) { jQuery(newDiv).append('<div class="labelFolder">'+itemTitle+'</div>'); }
					//g_itemInfo[i]=new Array(itemTitle, itemThumbURL, itemID, itemDescription,itemKind);
					g_itemInfo[i]=new Array(5);
					g_itemInfo[i]['title']=itemTitle;
					g_itemInfo[i]['thumbsrc']=itemThumbURL;
					g_itemInfo[i]['src']=itemID;
					g_itemInfo[i]['description']=itemDescription;
					g_itemInfo[i]['kind']=itemKind;
				}
				else {
					var s=itemDescription;
					if( g_options.displayCaption == true ) {
						if( s.length == 0 ) { s=i+1; }
						jQuery(newDiv).append('<div class="labelImage">'+s+'</div>');
					}
					//g_itemInfo[i]=new Array(itemTitle, itemThumbURL, imgUrl, itemDescription, itemKind);
					g_itemInfo[i]=new Array(5);
					g_itemInfo[i]['title']=itemTitle;
					g_itemInfo[i]['thumbsrc']=itemThumbURL;
					g_itemInfo[i]['src']=imgUrl;
					g_itemInfo[i]['description']=itemDescription;
					g_itemInfo[i]['kind']=itemKind;
				}

				jQuery(newDiv).data("index",i);
				newDiv.click(function() {
					var n=jQuery(this).data("index");
					if( g_itemInfo[n]['kind'] == 'album' ) {
						PicasaGetItems(g_itemInfo[i]['src'],g_itemInfo[i]['title']);
					}
					else {
						OpenFancyBox(this);
					}
				});
			});
			SetContainerSize();

		})
		.error( function(XMLHttpRequest, textStatus, errorThrown) {
			alert("Error with Picasa: " + textStatus);
		});
	};



	function OpenFancyBox(element) {
		var n=jQuery(element).data("index");
		var lstImages=new Array();
		lstImages[0]=g_itemInfo[n]['src'];
		for( var j=n+1; j<g_itemInfo.length; j++) {
			lstImages[lstImages.length]=g_itemInfo[j]['src'];
		}
		for( var j=0; j<n; j++) {
			lstImages[lstImages.length]=g_itemInfo[j]['src'];
		}
		jQuery.fancybox.open(lstImages,{'autoPlay':false, 'nextEffect':'fade', 'prevEffect':'fade','scrolling':'no',
			helpers		: {	buttons	: { 'position' : 'bottom'} }
		});
	};
	
	function SetContainerSize() {
		jQuery(g_containerFolder).find('.imgcont').css('width',g_options.thumbnailWidth);
		jQuery(g_containerFolder).find('.imgcont').css('height',g_options.thumbnailHeight);
		jQuery(g_containerFolder).find('img').css('maxWidth',g_options.thumbnailWidth);
		jQuery(g_containerFolder).find('img').css('maxHeight',g_options.thumbnailHeight);
		jQuery(g_containerFolder).find('.nanoGalleryLoading').css('top',(g_options.thumbnailHeight-10)/2);
		jQuery(g_containerFolder).find('.nanoGalleryLoading').css('left',(g_options.thumbnailWidth-10)/2);
	};
	
}




