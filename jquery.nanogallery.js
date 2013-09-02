/*
 * nanoGALLERY for jQuery v3.2.3
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
			displayCaptionFolder:true,
			displayCaptionImage:true,
			thumbnailWidth:230,
			thumbnailHeight:154,
			theme:'default',
			items:null,
			itemsBaseURL:'',
			maxItemsPerLine:0
		}, options );
		
		return this.each(function() {
			var nanoGALLERY_obj = new nanoGALLERY();
			nanoGALLERY_obj.Initiate(this,settings);
		});
	};
}( jQuery ));


function nanoGALLERY() {
 	var g_options=null;
	var g_containerParent=null;
	var g_containerFolder=null;
	var g_containerBreadcrumb=null;
	var g_path2timthumb="";
	var g_itemInfo=[];
	var g_oneItemWidth=100;
	var g_blackList=null;
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
	
		if( g_options.displayBreadcrumb == true && ( g_options.kind=='picasa' || g_options.kind=='flickr')) { g_containerBreadcrumb =jQuery('<div class="nanoGalleryBreadcrumb"></div>').appendTo(element); }
		g_containerParent=jQuery('<div class="nanoGalleryContainerParent"></div>').appendTo(element);
		g_containerFolder =jQuery('<div class="nanoGalleryContainer"></div>').appendTo(g_containerParent);
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
						alert('nanoGallery - error: no image to process.');
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
		
		$(window).resize(function() { SetContainerWidth(); });

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
		
		//jQuery(g_containerFolder).children().remove();

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

						var found=false;
						if( g_blackList !== null ) {
							//blackList : ignore album cointaining one of the specified keyword in the title
							var s=itemTitle.toUpperCase();
							for( var j=0; j<g_blackList.length; j++) {
								if( s.indexOf(g_blackList[j]) !== -1 ) { return true; }
							}
						}
						
						if( !found ) {
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
				},
				"error": function(xOptions,textStatus) {
					alert("Could not retrieve Flickr photoset list: "+textStatus);
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
					alert("Could not retrieve Flickr photo list: "+textStatus);
				}
			});

		}
	};


	// ##### PICASA STORAGE #####
	function PicasaGetItems( itemID, albumLabel ) {
		var kind='';
		//jQuery(g_containerFolder).children().remove();
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

					var found=false;
					if( g_blackList != null && kind == 'album' ) {
						//blackList : ignore album cointaining one of the specified keyword in the title
						var s=itemTitle.toUpperCase();
						for( var j=0; j<g_blackList.length; j++) {
							if( s.indexOf(g_blackList[j]) !== -1 ) { return true; }
						}
					}
					
					if( !found ) {
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
				alert("Could not retrieve Picasa/Google+ data: "+textStatus);
			}
		});
		
	

	};



	// ##### DISPLAY THE GALLERY #####
	function renderGallery() {
		var elt=jQuery(g_containerFolder).parent();
		jQuery(elt).animate({opacity: 0},100, function(){
			jQuery(g_containerFolder).children().remove();
			jQuery(elt).css('opacity','1');
			renderGallery2();
		});
	
	};
	
	function renderGallery2() {
		var w=0;
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
			
			var newDiv =jQuery(newDivTemp).appendTo(g_containerFolder); //.animate({ opacity: 1},1000, 'swing');	//.show('slow'); //.fadeIn('slow').slideDown('slow');
			if( w == 0 ) { w=jQuery(newDiv).outerWidth(true); }
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
					OpenFancyBox(this);
				}
			});
		});
		
		g_oneItemWidth=w;
		SetContainerWidth();
		
		// animation to display the thumbnails
		jQuery(g_containerFolder).find('.container').each(function(i) {
			jQuery(this).delay((i++) * 50).fadeTo(200, 1);
		});

	};
	
	function SetContainerWidth() {
		// set the max number of items per line
		if( g_oneItemWidth > 0 ) {
			var wcont=jQuery(g_containerParent).width();
			if( g_options.maxItemsPerLine > 0 ) {
				if( g_options.maxItemsPerLine*g_oneItemWidth <= wcont ) {
					jQuery(g_containerFolder).css('max-width',g_options.maxItemsPerLine*g_oneItemWidth);
				}
				else {
					var w=parseInt(wcont/g_oneItemWidth)
					jQuery(g_containerFolder).css('max-width',w*g_oneItemWidth);
				}
			}
			else {
				var w=parseInt(wcont/g_oneItemWidth)
				jQuery(g_containerFolder).css('max-width',w*g_oneItemWidth);
			}
		}
	
	};


	// ##### DISPLAY IMAGE #####
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




