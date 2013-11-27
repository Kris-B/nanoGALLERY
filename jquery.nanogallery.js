/**!
 * @preserve nanoGALLERY v4.0.2
 * Plugin for jQuery by Christophe Brisbois
 * http://nanogallery.brisbois.fr
 * 
 * External components:
 *  - jQuery (http://www.jquery.com)
 * 	- jQuery Color plugin - is embedded
 *  - Transit (http://ricostacruz.com/jquery.transit) - optional
 *  - fancybox (http://fancyapps.com) - optional
 */


(function( $ ) {
	jQuery.fn.nanoGallery = function(options) {

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
			//displayCaption:true,
			//displayCaptionFolder:true,
			//displayCaptionImage:true,
			theme:'default',
			colorScheme:'default',
			colorSchemeViewer:'default',
			items:null,
			itemsBaseURL:'',
			maxItemsPerLine:0,
			maxWidth:0,
			viewer:'internal',
			//thumbnailHoverEffect:null,
			//thumbnailHoverEffect:'imageFlipVertical,borderLighter',
			thumbnailWidth:230,
			thumbnailHeight:154,
			thumbnailHoverEffect:null,
			//thumbnailHoverEffect:[{'name':'borderLighter','duration':300}],
			//thumbnailHoverEffect:[{'name':'imageFlipHorizontal','duration':300}],
			thumbnailLabel:{position:'overImageOnBottom',display:true,displayDescription:true},
			preset:'none'
		}, options );
		
		return this.each(function() {
			var nanoGALLERY_obj = new nanoGALLERY();
			nanoGALLERY_obj.Initiate(this,settings);
		});
	};
}( jQuery ));

(function( $ ) {
	jQuery.fn.nanoGalleryDemo = function(options) {
		var g_containerDemo=null;
		var g_containerDemoPanel=null;
		var g_containerNew=null;
		var g_save=null;
		
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
			//displayCaption:true,
			//displayCaptionFolder:true,
			//displayCaptionImage:true,
			theme:'default',
			colorScheme:'default',
			colorSchemeViewer:'default',
			items:null,
			itemsBaseURL:'',
			maxItemsPerLine:0,
			maxWidth:0,
			viewer:'internal',
			//thumbnailHoverEffect:null,
			//thumbnailHoverEffect:'imageFlipVertical,borderLighter',
			thumbnailWidth:230,
			thumbnailHeight:154,
			thumbnailHoverEffect:null,
			//thumbnailHoverEffect:[{'name':'borderLighter','duration':300}],
			thumbnailLabel:{position:'overImageOnBottom',display:true,displayDescription:false},
			preset:'none'
		}, options );


		return this.each(function(index) {
			g_save=jQuery(this)[0].outerHTML;
			g_containerDemo =jQuery('<div class="nanoGalleryDemo" style="padding:5px"></div>').replaceAll(this);
		
			var sHoverEffects='<option style="color:#000">none</option>';
			sHoverEffects+='<option style="color:#000">slideUp</option><option style="color:#000">slideDown</option><option style="color:#000">slideLeft</option><option style="color:#000">slideRight</option>';
			sHoverEffects+='<option style="color:#000">imageSlideUp</option><option style="color:#000">imageSlideDown</option><option style="color:#000">imageSlideLeft</option><option style="color:#000">imageSlideRight</option>';
			sHoverEffects+='<option style="color:#000">labelAppear</option><option style="color:#000">labelAppear75</option><option style="color:#000">labelSlideDown</option><option style="color:#000">labelSlideUp</option>';
			sHoverEffects+='<option style="color:#000">labelOpacity50</option><option style="color:#000">imageOpacity50</option><option style="color:#000">descriptionSlideUp</option>';
			sHoverEffects+='<option style="color:#000">borderLighter</option><option style="color:#000">borderDarker</option><option style="color:#000">imageInvisible</option>';

			sHoverEffects+='<option style="color:#000"></option><option style="color:#000">imageScale150*</option><option style="color:#000">imageScale150Outside*</option><option style="color:#000">scale120*</option>';
			sHoverEffects+='<option style="color:#000">overScale*</option>';
			sHoverEffects+='<option style="color:#000">overScaleOutside*</option><option style="color:#000">scaleLabelOverImage*</option>';



			sHoverEffects+='<option style="color:#000">imageFlipHorizontal*</option><option style="color:#000">imageFlipVertical*</option>';
			sHoverEffects+='<option style="color:#000">rotateCornerBR*</option><option style="color:#000">rotateCornerBL*</option><option style="color:#000">imageRotateCornerBR*</option><option style="color:#000">imageRotateCornerBL*</option>';

			var sPanel='<div style="line-height:normal;margin:10px auto 30px auto;width:400px;text-align:center;border:1px solid #555;background:#000;padding:5px;font-size:1.2em;"><span style="color:#d3d3d3;">nano</span><span style="color:#6e6;">GALLERY</span> - demonstration panel</div>';
			sPanel+='<div style="display:inline-block;">Thumbnail hover effects:&nbsp;<select name="lHoverEffect1" style="color:#000">'+sHoverEffects+'</select>';
			sPanel+='&nbsp;<select name="lHoverEffect2" style="color:#000">'+sHoverEffects+'</select>';
			sPanel+='&nbsp;<select name="lHoverEffect3" style="color:#000">'+sHoverEffects+'</select></div>';
			sPanel+='<br><div style="display:inline-block;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*: requires Transit plugin</div>';
			sPanel+='<br><br><div style="display:inline-block;">Thumbnail size:&nbsp;Width (px):&nbsp;<input type="text" name="thumbWidth" value="120" style="width:50px;color:#000">&nbsp;&nbsp;Height (px):&nbsp;<input type="text" name="thumbHeight" value="120" style="width:50px;color:#000"></div>';
			//sPanel+='<br><br><div style="display:inline-block;">Maximum number of thumbnails per line:&nbsp;<input type="text" name="thumbMaxItemsPerLine" value="" style="width:50px;color:#000"></div>';
			//sPanel+='<div style="display:inline-block;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Maximum gallery width (px): <input type="text" name="thumbMaxWidth" value="" style="width:50px;color:#000"></div>';
			sPanel+='<br><div>Thumbnail label: </div>';
			sPanel+='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Position: <form style="display:inline-block;"><input type="radio" name="thumbnailLabelPosition" value="overImageOnBottom" checked style="margin:0">overImageOnBottom&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="radio" name="thumbnailLabelPosition" value="overImageOnTop" style="margin:0">overImageOnTop&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="radio" name="thumbnailLabelPosition" value="onBottom" style="margin:0">onBottom</form>';
			sPanel+='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox" name="thumbnailLabelDisplay" value="true" checked style="margin:0">Display label';
			sPanel+='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox" name="thumbnailLabelDisplayDescription" value="true" style="margin:0">Display description';
			sPanel+='<br><div>Color scheme: <br>';
			sPanel+='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<form style="display:inline-block;"><input type="radio" name="colorScheme" value="none" style="margin:0">none &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="radio" name="colorScheme" value="dark" checked style="margin:0">dark &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="radio" name="colorScheme" value="darkRed" style="margin:0">darkRed &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
			sPanel+='<input type="radio" name="colorScheme" value="darkGreen" style="margin:0">darkGreen &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="radio" name="colorScheme" value="darkBlue" style="margin:0">darkBlue &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
			sPanel+='<input type="radio" name="colorScheme" value="darkOrange" style="margin:0">darkOrange &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="radio" name="colorScheme" value="light" style="margin:0">light';
			sPanel+='</form></div>';
			sPanel+='<div>CSS file: <br>';
			sPanel+='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<form style="display:inline-block;"><input type="radio" name="cssFile" value="default" checked style="margin:0">default &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="radio" name="cssFile" value="clean" style="margin:0">clean</form></div>';
			sPanel+='<div>Background color (not a nanoGALLERY parameter): <br>';
			sPanel+='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<form style="display:inline-block;"><input type="radio" name="backgroundColor" value="dark" checked style="margin:0">Dark&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="radio" name="backgroundColor" value="light" style="margin:0">Light</form></div>';


			sPanel+='<div style="display:table;margin:auto;"><button name="bGo" "type="button" style="color:#000;padding:5px 15px;margin:5px;">--> Launch</button></div>';

			sPanel+='<hr style="margin:0px;"><div style="display:table;margin:15px auto;text-align:center;">';
			sPanel+='<button name="bPreset1" "type="button" style="color:#000;padding:4px;">Preset 1</button>';
			sPanel+='<button name="bPreset2" type="button" style="color:#000;padding:4px;">Preset 2</button>';
			sPanel+='<button name="bPreset3" type="button" style="color:#000;padding:4px;">Preset 3</button>';
			sPanel+='<button name="bPreset4" type="button" style="color:#000;padding:4px;">Preset 4</button>';
			sPanel+='<button name="bPreset5" type="button" style="color:#000;padding:4px;">Preset 5</button></div>';
			g_containerDemoPanel=jQuery(g_containerDemo).append('<div class="nanoGalleryDemoPanel" style="display:table;border:2px solid #666;background:#555;margin:10px auto;padding:5px;font-size:0.8em;">'+sPanel+'</div>');

			g_containerNew=jQuery(g_save).appendTo(g_containerDemo);
			jQuery(g_containerDemoPanel).find('[name=lHoverEffect1]').val('borderLighter');


			var nanoGALLERY_obj = new nanoGALLERY();
			nanoGALLERY_obj.Initiate(g_containerNew,settings);

			jQuery(g_containerDemoPanel).find('button[name=bGo]').on("click",function(){
				runDemo();
			});
			
			jQuery(g_containerDemoPanel).find('button[name=bPreset1]').on("click",function(){
				setPreset('borderLighter','imageSlideRight','none','overImageOnBottom',true,true,'dark');
			});
			jQuery(g_containerDemoPanel).find('button[name=bPreset2]').on("click",function(){
				setPreset('imageRotateCornerBL*','scale120*','borderLighter','overImageOnBottom',true,true,'dark');
			});
			jQuery(g_containerDemoPanel).find('button[name=bPreset3]').on("click",function(){
				setPreset('imageScale150*','labelSlideUp','none','overImageOnBottom',true,false,'dark');
			});
			jQuery(g_containerDemoPanel).find('button[name=bPreset4]').on("click",function(){
				setPreset('imageInvisible','imageScale150Outside*','none','overImageOnBottom',true,false,'light');
			});
			jQuery(g_containerDemoPanel).find('button[name=bPreset5]').on("click",function(){
				setPreset('descriptionSlideUp','borderLighter','none','overImageOnBottom',true,true,'dark');
			});
		});

		function setPreset(hoverEffect1,hoverEffect2,hoverEffect3,thumbnailLabelPosition,thumbnailLabelDisplay,thumbnailLabelDisplayDescription,backgroundColor) {
			jQuery(g_containerDemoPanel).find('[name=lHoverEffect1]').val(hoverEffect1);
			jQuery(g_containerDemoPanel).find('[name=lHoverEffect2]').val(hoverEffect2);
			jQuery(g_containerDemoPanel).find('[name=lHoverEffect3]').val(hoverEffect3);
			jQuery(g_containerDemoPanel).find('input:radio[name=thumbnailLabelPosition]').val([thumbnailLabelPosition]);
			jQuery(g_containerDemoPanel).find('[name=thumbnailLabelDisplay]').prop('checked',thumbnailLabelDisplay);
			jQuery(g_containerDemoPanel).find('[name=thumbnailLabelDisplayDescription]').prop('checked',thumbnailLabelDisplayDescription);
			jQuery(g_containerDemoPanel).find('input:radio[name=backgroundColor]').val([backgroundColor]);
			runDemo();
		}
		
		function runDemo() {
			settings.thumbnailHoverEffect=[];
			var sTHE=jQuery(g_containerDemoPanel).find('[name=lHoverEffect1] option:selected').text();
			if( sTHE != 'none' && sTHE != '' ) {
				sTHE=sTHE.replace('*', '');
				settings.thumbnailHoverEffect.push({'name':sTHE,'duration':200,'durationBack':200,'easing':'swing','easingBack':'swing'});
			}
			sTHE=jQuery(g_containerDemoPanel).find('[name=lHoverEffect2] option:selected').text();
			if( sTHE != 'none' && sTHE != '' ) {
				sTHE=sTHE.replace('*', '');
				settings.thumbnailHoverEffect.push({'name':sTHE,'duration':200,'durationBack':200,'easing':'swing','easingBack':'swing'});
			}
			sTHE=jQuery(g_containerDemoPanel).find('[name=lHoverEffect3] option:selected').text();
			if( sTHE != 'none' && sTHE != '' ) {
				sTHE=sTHE.replace('*', '');
				settings.thumbnailHoverEffect.push({'name':sTHE,'duration':200,'durationBack':200,'easing':'swing','easingBack':'swing'});
			}
			var tW=+parseInt(jQuery(g_containerDemoPanel).find('[name=thumbWidth]').val(),10);
			if( tW >= 10 && tW <= 500) {
				jQuery(g_containerDemoPanel).find('[name=thumbWidth]').val(tW);	
				settings.thumbnailWidth=tW;
			}
			var tH=parseInt(jQuery(g_containerDemoPanel).find('[name=thumbHeight]').val(),10);
			if( tH>= 10 && tH <=500) {
				jQuery(g_containerDemoPanel).find('[name=thumbHeight]').val(tH);
				settings.thumbnailHeight=tH;
			}
			//var tMIPL=parseInt(jQuery(g_containerDemoPanel).find('[name=thumbMaxItemsPerLine]').val(),10);
			//if( tMIPL>= 0 ) {
			//	jQuery(g_containerDemoPanel).find('[name=thumbMaxItemsPerLine]').val(tMIPL);
			//	settings.maxItemsPerLine=tMIPL;
			//}
			//var tMW=parseInt(jQuery(g_containerDemoPanel).find('[name=thumbMaxWidth]').val(),10);
			//if( tMW>= 50 ) {
			//	jQuery(g_containerDemoPanel).find('[name=thumbMaxWidth]').val(tMW);
			//	settings.maxWidth=tMW;
			//}
			settings.thumbnailLabel.position=jQuery(g_containerDemoPanel).find('input[name=thumbnailLabelPosition]:checked',g_containerDemoPanel).val();
			settings.thumbnailLabel.display=jQuery(g_containerDemoPanel).find('[name=thumbnailLabelDisplay]').prop('checked');
			settings.thumbnailLabel.displayDescription=jQuery(g_containerDemoPanel).find('[name=thumbnailLabelDisplayDescription]').prop('checked');
			settings.colorScheme=jQuery(g_containerDemoPanel).find('input[name=colorScheme]:checked',g_containerDemoPanel).val();
			settings.theme=jQuery(g_containerDemoPanel).find('input[name=cssFile]:checked',g_containerDemoPanel).val();
			
			if( jQuery(g_containerDemoPanel).find('input[name=backgroundColor]:checked',g_containerDemoPanel).val() == 'dark' ) {
				jQuery(g_containerDemoPanel).css('background','#222');
			}
			else {
				jQuery(g_containerDemoPanel).css('background','#eee');
			}
			
			jQuery(g_containerNew).animate({opacity: 0,height:0},200).promise().done(function(){
			jQuery(g_containerNew).remove();
				g_containerNew=jQuery(g_save).appendTo(g_containerDemo);
				var nanoGALLERY_obj = new nanoGALLERY();
				nanoGALLERY_obj.Initiate(g_containerNew,settings);
				//jQuery(elt).css('opacity','1');
			});
		}

	};

	
	
}( jQuery ));


function nanoGALLERY() {
 	var g_options=null,
		g_baseControl=null,
		g_containerParent=null,
		g_containerDemo=null,
		g_containerThumbnails=null,
		g_containerBreadcrumb=null,
		g_containerViewerContainer=null,
		g_containerViewer=null,
		g_containerViewerDisplayed=false,
		g_containerThumbnailsDisplayed=false,
		g_containerViewerCloseFloating=null,
		g_containerViewerContent=null,
		g_containerViewerToolbar=null,
		g_path2timthumb="",
		g_itemInfo=[],
		g_oneThumbnailWidth=100,
		g_oneThumbnailWidthContainer=0,
		g_oneThumbnailHeight=100,
		g_oneThumbnailHeightContainer=0,
		g_oneThumbnailLabelTitleHeight=0,
		g_blackList=null,
		g_whiteList=null,
		g_albumList=null,
		// ### Picasa/Google+
		// square format : 32, 48, 64, 72, 104, 144, 150, 160 (cropped)
		// details: https://developers.google.com/picasa-web/docs/2.0/reference
		g_picasaThumbSize=64,
		g_picasaThumbAvailableSizes=new Array(32, 48, 64, 72, 94, 104, 110, 128, 144, 150, 160, 200, 220, 288, 320, 400, 512, 576, 640, 720, 800, 912, 1024, 1152, 1280, 1440, 1600),
		// ### Flickr
		// Details: http://www.flickr.com/services/api/misc.urls.html
		g_flickrThumbSize='s';
		g_flickrThumbAvailableSizes=new Array(75,100,150,240,320,500,640,800,1024),
		g_flickrThumbAvailableSizesStr=new Array('s','t','q','m','n','-','z','c','b'),
		g_flickrApiKey="2f0e634b471fdb47446abcb9c5afebdc",
		g_viewerCurrentItem=0,
		g_viewerPreviousItem=-1,
		g_betamax=-1,
		g_supportTransit=false;
	
	var g_colorScheme_default = {
		breadcrumb : { background:'#000', border:'1px dotted #555', color:'#ccc', colorHover:'#fff' },
		thumbnail : { background:'#000', border:'1px solid #000', labelBackground:'rgba(34, 34, 34, 0.75)', titleColor:'#eee', descriptionColor:'#ccc'}
	};
	var g_colorScheme_darkRed = {
		// #ffa3a3 #ff7373 #ff4040 #ff0000 #a60000
		breadcrumb : { background:'#a60000', border:'1px dotted #ff0000', color:'#ccc', colorHover:'#fff' },
		thumbnail : { background:'#a60000', border:'1px solid #ff0000', labelBackground:'rgba(134, 0, 0, 0.75)', titleColor:'#eee', descriptionColor:'#ccc'}
	};
	var g_colorScheme_darkGreen = {
		// #97e697 #67e667 #39e639 #00cc00 #008500
		breadcrumb : { background:'#008500', border:'1px dotted #00cc00', color:'#ccc', colorHover:'#fff' },
		thumbnail : { background:'#008500', border:'1px solid #00cc00', labelBackground:'rgba(0, 105, 0, 0.75)', titleColor:'#eee', descriptionColor:'#ccc'}
	};
	var g_colorScheme_darkBlue = {
		// #a0b0d7 #7080d7 #4a60d7 #162ea2 #071871
		breadcrumb : { background:'#071871', border:'1px dotted #162ea2', color:'#ccc', colorHover:'#fff' },
		thumbnail : { background:'#071871', border:'1px solid #162ea2', labelBackground:'rgba(7, 8, 81, 0.75)', titleColor:'#eee', descriptionColor:'#ccc'}
	};
	var g_colorScheme_darkOrange = {
		// #ffd7b7 #ffd773 #ffc840 #ffb600 #a67600
		breadcrumb : { background:'#a67600', border:'1px dotted #ffb600', color:'#ccc', colorHover:'#fff' },
		thumbnail : { background:'#a67600', border:'1px solid #ffb600', labelBackground:'rgba(134, 86, 0, 0.75)', titleColor:'#eee', descriptionColor:'#ccc'}
	};
	var g_colorScheme_light = {
		breadcrumb : { background:'#ddd', border:'1px dotted #999', color:'#eee', colorHover:'#000' },
		thumbnail : { background:'#fff', border:'1px solid #fff', labelBackground:'rgba(170, 170, 170, 0.75)', titleColor:'#fff', descriptionColor:'#eee'}
	};


	var g_colorSchemeViewer_default = {
		background:'rgba(1, 1, 1, 0.75)', imageBorder:'6px solid #f8f8f8', imageBoxShadow:'#888 0px 0px 20px', barBackground:'#222', barBorder:'2px solid #111', barColor:'#eee', barDescriptionColor:'#aaa'
	};
	var g_colorSchemeViewer_darkRed = {
		// #ffa3a3 #ff7373 #ff4040 #ff0000 #a60000
		background:'rgba(1, 1, 1, 0.75)', imageBorder:'6px solid #ffa3a3', imageBoxShadow:'#ff0000 0px 0px 20px', barBackground:'#a60000', barBorder:'2px solid #111', barColor:'#eee', barDescriptionColor:'#aaa'
	};
	var g_colorSchemeViewer_darkGreen = {
		// #97e697 #67e667 #39e639 #00cc00 #008500
		background:'rgba(1, 1, 1, 0.75)', imageBorder:'6px solid #97e697', imageBoxShadow:'#00cc00 0px 0px 20px', barBackground:'#008500', barBorder:'2px solid #111', barColor:'#eee', barDescriptionColor:'#aaa'
	};
	var g_colorSchemeViewer_darkBlue = {
		// #a0b0d7 #7080d7 #4a60d7 #162ea2 #071871
		background:'rgba(1, 1, 1, 0.75)', imageBorder:'6px solid #a0b0d7', imageBoxShadow:'#162ea2 0px 0px 20px', barBackground:'#071871', barBorder:'2px solid #111', barColor:'#eee', barDescriptionColor:'#aaa'
	};
	var g_colorSchemeViewer_darkOrange = {
		// #ffd7b7 #ffd773 #ffc840 #ffb600 #a67600
		background:'rgba(1, 1, 1, 0.75)', imageBorder:'6px solid #ffd7b7', imageBoxShadow:'#ffb600 0px 0px 20px', barBackground:'#a67600', barBorder:'2px solid #111', barColor:'#eee', barDescriptionColor:'#aaa'
	};
	var g_colorSchemeViewer_light = {
		background:'rgba(1, 1, 1, 0.75)', imageBorder:'6px solid #f8f8f8', imageBoxShadow:'#888 0px 0px 20px', barBackground:'#222', barBorder:'2px solid #111', barColor:'#eee', barDescriptionColor:'#aaa'
	};

	
	var g_oldBorderColor=0,
		g_oldLabelOpacity=1,
		g_thumbnailHoverEffect=[];
	
	
	this.Initiate=function(element, params) {
		"use strict";
		g_options=params;
		g_baseControl=element;
		
		if( jQuery.support.transition ) { g_supportTransit=true; }
		
		if( g_options.blackList !='' ) { g_blackList=g_options.blackList.toUpperCase().split('|'); }
		if( g_options.whiteList !='' ) { g_whiteList=g_options.whiteList.toUpperCase().split('|'); }
		if( g_options.albumList !='' ) { g_albumList=g_options.albumList.toUpperCase().split('|'); }
		// Set theme and colorScheme
		jQuery(element).addClass('nanogallery_theme_'+g_options.theme);
		SetColorScheme(element);
		//SetColorSchemeViewer(element);
		//if( window.location.hostname.indexOf('bri') == -1 ) { g_betamax = 4; }


		if( g_options.photoset !== undefined ) {
			if( g_options.photoset.length > 0) { g_options.displayBreadcrumb=false; }
		}
		else { g_options.photoset=''; }
		if( g_options.album !== undefined ) {
			if( g_options.album.length > 0 ) { g_options.displayBreadcrumb=false; }
		}
		else { g_options.album=''; }

		if( g_options.maxWidth > 0 ) { 
			jQuery(g_baseControl).css('maxWidth',+g_options.maxWidth);
			jQuery(g_baseControl).css('margin-left','auto');
			jQuery(g_baseControl).css('margin-right','auto');
		}
	

		if( g_options.displayBreadcrumb == true && ( g_options.kind=='picasa' || g_options.kind=='flickr')) {
			g_containerBreadcrumb =jQuery('<div class="nanoGalleryBreadcrumb"></div>').appendTo(element);
		}
		g_containerParent=jQuery('<div class="nanoGalleryContainerParent"></div>').appendTo(element);
		g_containerThumbnails=jQuery('<div class="nanoGalleryContainer"></div>').appendTo(g_containerParent);

		

		g_path2timthumb = ""; //timthumbFolder;

		// thumbnails effects
		// easing : jQuery supports only 'swing' and 'linear'
		switch( toType(g_options.thumbnailHoverEffect) ) {
			case 'string':
				var tmp=g_options.thumbnailHoverEffect.split(',');
				for(var i=0; i<tmp.length; i++) {
					g_thumbnailHoverEffect.push({'name':tmp[i],'duration':200,'durationBack':200,'easing':'swing','easingBack':'swing'});
				}
				break;
			case 'object':
				if( g_options.thumbnailHoverEffect.name != undefined ) {
					g_thumbnailHoverEffect.push(jQuery.extend({'duration':200,'durationBack':150,'easing':'swing','easingBack':'swing'},g_options.thumbnailHoverEffect));
				}
				break;
			case 'array':
				for(var i=0; i<g_options.thumbnailHoverEffect.length; i++) {
					if( g_options.thumbnailHoverEffect[i].name != undefined ) {
						g_thumbnailHoverEffect.push(jQuery.extend({'duration':200,'durationBack':150,'easing':'swing','easingBack':'swing'},g_options.thumbnailHoverEffect[i]));
					}
				}
				break;
			case 'null':
				break;
			default:
				alert('nanoGALLERY: incorrect parameter for "thumbnailHoverEffect".');
		}
		// check consistency
		for( var i=0; i<g_thumbnailHoverEffect.length; i++) {
			switch(g_thumbnailHoverEffect[i].name ) {
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
				case 'borderLighter':
				case 'borderDarker':
				case 'imageInvisible':
				case 'imageOpacity50':
				case 'descriptionSlideUp':
					break;

				case 'imageScale150':
				case 'imageScale150Outside':
				case 'scale120':
				case 'overScale':
				case 'overScaleOutside':
				case 'scaleLabelOverImage':
				case 'imageFlipHorizontal':
				case 'imageFlipVertical':
				//case 'flipHorizontal':		// hover issue
				//case 'flipVertical':
				case 'rotateCornerBR':
				case 'rotateCornerBL':
				case 'imageRotateCornerBR':
				case 'imageRotateCornerBL':
					if ( !g_supportTransit ) {
						nanoConsoleLog('The parameter "'+g_thumbnailHoverEffect[i].name+'" for "thumbnailHoverEffect" requires the additional jQuery plugin "Transit".');
					}
					break;
				default:
					nanoAlert('Unknow parameter "'+g_thumbnailHoverEffect[i].name+'" for "thumbnailHoverEffect".');
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
				//jQuery.getJSON(url+'/nanogallery_getitems.php', {limit: 1}, function(data) {
				//jQuery.getJSON(url+'/nanogallery_getitems.php', function(data) {
				jQuery.ajaxSetup({ cache: false });
				jQuery.support.cors = true;
				jQuery.getJSON(url, function(data) {
					alert("ok");
					// data is now an array with all the images
					jQuery.each(data, function(i) {
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

			jQuery.jsonp({
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

			jQuery.jsonp({
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

		jQuery.jsonp({
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
		g_oneThumbnailWidth=0;
		g_oneThumbnailWidthContainer=0;
		g_oneThumbnailHeight=0;
		g_oneThumbnailHeightContainer=0;
		g_oneThumbnailLabelTitleHeight=0;
		
		// if one description is defined then put a value to those without
		var foundDesc=false;
		if( g_options.thumbnailLabel.position == 'onBottom'  ) {
			jQuery.each(g_itemInfo, function(i,item){
				if( item.description.length > 0 ) { foundDesc=true; }
			});
		}

		jQuery.each(g_itemInfo, function(i,item){
			
			var newDivTemp =jQuery('<div class="container" style="display: inline-block"></div>');	
			var newDivTemp1 =jQuery('<div class="subcontainer" style="display: inline-block"></div>');	
			//jQuery(newDivTemp1).append('<div class="imgContainer" style="width:'+g_options.thumbnailWidth+'px;height:'+g_options.thumbnailHeight+'px;"><img class="image" src="'+item['thumbsrc']+'" style="max-width:'+g_options.thumbnailWidth+'px;max-height:'+g_options.thumbnailHeight+'px;"></div>');
			var newImg=jQuery('<div class="imgContainer" style="width:'+g_options.thumbnailWidth+'px;height:'+g_options.thumbnailHeight+'px;"><img class="image" src="'+item['thumbsrc']+'" style="max-width:'+g_options.thumbnailWidth+'px;max-height:'+g_options.thumbnailHeight+'px;"></div>');
			jQuery(newDivTemp1).append(newImg);
			if( item['kind'] == 'album' ) {
				// album
				if( g_options.thumbnailLabel.display == true ) {
					jQuery(newDivTemp1).append('<div class="iconInfo"></div>');
					var sDesc='';
					if( g_options.thumbnailLabel.displayDescription == true ) { sDesc = item.description; }
					var newLabel=jQuery('<div class="labelImage" style="width:'+g_options.thumbnailWidth+'px;max-height:'+g_options.thumbnailHeight+'px;"><div class="labelFolderTitle">'+item.title+'</div><div class="labelDescription">'+sDesc+'</div></div>');
					jQuery(newDivTemp1).append(newLabel);
				}
			}
			else {
				// image
				var s=item.title;
				if( g_options.thumbnailLabel.display == true ) {
					if( s === undefined || s.length == 0 ) { s='&nbsp;'; }
					var sDesc='';
					if( g_options.thumbnailLabel.displayDescription == true ) { sDesc = item.description; }
					if( foundDesc && sDesc.length == 0 && g_options.thumbnailLabel.position == 'onBottom' ) { sDesc='&nbsp;'; }
					if( g_betamax != -1 ) {
						if( i >= g_betamax ) {return false; }
					}
					var newLabel=jQuery('<div class="labelImage" style="width:'+g_options.thumbnailWidth+'px;max-height:'+g_options.thumbnailHeight+'px;"><div class="labelImageTitle">'+s+'</div><div class="labelDescription">'+sDesc+'</div></div>');
					jQuery(newDivTemp1).append(newLabel);
				}
			}
			jQuery(newDivTemp).append(newDivTemp1);	
			jQuery(newDivTemp).css('opacity','0');
			var newDiv =jQuery(newDivTemp).appendTo(g_containerThumbnails); //.animate({ opacity: 1},1000, 'swing');	//.show('slow'); //.fadeIn('slow').slideDown('slow');
			

			
			switch( g_options.thumbnailLabel.position ){
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
					g_options.thumbnailLabel.position='overImageOnBottom';
					jQuery(newDiv).find('.labelImage').css('bottom','0');
					break;
			}
			

			if( g_oneThumbnailWidth == 0 ) {
				//g_oneThumbnailWidth= (jQuery(newDiv).outerWidth(false)-jQuery(newDiv).width()) + jQuery(newDiv).find('.imgContainer').outerWidth(true) ;
				g_oneThumbnailWidth= jQuery(newDiv).find('.imgContainer').outerWidth(true) ;
				//g_oneThumbnailWidth=jQuery(newDiv).outerWidth(true);
			}
			jQuery(newDiv).width(g_oneThumbnailWidth);
			if( g_oneThumbnailWidthContainer == 0 ) {
				g_oneThumbnailWidthContainer=jQuery(newDiv).outerWidth(true);
			}
			if( g_oneThumbnailHeight == 0 ) {
				g_oneThumbnailHeight= jQuery(newDiv).find('.imgContainer').outerHeight(true);
				//g_oneThumbnailHeight=jQuery(newDiv).outerHeight(true);
			}
			jQuery(newDiv).height(g_oneThumbnailHeight);
			if( g_oneThumbnailHeightContainer == 0 ) {
				g_oneThumbnailHeightContainer=jQuery(newDiv).outerHeight(true);
			}
			if( g_oneThumbnailLabelTitleHeight == 0 ) {
				if( item['kind'] == 'album' ) {
					g_oneThumbnailLabelTitleHeight=jQuery(newDiv).find('.labelFolderTitle').outerWidth(true);
				}
				else {
					g_oneThumbnailLabelTitleHeight=jQuery(newDiv).find('.labelImageTitle').outerHeight(true);
				}
			}
			jQuery(newDiv).data("index",i);

			// CSS init depending on choosen effect
			ThumbnailInit( newDiv );
			
			// backup values used in animations/transitions
			g_oldBorderColor=jQuery(newDiv).css('border-color');
			if( g_oldBorderColor == '' || g_oldBorderColor == null || g_oldBorderColor == undefined ) { g_oldBorderColor='#000'; }
			g_oldLabelOpacity=jQuery(newDiv).find('.labelImage').css('opacity');
			
			jQuery(newDiv).hover(
				function() {
					ThumbnailHover(this);

				}, function() {
					ThumbnailHoverOut(this);
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

		//g_oneThumbnailWidth=w;
		//g_oneThumbnailHeight=h;
		SetTumbnailsContainerWidth();
		var newH=SetTumbnailsContainerHeight();

		//jQuery(g_containerThumbnails).find('.container').width(200);
		
		jQuery(g_containerThumbnails).animate({maxHeight: newH}, 200, function() {
			// animation to display the thumbnails
			jQuery(g_containerThumbnails).find('.container').each(function(i) {
				jQuery(this).delay((i++) * 50).fadeTo(200, 1);
			});
			g_containerThumbnailsDisplayed=true;
		});


	};
	
	function ThumbnailInit( elt ) {
		var useTransitPlugin = false;
		for( j=0; j<g_thumbnailHoverEffect.length; j++) {
			switch(g_thumbnailHoverEffect[j].name ) {
				case 'scaleLabelOverImage':
					if( g_options.thumbnailLabel.position == 'overImageOnTop' || g_options.thumbnailLabel.position == 'overImageOnBottom' ) {
						//jQuery(elt).css('overflow','hidden');
						setElementOnTop('', jQuery(elt).find('.imgContainer'));
						jQuery(elt).find('.labelImage').css({'opacity':'0', scale:0.5});
						jQuery(elt).find('.imgContainer').css({ 'scale':'1'});
					}
					break;
				case 'overScale':
					if( g_options.thumbnailLabel.position == 'overImageOnTop' || g_options.thumbnailLabel.position == 'overImageOnBottom' ) {
						jQuery(elt).css('overflow','hidden');
						setElementOnTop('', jQuery(elt).find('.labelImage'));
						jQuery(elt).find('.labelImage').css({'opacity':'0', scale:1.5});
						jQuery(elt).find('.imgContainer').css({ 'opacity': '1', 'scale':'1'});
					}
					break;
				case 'overScaleOutside':
					if( g_options.thumbnailLabel.position == 'overImageOnTop' || g_options.thumbnailLabel.position == 'overImageOnBottom' ) {
						setElementOnTop('', jQuery(elt).find('.labelImage'));
						jQuery(elt).find('.labelImage').css({'opacity':'0', scale:1.5});
						jQuery(elt).find('.imgContainer').css({ 'opacity': '1', 'scale':'1'});
					}
					break;
				case 'rotateCornerBL':
					if( g_options.thumbnailLabel.position == 'overImageOnTop' || g_options.thumbnailLabel.position == 'overImageOnBottom' ) {
						if( g_supportTransit ) {
							jQuery(elt).css('overflow','hidden');
							jQuery(elt).find('.labelImage').css('opacity','1').css({ rotate: '-90deg', 'transform-origin': '100% 100%' });
							jQuery(elt).find('.imgContainer').css({ rotate: '0', 'transform-origin': '100% 100%' });
							useTransitPlugin=true;
						}
					}
					break;
				case 'rotateCornerBR':
					if( g_options.thumbnailLabel.position == 'overImageOnTop' || g_options.thumbnailLabel.position == 'overImageOnBottom' ) {
						if( g_supportTransit ) {
							jQuery(elt).css('overflow','hidden');
							jQuery(elt).find('.labelImage').css('opacity','1').css({ rotate: '90deg', 'transform-origin': '0% 100%' });
							jQuery(elt).find('.imgContainer').css({ rotate: '0', 'transform-origin': '0 100%' });
							useTransitPlugin=true;
						}
					}
					break;
				case 'imageRotateCornerBL':
					if( g_options.thumbnailLabel.position == 'overImageOnTop' || g_options.thumbnailLabel.position == 'overImageOnBottom' ) {
						if( g_supportTransit ) {
							setElementOnTop(elt, jQuery(elt).find('.imgContainer'));
							jQuery(elt).css('overflow','hidden');
							jQuery(elt).find('.labelImage').css('opacity','1');
							jQuery(elt).find('.imgContainer').css({ rotate: '0', 'transform-origin': '100% 100%' });
							useTransitPlugin=true;
						}
					}
					break;
				case 'imageRotateCornerBR':
					if( g_options.thumbnailLabel.position == 'overImageOnTop' || g_options.thumbnailLabel.position == 'overImageOnBottom' ) {
						if( g_supportTransit ) {
							setElementOnTop(elt, jQuery(elt).find('.imgContainer'));
							jQuery(elt).css('overflow','hidden');
							jQuery(elt).find('.labelImage').css('opacity','1');
							jQuery(elt).find('.imgContainer').css({ rotate: '0', 'transform-origin': '0 100%' });
							useTransitPlugin=true;
						}
					}
					break;
				case 'slideUp':
					if( g_options.thumbnailLabel.position == 'overImageOnTop' || g_options.thumbnailLabel.position == 'overImageOnBottom' ) {
						jQuery(elt).css('overflow','hidden');
						jQuery(elt).find('.labelImage').css('opacity','1').css('top',g_oneThumbnailHeight);
						jQuery(elt).find('.imgContainer').css({'left':'0', 'top':'0'});
					}
					break;
				case 'slideDown':
					if( g_options.thumbnailLabel.position == 'overImageOnTop' || g_options.thumbnailLabel.position == 'overImageOnBottom' ) {
						jQuery(elt).css('overflow','hidden');
						jQuery(elt).find('.labelImage').css('opacity','1').css('top',-g_oneThumbnailHeight);
						jQuery(elt).find('.imgContainer').css({'left':'0', 'top':'0'});
					}
					break;
				case 'slideRight':
					if( g_options.thumbnailLabel.position == 'overImageOnTop' || g_options.thumbnailLabel.position == 'overImageOnBottom' ) {
						jQuery(elt).css('overflow','hidden');
						jQuery(elt).find('.labelImage').css('opacity','1').css('left',-g_oneThumbnailWidth);
						jQuery(elt).find('.imgContainer').css({'left':'0', 'top':'0'});
					}
					break;
				case 'slideLeft':
					if( g_options.thumbnailLabel.position == 'overImageOnTop' || g_options.thumbnailLabel.position == 'overImageOnBottom' ) {
						jQuery(elt).css('overflow','hidden');
						jQuery(elt).find('.labelImage').css('opacity','1').css('left',g_oneThumbnailWidth);
						jQuery(elt).find('.imgContainer').css({'left':'0', 'top':'0'});
					}
					break;
				case 'imageSlideUp':
				case 'imageSlideDown':
				case 'imageSlideRight':
				case 'imageSlideLeft':
					if( g_options.thumbnailLabel.position == 'overImageOnTop' || g_options.thumbnailLabel.position == 'overImageOnBottom' ) {
						setElementOnTop(elt, jQuery(elt).find('.imgContainer'));
						jQuery(elt).css('overflow','hidden');
						jQuery(elt).find('.labelImage').css('opacity','1');
						jQuery(elt).find('.imgContainer').css({'left':'0', 'top':'0'});
					}
					break;
				case 'labelAppear':
				case 'labelAppear75':
					if( g_options.thumbnailLabel.position == 'overImageOnTop' || g_options.thumbnailLabel.position == 'overImageOnBottom' ) {
						jQuery(elt).find('.labelImage').css('opacity','0');
					}
					break;
				case 'labelSlideUp':
					if( g_options.thumbnailLabel.position == 'overImageOnTop' || g_options.thumbnailLabel.position == 'overImageOnBottom' ) {
						jQuery(elt).css('overflow','hidden');
						jQuery(elt).find('.labelImage').css({'bottom':-g_oneThumbnailHeight,'top':'none'});
					}
					break;
				case 'labelSlideDown':
					if( g_options.thumbnailLabel.position == 'overImageOnTop' || g_options.thumbnailLabel.position == 'overImageOnBottom' ) {
						jQuery(elt).css('overflow','hidden');
						jQuery(elt).find('.labelImage').css({'top':-g_oneThumbnailHeight, 'bottom':'none'});
					}
					break;
				case 'descriptionSlideUp':
					if( g_options.thumbnailLabel.position == 'overImageOnBottom' ) {
						jQuery(elt).css('overflow','hidden');
						var p=g_oneThumbnailHeight - (jQuery(elt).find('.labelImage').outerHeight(true)-jQuery(elt).find('.labelImage').height()) - g_oneThumbnailLabelTitleHeight +'px';
						jQuery(elt).find('.labelImage').css({'top':p, 'bottom':'none'});
					}
					break;

				case 'imageFlipHorizontal':
					if( g_supportTransit ) {
						var n= Math.round(g_oneThumbnailHeight*1.2) + 'px';
						//jQuery(elt).css({ perspective: n, 'backface-visibility': 'hidden' });
						//jQuery(elt).find('.subcontainer').css({perspective: n, 'rotateX': '0deg', 'transform-style':'preserve-3d', 'backface-visibility': 'hidden'});
						//jQuery(elt).find('.imgcontainer').css({perspective: n, rotateX: '0deg', 'backface-visibility': 'hidden'});
						jQuery(elt).find('.imgContainer').css({perspective: n, rotateX: '0deg', 'backface-visibility': 'hidden'});
						jQuery(elt).find('.labelImage').css({ perspective: n,rotateX: '180deg', 'backface-visibility': 'hidden','height':g_oneThumbnailHeight,'opacity':'1' });
						useTransitPlugin=true;
					}
					break;
				case 'imageFlipVertical':
					if( g_supportTransit ) {
						var n= Math.round(g_oneThumbnailWidth*1.2) + 'px';
						//setElementOnTop(elt, jQuery(elt).find('.imgContainer'));
						//jQuery(elt).find('.subcontainer').css({perspective: n, 'rotateY': '0deg', 'transform-style':'preserve-3d', 'backface-visibility': 'hidden'});
						jQuery(elt).find('.imgContainer').css({perspective: n, rotateY: '0deg', 'backface-visibility': 'hidden'});
						jQuery(elt).find('.labelImage').css({ perspective: n, rotateY: '180deg', 'backface-visibility': 'hidden','height':g_oneThumbnailHeight,'opacity':'1' });


						//jQuery(elt).find('.labelImage').css({ perspective: n, rotateY: '180deg', 'backface-visibility': 'hidden', 'opacity':'1', 'height':g_oneThumbnailHeight });
						//jQuery(elt).find('.imgContainer').css({ perspective: n, rotateY: '0deg', 'backface-visibility': 'hidden' });
						useTransitPlugin=true;
					}
					break;
				case 'flipHorizontal':
					var n= Math.round(g_oneThumbnailHeight*1.2) + 'px';
					jQuery(elt).find('.labelImage').css({ perspective: n, rotateX: '180deg', 'backface-visibility': 'hidden', 'opacity':'1', 'height':'100%' });
					useTransitPlugin=true;
					break;
				case 'flipVertical':
					var n= Math.round(g_oneThumbnailWidth*1.2) + 'px';
					jQuery(elt).find('.subcontainer').css({ perspective: n, rotateY: '0deg'});
					jQuery(elt).find('.labelImage').css({ perspective: n, rotateY: '180deg', 'backface-visibility': 'hidden', 'opacity':'1', 'height':'100%' });
					useTransitPlugin=true;
					break;
				case 'borderLighter':
				case 'borderDarker':
					//useTransitPlugin=true;
					break;
				case 'imageScale150':
					jQuery(elt).css('overflow','hidden');
					break;

			}
			if( !g_supportTransit ) { useTransitPlugin=false; }
			if( useTransitPlugin || g_supportTransit ) {
				if( g_thumbnailHoverEffect[j].easing == 'swing' ) { g_thumbnailHoverEffect[j].easing = 'ease'; }
				if( g_thumbnailHoverEffect[j].easingBack == 'swing' ) { g_thumbnailHoverEffect[j].easingBack = 'ease'; }
			}
		}

	};

	function ThumbnailHover( elt ) {
		//if( jQueryMinVersion('1.9') ) { jQuery(elt).find('*').finish(); }
		jQuery(elt).find('*').stop(true,true);
		try {
			for( j=0; j<g_thumbnailHoverEffect.length; j++) {
				switch(g_thumbnailHoverEffect[j].name ) {
					case 'scaleLabelOverImage':
						if( g_options.thumbnailLabel.position == 'overImageOnTop' || g_options.thumbnailLabel.position == 'overImageOnBottom' ) {
							if( g_supportTransit ) {
								jQuery(elt).find('.labelImage').transition({ 'opacity': '1', 'scale':'1'},g_thumbnailHoverEffect[j].duration, g_thumbnailHoverEffect[j].easing);
								jQuery(elt).find('.imgContainer').transition({ 'scale':'0.5'},g_thumbnailHoverEffect[j].duration, g_thumbnailHoverEffect[j].easing);
							}
							else {
								jQuery(elt).find('.labelImage').animate({ 'opacity': '1', 'scale':'1'},g_thumbnailHoverEffect[j].duration, g_thumbnailHoverEffect[j].easing);
								jQuery(elt).find('.imgContainer').animate({ 'scale':'0.5'},g_thumbnailHoverEffect[j].duration, g_thumbnailHoverEffect[j].easing);
							}
						}
						break;
					case 'overScale':
					case 'overScaleOutside':
						if( g_options.thumbnailLabel.position == 'overImageOnTop' || g_options.thumbnailLabel.position == 'overImageOnBottom' ) {
							if( g_supportTransit ) {
								jQuery(elt).find('.labelImage').transition({ 'opacity': '1', 'scale':'1'},g_thumbnailHoverEffect[j].duration, g_thumbnailHoverEffect[j].easing);
								jQuery(elt).find('.imgContainer').transition({ 'opacity': '0', 'scale':'0.5'},g_thumbnailHoverEffect[j].duration, g_thumbnailHoverEffect[j].easing);
							}
							else {
								jQuery(elt).find('.labelImage').animate({ 'opacity': '1', 'scale':'1'},g_thumbnailHoverEffect[j].duration, g_thumbnailHoverEffect[j].easing);
								jQuery(elt).find('.imgContainer').animate({ 'opacity': '0', 'scale':'0.5'},g_thumbnailHoverEffect[j].duration, g_thumbnailHoverEffect[j].easing);
							}
						}
						break;
					case 'imageInvisible':
							if( g_supportTransit ) {
							jQuery(elt).find('.imgContainer').transition({ 'opacity': '0'},g_thumbnailHoverEffect[j].duration, g_thumbnailHoverEffect[j].easing);
						}
						else {
							jQuery(elt).find('.imgContainer').animate({ 'opacity': '0'},g_thumbnailHoverEffect[j].duration, g_thumbnailHoverEffect[j].easing);
						}
						break;
					case 'rotateCornerBL':
						if( g_supportTransit ) {
							if( g_options.thumbnailLabel.position == 'overImageOnTop' || g_options.thumbnailLabel.position == 'overImageOnBottom' ) {
								jQuery(elt).find('.labelImage').transition({ rotate: '0deg'},g_thumbnailHoverEffect[j].duration, g_thumbnailHoverEffect[j].easing);
								jQuery(elt).find('.imgContainer').transition({ rotate: '90deg'},g_thumbnailHoverEffect[j].duration, g_thumbnailHoverEffect[j].easing);
							}
						}
						break;
					case 'rotateCornerBR':
						if( g_supportTransit ) {
							if( g_options.thumbnailLabel.position == 'overImageOnTop' || g_options.thumbnailLabel.position == 'overImageOnBottom' ) {
								jQuery(elt).find('.labelImage').transition({ rotate: '0deg'},g_thumbnailHoverEffect[j].duration, g_thumbnailHoverEffect[j].easing);
								jQuery(elt).find('.imgContainer').transition({ rotate: '-90deg'},g_thumbnailHoverEffect[j].duration, g_thumbnailHoverEffect[j].easing);
							}
						}
						break;
					case 'imageRotateCornerBL':
						if( g_supportTransit ) {
							if( g_options.thumbnailLabel.position == 'overImageOnTop' || g_options.thumbnailLabel.position == 'overImageOnBottom' ) {
								jQuery(elt).find('.imgContainer').transition({ rotate: '90deg'},g_thumbnailHoverEffect[j].duration, g_thumbnailHoverEffect[j].easing);
							}
						}
						break;
					case 'imageRotateCornerBR':
						if( g_supportTransit ) {
							if( g_options.thumbnailLabel.position == 'overImageOnTop' || g_options.thumbnailLabel.position == 'overImageOnBottom' ) {
								jQuery(elt).find('.imgContainer').transition({ rotate: '-90deg'},g_thumbnailHoverEffect[j].duration, g_thumbnailHoverEffect[j].easing);
							}
						}
						break;
					case 'slideUp':
						if( g_options.thumbnailLabel.position == 'overImageOnTop' || g_options.thumbnailLabel.position == 'overImageOnBottom' ) {
							var n= '-' + g_oneThumbnailHeight + 'px';
							if( g_supportTransit ) {
								jQuery(elt).find('.imgContainer').transition({ 'top': n},g_thumbnailHoverEffect[j].duration, g_thumbnailHoverEffect[j].easing);
								jQuery(elt).find('.labelImage').transition({ 'top': 0},g_thumbnailHoverEffect[j].duration, g_thumbnailHoverEffect[j].easing);
							}
							else {
								jQuery(elt).find('.imgContainer').animate({ 'top': n},g_thumbnailHoverEffect[j].duration, g_thumbnailHoverEffect[j].easing);
								jQuery(elt).find('.labelImage').animate({ 'top': 0},g_thumbnailHoverEffect[j].duration, g_thumbnailHoverEffect[j].easing);
							}
						}
						break;
					case 'slideDown':
						if( g_options.thumbnailLabel.position == 'overImageOnTop' || g_options.thumbnailLabel.position == 'overImageOnBottom' ) {
							var n= g_oneThumbnailHeight + 'px';
							if( g_supportTransit ) {
								jQuery(elt).find('.imgContainer').transition({ 'top': n},g_thumbnailHoverEffect[j].duration, g_thumbnailHoverEffect[j].easing);
								jQuery(elt).find('.labelImage').transition({ 'top': 0},g_thumbnailHoverEffect[j].duration, g_thumbnailHoverEffect[j].easing);
							}
							else {
								jQuery(elt).find('.imgContainer').animate({ 'top': n},g_thumbnailHoverEffect[j].duration, g_thumbnailHoverEffect[j].easing);
								jQuery(elt).find('.labelImage').animate({ 'top': 0},g_thumbnailHoverEffect[j].duration, g_thumbnailHoverEffect[j].easing);
							}
						}
						break;
					case 'slideRight':
						if( g_options.thumbnailLabel.position == 'overImageOnTop' || g_options.thumbnailLabel.position == 'overImageOnBottom' ) {
							var n= g_oneThumbnailWidth + 'px';
							if( g_supportTransit ) {
								jQuery(elt).find('.imgContainer').transition({ 'left': n},g_thumbnailHoverEffect[j].duration, g_thumbnailHoverEffect[j].easing);
								jQuery(elt).find('.labelImage').transition({ 'left': 0},g_thumbnailHoverEffect[j].duration, g_thumbnailHoverEffect[j].easing);
							}
							else {
								jQuery(elt).find('.imgContainer').animate({ 'left': n},g_thumbnailHoverEffect[j].duration, g_thumbnailHoverEffect[j].easing);
								jQuery(elt).find('.labelImage').animate({ 'left': 0},g_thumbnailHoverEffect[j].duration, g_thumbnailHoverEffect[j].easing);
							}
						}
						break;
					case 'slideLeft':
						if( g_options.thumbnailLabel.position == 'overImageOnTop' || g_options.thumbnailLabel.position == 'overImageOnBottom' ) {
							var n= '-'+ g_oneThumbnailWidth + 'px';
							if( g_supportTransit ) {
								jQuery(elt).find('.imgContainer').transition({ 'left': n},g_thumbnailHoverEffect[j].duration, g_thumbnailHoverEffect[j].easing);
								jQuery(elt).find('.labelImage').transition({ 'left': 0},g_thumbnailHoverEffect[j].duration, g_thumbnailHoverEffect[j].easing);
							}
							else {
								jQuery(elt).find('.imgContainer').animate({ 'left': n},g_thumbnailHoverEffect[j].duration, g_thumbnailHoverEffect[j].easing);
								jQuery(elt).find('.labelImage').animate({ 'left': 0},g_thumbnailHoverEffect[j].duration, g_thumbnailHoverEffect[j].easing);
							}
						}
						break;
					case 'imageSlideUp':
						if( g_options.thumbnailLabel.position == 'overImageOnTop' || g_options.thumbnailLabel.position == 'overImageOnBottom' ) {
							var n= '-' + g_oneThumbnailHeight + 'px';
							if( g_supportTransit ) {
								jQuery(elt).find('.imgContainer').transition({ 'top': n},g_thumbnailHoverEffect[j].duration, g_thumbnailHoverEffect[j].easing);
							}
							else {
								jQuery(elt).find('.imgContainer').animate({ 'top': n},g_thumbnailHoverEffect[j].duration, g_thumbnailHoverEffect[j].easing);
							}
						}
						break;
					case 'imageSlideDown':
						if( g_options.thumbnailLabel.position == 'overImageOnTop' || g_options.thumbnailLabel.position == 'overImageOnBottom' ) {
							var n= g_oneThumbnailHeight + 'px';
							if( g_supportTransit ) {
								jQuery(elt).find('.imgContainer').transition({ 'top': n},g_thumbnailHoverEffect[j].duration, g_thumbnailHoverEffect[j].easing);
							}
							else {
								jQuery(elt).find('.imgContainer').animate({ 'top': n},g_thumbnailHoverEffect[j].duration, g_thumbnailHoverEffect[j].easing);
							}
						}
						break;
					case 'imageSlideLeft':
						if( g_options.thumbnailLabel.position == 'overImageOnTop' || g_options.thumbnailLabel.position == 'overImageOnBottom' ) {
							var n= '-' + g_oneThumbnailWidth + 'px';
							if( g_supportTransit ) {
								jQuery(elt).find('.imgContainer').transition({ 'left': n},g_thumbnailHoverEffect[j].duration, g_thumbnailHoverEffect[j].easing);
							}
							else {
								jQuery(elt).find('.imgContainer').animate({ 'left': n},g_thumbnailHoverEffect[j].duration, g_thumbnailHoverEffect[j].easing);
							}
						}
						break;
					case 'imageSlideRight':
						if( g_options.thumbnailLabel.position == 'overImageOnTop' || g_options.thumbnailLabel.position == 'overImageOnBottom' ) {
							var n= g_oneThumbnailWidth + 'px';
							if( g_supportTransit ) {
								jQuery(elt).find('.imgContainer').transition({ 'left': n},g_thumbnailHoverEffect[j].duration, g_thumbnailHoverEffect[j].easing);
							}
							else {
								jQuery(elt).find('.imgContainer').animate({ 'left': n},g_thumbnailHoverEffect[j].duration, g_thumbnailHoverEffect[j].easing);
							}
						}
						break;
					case 'labelAppear':
						if( g_options.thumbnailLabel.position == 'overImageOnTop' || g_options.thumbnailLabel.position == 'overImageOnBottom' ) {
							if( g_supportTransit ) {
								jQuery(elt).find('.labelImage').transition({ 'opacity': '1'},g_thumbnailHoverEffect[j].duration, g_thumbnailHoverEffect[j].easing);
							}
							else {
								jQuery(elt).find('.labelImage').animate({ 'opacity': '1'},g_thumbnailHoverEffect[j].duration, g_thumbnailHoverEffect[j].easing);
							}
						}
						break;
					case 'labelAppear75':
						if( g_options.thumbnailLabel.position == 'overImageOnTop' || g_options.thumbnailLabel.position == 'overImageOnBottom' ) {
							if( g_supportTransit ) {
								jQuery(elt).find('.labelImage').transition({ 'opacity': '0.75'},g_thumbnailHoverEffect[j].duration, g_thumbnailHoverEffect[j].easing);
							}
							else {
								jQuery(elt).find('.labelImage').animate({ 'opacity': '0.75'},g_thumbnailHoverEffect[j].duration, g_thumbnailHoverEffect[j].easing);
							}
						}
						break;
					case 'labelSlideDown':
						if( g_options.thumbnailLabel.position == 'overImageOnTop' || g_options.thumbnailLabel.position == 'overImageOnBottom' ) {
							if( g_supportTransit ) {
								jQuery(elt).find('.labelImage').transition({ 'top': 0},g_thumbnailHoverEffect[j].duration, g_thumbnailHoverEffect[j].easing);
							}
							else {
								jQuery(elt).find('.labelImage').animate({ 'top': 0},g_thumbnailHoverEffect[j].duration, g_thumbnailHoverEffect[j].easing);
							}
						}
						break;
					case 'labelSlideUp':
						if( g_options.thumbnailLabel.position == 'overImageOnTop' || g_options.thumbnailLabel.position == 'overImageOnBottom' ) {
							if( g_supportTransit ) {
								jQuery(elt).find('.labelImage').transition({ 'bottom': 0},g_thumbnailHoverEffect[j].duration, g_thumbnailHoverEffect[j].easing);
							}
							else {
								jQuery(elt).find('.labelImage').animate({ 'bottom': 0},g_thumbnailHoverEffect[j].duration, g_thumbnailHoverEffect[j].easing);
							}
						}
						break;
					case 'descriptionSlideUp':
						if( g_options.thumbnailLabel.position == 'overImageOnBottom' ) {
							if( g_supportTransit ) {
								jQuery(elt).find('.labelImage').transition({ 'top': 0},g_thumbnailHoverEffect[j].duration, g_thumbnailHoverEffect[j].easing);
							}
							else {
								jQuery(elt).find('.labelImage').animate({ 'top': 0},g_thumbnailHoverEffect[j].duration, g_thumbnailHoverEffect[j].easing);
							}
						}
						break;
					case 'labelOpacity50':
						if( g_supportTransit ) {
							jQuery(elt).find('.labelImage').transition({ 'opacity': 0.5 },g_thumbnailHoverEffect[j].duration, g_thumbnailHoverEffect[j].easing);
						}
						else {
							jQuery(elt).find('.labelImage').animate({ 'opacity': 0.5 },g_thumbnailHoverEffect[j].duration, g_thumbnailHoverEffect[j].easing);
						}
						break;
					case 'imageOpacity50':
						if( g_supportTransit ) {
							jQuery(elt).find('.imgContainer').transition({ 'opacity': 0.5 },g_thumbnailHoverEffect[j].duration, g_thumbnailHoverEffect[j].easing);
						}
						else {
							jQuery(elt).find('.imgContainer').animate({ 'opacity': 0.5 },g_thumbnailHoverEffect[j].duration, g_thumbnailHoverEffect[j].easing);
						}
						break;
					case 'borderLighter':
						if( g_supportTransit ) {
							jQuery(elt).transition({ 'borderColor': lighterColor(g_oldBorderColor,0.5) },g_thumbnailHoverEffect[j].duration, g_thumbnailHoverEffect[j].easing);
						}
						else {
							//jQuery(elt).animate({ 'borderColor': lighterColor(g_oldBorderColor,0.5) },g_thumbnailHoverEffect[j].duration, g_thumbnailHoverEffect[j].easing);
							jQuery(elt).animate({ 'borderTopColor': lighterColor(g_oldBorderColor,0.5), 'borderRightColor': lighterColor(g_oldBorderColor,0.5), 'borderBottomColor': lighterColor(g_oldBorderColor,0.5), 'borderLeftColor': lighterColor(g_oldBorderColor,0.5) },g_thumbnailHoverEffect[j].duration, g_thumbnailHoverEffect[j].easing);
						}
						break;
					case 'borderDarker':
						if( g_supportTransit ) {
							jQuery(elt).transition({ 'borderColor': darkerColor(g_oldBorderColor,0.5) },g_thumbnailHoverEffect[j].duration, g_thumbnailHoverEffect[j].easing);
						}
						else {
							//jQuery(elt).animate({ 'borderColor': darkerColor(g_oldBorderColor,0.5) },g_thumbnailHoverEffect[j].duration, g_thumbnailHoverEffect[j].easing);
							jQuery(elt).animate({ 'borderTopColor': darkerColor(g_oldBorderColor,0.5), 'borderRightColor': darkerColor(g_oldBorderColor,0.5), 'borderBottomColor': darkerColor(g_oldBorderColor,0.5), 'borderLeftColor': darkerColor(g_oldBorderColor,0.5) },g_thumbnailHoverEffect[j].duration, g_thumbnailHoverEffect[j].easing);
						}
						break;
					case 'imageScale150':
						if( g_supportTransit ) {
							jQuery(elt).find('img').transition({ scale: 1.5 },g_thumbnailHoverEffect[j].duration, g_thumbnailHoverEffect[j].easing);
						}
						else {
							jQuery(elt).find('img').animate({ scale: 1.5 },g_thumbnailHoverEffect[j].duration, g_thumbnailHoverEffect[j].easing);
						}
						break;
					case 'imageScale150Outside':
						setElementOnTop('', elt);
						if( g_supportTransit ) {
							jQuery(elt).find('img').transition({ scale: 1.5 },g_thumbnailHoverEffect[j].duration, g_thumbnailHoverEffect[j].easing);
						}
						else {
							jQuery(elt).find('img').animate({ scale: 1.5 },g_thumbnailHoverEffect[j].duration, g_thumbnailHoverEffect[j].easing);
						}
						break;
					case 'scale120':
						setElementOnTop('', elt);
						if( g_supportTransit ) {
							jQuery(elt).transition({ scale: 1.2 },g_thumbnailHoverEffect[j].duration, g_thumbnailHoverEffect[j].easing);
						}
						else {
							jQuery(elt).animate({ scale: 1.2 },g_thumbnailHoverEffect[j].duration, g_thumbnailHoverEffect[j].easing);
						}
						break;
					case 'imageFlipHorizontal':
						if( g_supportTransit ) {
							setElementOnTop('', elt);
							var n= Math.round(g_oneThumbnailHeight*1.2) + 'px';
							//jQuery(elt).find('.subcontainer').transition({ rotateX: '180deg'}, g_thumbnailHoverEffect[j].duration, g_thumbnailHoverEffect[j].easing);
							jQuery(elt).find('.imgContainer').transition({ perspective: n, rotateX: '180deg'}, g_thumbnailHoverEffect[j].duration, g_thumbnailHoverEffect[j].easing);
							jQuery(elt).find('.labelImage').transition({ perspective: n, rotateX: '360deg'}, g_thumbnailHoverEffect[j].duration, g_thumbnailHoverEffect[j].easing);
						}
						break;
					case 'imageFlipVertical':
						if( g_supportTransit ) {
							setElementOnTop('', elt);
							var n= Math.round(g_oneThumbnailWidth*1.2) + 'px';
							jQuery(elt).find('.imgContainer').transition({ perspective: n, rotateY: '180deg'}, g_thumbnailHoverEffect[j].duration, g_thumbnailHoverEffect[j].easing);
							jQuery(elt).find('.labelImage').transition({ perspective: n, rotateY: '360deg'}, g_thumbnailHoverEffect[j].duration, g_thumbnailHoverEffect[j].easing);
							//jQuery(elt).find('.subcontainer').transition({ rotateY: '180deg'}, g_thumbnailHoverEffect[j].duration, g_thumbnailHoverEffect[j].easing);
						}
						break;
					case 'flipHorizontal':
						if( g_supportTransit ) {
							setElementOnTop('', elt);
							var n= Math.round(g_oneThumbnailHeight*1.2) + 'px';
							jQuery(elt).transition({ perspective: n, rotateX: '180deg'}, g_thumbnailHoverEffect[j].duration, g_thumbnailHoverEffect[j].easing);
						}
						break;
					case 'flipVertical':
						if( g_supportTransit ) {
							setElementOnTop('', elt);
							var n= Math.round(g_oneThumbnailWidth*1.2) + 'px';
							jQuery(elt).transition({ perspective: n, rotateY: '180deg'}, g_thumbnailHoverEffect[j].duration, g_thumbnailHoverEffect[j].easing);
						}
						break;
					case 'TEST':
						//jQuery(elt).find('img').stop(true, true);
						jQuery(elt).find('.subcontainer').transition({ scale: 0.8 },150).transition({ perspective: '50px', rotateX: '180deg'}, 300, 'ease').transition({ scale: 1 },150);
						break;
				}
			}
		}
		catch (e) { 
			nanoAlert( 'error on hover ' +e.message );
		}
	};
	
	function ThumbnailHoverOut( elt ) {
		//if( jQueryMinVersion('1.9') ) { jQuery(elt).find('*').finish(); }
		jQuery(elt).find('*').stop(true,false);
		try {
			for( j=0; j<g_thumbnailHoverEffect.length; j++) {
				switch(g_thumbnailHoverEffect[j].name ) {
					case 'scaleLabelOverImage':
						if( g_options.thumbnailLabel.position == 'overImageOnTop' || g_options.thumbnailLabel.position == 'overImageOnBottom' ) {
							if( g_supportTransit ) {
								jQuery(elt).find('.labelImage').transition({ 'opacity': '0', 'scale':'0.5'},g_thumbnailHoverEffect[j].durationBack, g_thumbnailHoverEffect[j].easingBack);
								jQuery(elt).find('.imgContainer').transition({ 'scale':'1'},g_thumbnailHoverEffect[j].durationBack, g_thumbnailHoverEffect[j].easingBack);
							}
							else {
								jQuery(elt).find('.labelImage').animate({ 'opacity': '0', 'scale':'0.5'},g_thumbnailHoverEffect[j].durationBack, g_thumbnailHoverEffect[j].easingBack);
								jQuery(elt).find('.imgContainer').animate({ 'scale':'1'},g_thumbnailHoverEffect[j].durationBack, g_thumbnailHoverEffect[j].easingBack);
							}
						}
						break;
					case 'overScale':
					case 'overScaleOutside':
						if( g_options.thumbnailLabel.position == 'overImageOnTop' || g_options.thumbnailLabel.position == 'overImageOnBottom' ) {
						if( g_supportTransit ) {
								jQuery(elt).find('.labelImage').transition({ 'opacity': '0', 'scale':'1.5'},g_thumbnailHoverEffect[j].durationBack, g_thumbnailHoverEffect[j].easingBack);
								jQuery(elt).find('.imgContainer').transition({ 'opacity': '1', 'scale':'1'},g_thumbnailHoverEffect[j].durationBack, g_thumbnailHoverEffect[j].easingBack);
							}
							else {
								jQuery(elt).find('.labelImage').animate({ 'opacity': '0', 'scale':'1.5'},g_thumbnailHoverEffect[j].durationBack, g_thumbnailHoverEffect[j].easingBack);
								jQuery(elt).find('.imgContainer').animate({ 'opacity': '1', 'scale':'1'},g_thumbnailHoverEffect[j].durationBack, g_thumbnailHoverEffect[j].easingBack);
							}
						}
						break;
					case 'imageInvisible':
						if( g_supportTransit ) {
							jQuery(elt).find('.imgContainer').transition({ 'opacity': '1'},g_thumbnailHoverEffect[j].durationBack, g_thumbnailHoverEffect[j].easingBack);
						}
						else {
							jQuery(elt).find('.imgContainer').animate({ 'opacity': '1'},g_thumbnailHoverEffect[j].durationBack, g_thumbnailHoverEffect[j].easingBack);
						}
						break;
					case 'rotateCornerBL':
						if( g_supportTransit ) {
							if( g_options.thumbnailLabel.position == 'overImageOnTop' || g_options.thumbnailLabel.position == 'overImageOnBottom' ) {
								jQuery(elt).find('.labelImage').transition({ rotate: '-90deg'},g_thumbnailHoverEffect[j].duration, g_thumbnailHoverEffect[j].easing);
								jQuery(elt).find('.imgContainer').transition({ rotate: '0deg'},g_thumbnailHoverEffect[j].duration, g_thumbnailHoverEffect[j].easing);
							}
						}
						break;
					case 'rotateCornerBR':
						if( g_supportTransit ) {
							if( g_options.thumbnailLabel.position == 'overImageOnTop' || g_options.thumbnailLabel.position == 'overImageOnBottom' ) {
								jQuery(elt).find('.labelImage').transition({ rotate: '90deg'},g_thumbnailHoverEffect[j].duration, g_thumbnailHoverEffect[j].easing);
								jQuery(elt).find('.imgContainer').transition({ rotate: '0deg'},g_thumbnailHoverEffect[j].duration, g_thumbnailHoverEffect[j].easing);
							}
						}
						break;
					case 'imageRotateCornerBL':
					case 'imageRotateCornerBR':
						if( g_supportTransit ) {
							if( g_options.thumbnailLabel.position == 'overImageOnTop' || g_options.thumbnailLabel.position == 'overImageOnBottom' ) {
								jQuery(elt).find('.imgContainer').transition({ 'rotate': '0'},g_thumbnailHoverEffect[j].durationBack, g_thumbnailHoverEffect[j].easingBack );
							}
						}
						break;
					case 'slideUp':
						if( g_options.thumbnailLabel.position == 'overImageOnTop' || g_options.thumbnailLabel.position == 'overImageOnBottom' ) {
							var n= g_oneThumbnailHeight + 'px';
							if( g_supportTransit ) {
								jQuery(elt).find('.imgContainer').transition({ 'top': 0},g_thumbnailHoverEffect[j].duration, g_thumbnailHoverEffect[j].easing);
								jQuery(elt).find('.labelImage').transition({ 'top': n},g_thumbnailHoverEffect[j].duration, g_thumbnailHoverEffect[j].easing);
							}
							else {
								jQuery(elt).find('.imgContainer').animate({ 'top': 0},g_thumbnailHoverEffect[j].duration, g_thumbnailHoverEffect[j].easing);
								jQuery(elt).find('.labelImage').animate({ 'top': n},g_thumbnailHoverEffect[j].duration, g_thumbnailHoverEffect[j].easing);
							}
						}
						break;
					case 'slideDown':
						if( g_options.thumbnailLabel.position == 'overImageOnTop' || g_options.thumbnailLabel.position == 'overImageOnBottom' ) {
							var n= '-'+g_oneThumbnailHeight + 'px';
							if( g_supportTransit ) {
								jQuery(elt).find('.imgContainer').transition({ 'top': 0},g_thumbnailHoverEffect[j].duration, g_thumbnailHoverEffect[j].easing);
								jQuery(elt).find('.labelImage').transition({ 'top': n},g_thumbnailHoverEffect[j].duration, g_thumbnailHoverEffect[j].easing);
							}
							else {
								jQuery(elt).find('.imgContainer').animate({ 'top': 0},g_thumbnailHoverEffect[j].duration, g_thumbnailHoverEffect[j].easing);
								jQuery(elt).find('.labelImage').animate({ 'top': n},g_thumbnailHoverEffect[j].duration, g_thumbnailHoverEffect[j].easing);
							}
						}
						break;
					case 'slideRight':
						if( g_options.thumbnailLabel.position == 'overImageOnTop' || g_options.thumbnailLabel.position == 'overImageOnBottom' ) {
							var n= '-'+g_oneThumbnailWidth + 'px';
							if( g_supportTransit ) {
								jQuery(elt).find('.imgContainer').transition({ 'left': 0},g_thumbnailHoverEffect[j].duration, g_thumbnailHoverEffect[j].easing);
								jQuery(elt).find('.labelImage').transition({ 'left': n},g_thumbnailHoverEffect[j].duration, g_thumbnailHoverEffect[j].easing);
							}
							else {
								jQuery(elt).find('.imgContainer').animate({ 'left': 0},g_thumbnailHoverEffect[j].duration, g_thumbnailHoverEffect[j].easing);
								jQuery(elt).find('.labelImage').animate({ 'left': n},g_thumbnailHoverEffect[j].duration, g_thumbnailHoverEffect[j].easing);
							}
						}
						break;
					case 'slideLeft':
						if( g_options.thumbnailLabel.position == 'overImageOnTop' || g_options.thumbnailLabel.position == 'overImageOnBottom' ) {
							var n= g_oneThumbnailWidth + 'px';
							if( g_supportTransit ) {
								jQuery(elt).find('.imgContainer').transition({ 'left': 0},g_thumbnailHoverEffect[j].duration, g_thumbnailHoverEffect[j].easing);
								jQuery(elt).find('.labelImage').transition({ 'left': n},g_thumbnailHoverEffect[j].duration, g_thumbnailHoverEffect[j].easing);
							}
							else {
								jQuery(elt).find('.imgContainer').animate({ 'left': 0},g_thumbnailHoverEffect[j].duration, g_thumbnailHoverEffect[j].easing);
								jQuery(elt).find('.labelImage').animate({ 'left': n},g_thumbnailHoverEffect[j].duration, g_thumbnailHoverEffect[j].easing);
							}
						}
						break;
					case 'imageSlideUp':
					case 'imageSlideDown':
					case 'imageSlideLeft':
					case 'imageSlideRight':
						if( g_options.thumbnailLabel.position == 'overImageOnTop' || g_options.thumbnailLabel.position == 'overImageOnBottom' ) {
							if( g_supportTransit ) {
								jQuery(elt).find('.imgContainer').transition({ 'top': '0'},g_thumbnailHoverEffect[j].durationBack, g_thumbnailHoverEffect[j].easingBack);
								jQuery(elt).find('.imgContainer').transition({ 'left': '0'},g_thumbnailHoverEffect[j].durationBack, g_thumbnailHoverEffect[j].easingBack);
							}
							else {
								jQuery(elt).find('.imgContainer').animate({ 'top': '0'},g_thumbnailHoverEffect[j].durationBack, g_thumbnailHoverEffect[j].easingBack);
								jQuery(elt).find('.imgContainer').animate({ 'left': '0'},g_thumbnailHoverEffect[j].durationBack, g_thumbnailHoverEffect[j].easingBack);
							}
						}
						break;
					case 'labelAppear':
					case 'labelAppear75':
						if( g_options.thumbnailLabel.position == 'overImageOnTop' || g_options.thumbnailLabel.position == 'overImageOnBottom' ) {
							if( g_supportTransit ) {
								jQuery(elt).find('.labelImage').transition({ 'opacity': '0'},g_thumbnailHoverEffect[j].durationBack, g_thumbnailHoverEffect[j].easingBack);
							}
							else {
								jQuery(elt).find('.labelImage').animate({ 'opacity': '0'},g_thumbnailHoverEffect[j].durationBack, g_thumbnailHoverEffect[j].easingBack);
							}
						}
						break;
					case 'labelSlideDown':
						if( g_options.thumbnailLabel.position == 'overImageOnTop' || g_options.thumbnailLabel.position == 'overImageOnBottom' ) {
							if( g_supportTransit ) {
								jQuery(elt).find('.labelImage').transition({ 'top': '-99%'},g_thumbnailHoverEffect[j].durationBack, g_thumbnailHoverEffect[j].easingBack);
							}
							else {
								jQuery(elt).find('.labelImage').animate({ 'top': '-99%'},g_thumbnailHoverEffect[j].durationBack, g_thumbnailHoverEffect[j].easingBack);
							}
						}
						break;
					case 'labelSlideUp':
						if( g_options.thumbnailLabel.position == 'overImageOnTop' || g_options.thumbnailLabel.position == 'overImageOnBottom' ) {
							if( g_supportTransit ) {
								jQuery(elt).find('.labelImage').transition({ 'bottom': '-99%'},g_thumbnailHoverEffect[j].durationBack, g_thumbnailHoverEffect[j].easingBack);
							}
							else {
								jQuery(elt).find('.labelImage').animate({ 'bottom': '-99%'},g_thumbnailHoverEffect[j].durationBack, g_thumbnailHoverEffect[j].easingBack);
							}
						}
						break;
					case 'descriptionSlideUp':
						if( g_options.thumbnailLabel.position == 'overImageOnBottom' ) {
							var p=g_oneThumbnailHeight - (jQuery(elt).find('.labelImage').outerHeight(true)-jQuery(elt).find('.labelImage').height()) - g_oneThumbnailLabelTitleHeight +'px';
							if( g_supportTransit ) {
								jQuery(elt).find('.labelImage').transition({ 'top': p},g_thumbnailHoverEffect[j].duration, g_thumbnailHoverEffect[j].easing);
							}
							else {
								jQuery(elt).find('.labelImage').animate({ 'top': p},g_thumbnailHoverEffect[j].duration, g_thumbnailHoverEffect[j].easing);
							}
						}
						break;
					case 'labelOpacity50':
						if( g_supportTransit ) {
							jQuery(elt).find('.labelImage').transition({ 'opacity': g_oldLabelOpacity },g_thumbnailHoverEffect[j].durationBack, g_thumbnailHoverEffect[j].easingBack);
						}
						else {
							jQuery(elt).find('.labelImage').animate({ 'opacity': g_oldLabelOpacity },g_thumbnailHoverEffect[j].durationBack, g_thumbnailHoverEffect[j].easingBack);
						}
						break;
					case 'imageOpacity50':
						if( g_supportTransit ) {
							jQuery(elt).find('.imgContainer').transition({ 'opacity': 1 },g_thumbnailHoverEffect[j].duration, g_thumbnailHoverEffect[j].easing);
						}
						else {
							jQuery(elt).find('.imgContainer').animate({ 'opacity': 1 },g_thumbnailHoverEffect[j].duration, g_thumbnailHoverEffect[j].easing);
						}
						break;
					case 'borderLighter':
					case 'borderDarker':
						if( g_supportTransit ) {
							jQuery(elt).transition({ 'borderColor': g_oldBorderColor },g_thumbnailHoverEffect[j].durationBack, g_thumbnailHoverEffect[j].easingBack);
						}
						else {
							//jQuery(elt).animate({ 'borderColor': g_oldBorderColor },g_thumbnailHoverEffect[j].durationBack, g_thumbnailHoverEffect[j].easingBack);
							jQuery(elt).animate({ 'borderTopColor': g_oldBorderColor, 'borderRightColor': g_oldBorderColor, 'borderBottomColor': g_oldBorderColor, 'borderLeftColor': g_oldBorderColor },g_thumbnailHoverEffect[j].duration, g_thumbnailHoverEffect[j].easing);
						}
						break;
					case 'imageScale150':
					case 'imageScale150Outside':
						if( g_supportTransit ) {
							jQuery(elt).find('img').transition({ scale: 1 },g_thumbnailHoverEffect[j].durationBack, g_thumbnailHoverEffect[j].easingBack);
						}
						else {
							jQuery(elt).find('img').animate({ scale: 1 },g_thumbnailHoverEffect[j].durationBack, g_thumbnailHoverEffect[j].easingBack);
						}
						break;
					case 'scale120':
						if( g_supportTransit ) {
							jQuery(elt).transition({ scale: 1 },g_thumbnailHoverEffect[j].durationBack, g_thumbnailHoverEffect[j].easingBack);
						}
						else {
							jQuery(elt).animate({ scale: 1 },g_thumbnailHoverEffect[j].durationBack, g_thumbnailHoverEffect[j].easingBack);
						}
						break;
					case 'imageFlipHorizontal':
						if( g_supportTransit ) {
							var n= Math.round(g_oneThumbnailHeight*1.2) + 'px';
							//jQuery(elt).find('.subcontainer').transition({rotateX: '0deg'}, g_thumbnailHoverEffect[j].durationBack, g_thumbnailHoverEffect[j].easingBack);
							jQuery(elt).find('.imgContainer').transition({ perspective: n, rotateX: '0deg'}, g_thumbnailHoverEffect[j].duration, g_thumbnailHoverEffect[j].easing);
							jQuery(elt).find('.labelImage').transition({ perspective: n, rotateX: '180deg'}, g_thumbnailHoverEffect[j].duration, g_thumbnailHoverEffect[j].easing);
						}
						break;
					case 'imageFlipVertical':
						if( g_supportTransit ) {
							var n= Math.round(g_oneThumbnailWidth*1.2) + 'px';
							//jQuery(elt).find('.subcontainer').transition({ rotateY: '0deg'}, g_thumbnailHoverEffect[j].durationBack, g_thumbnailHoverEffect[j].easingBack);
							jQuery(elt).find('.imgContainer').transition({ perspective: n, rotateY: '0deg'}, g_thumbnailHoverEffect[j].duration, g_thumbnailHoverEffect[j].easing);
							jQuery(elt).find('.labelImage').transition({ perspective: n, rotateY: '180deg'}, g_thumbnailHoverEffect[j].duration, g_thumbnailHoverEffect[j].easing);
						}
						break;
					case 'flipHorizontal':
						if( g_supportTransit ) {
							var n= Math.round(g_oneThumbnailHeight*1.2) + 'px';
							jQuery(elt).transition({ perspective:n, rotateX: '0deg'}, g_thumbnailHoverEffect[j].durationBack, g_thumbnailHoverEffect[j].easingBack);
						}
						break;
					case 'flipVertical':
						if( g_supportTransit ) {
							var n= Math.round(g_oneThumbnailWidth*1.2) + 'px';
							jQuery(elt).transition({ perspective:n, rotateY: '0deg'}, g_thumbnailHoverEffect[j].durationBack, g_thumbnailHoverEffect[j].easingBack);
						}
						break;
					case 'TEST':
						//if( jQueryMinVersion('1.9') ) { jQuery(elt).find('.subcontainer').finish(); }
						jQuery(elt).find('.subcontainer').transition({ scale: 0.85 },150).transition({ perspective: '50px', rotateX: '0deg'}, 300, 'ease').transition({ scale: 1 },150);
						break;
				}
			}
		}
		catch (e) { 
			nanoAlert( 'error on hoverOut ' +e.message );
		}
	};


	function SetTumbnailsContainerHeight() {
		var w=jQuery(g_containerThumbnails).width();
		var nbItemsPerLineLines=Math.floor(w/g_oneThumbnailWidthContainer);
		var nbLines=Math.ceil(g_itemInfo.length/nbItemsPerLineLines);
		var h=nbLines*g_oneThumbnailHeightContainer;
		if( g_containerThumbnailsDisplayed ) { jQuery(g_containerThumbnails).css('max-height',h); }
		return h;
	};
		
	function SetTumbnailsContainerWidth() {
		// set the max number of items per line
		if( g_oneThumbnailWidthContainer > 0 ) {
			if( g_options.maxWidth > 0 && g_oneThumbnailWidthContainer > g_options.maxWidth ) { jQuery(g_baseControl).css('maxWidth',g_oneThumbnailWidthContainer); }



			var wcont=jQuery(g_containerParent).width();
			if( g_options.maxItemsPerLine > 0 ) {
				if( g_options.maxItemsPerLine*g_oneThumbnailWidthContainer <= wcont ) {
					jQuery(g_containerThumbnails).css('max-width',g_options.maxItemsPerLine*g_oneThumbnailWidthContainer);
				}
				else {
					var w=parseInt(wcont/g_oneThumbnailWidthContainer);
					jQuery(g_containerThumbnails).css('max-width',w*g_oneThumbnailWidthContainer);
				}
			}
			else {
				var w=parseInt(wcont/g_oneThumbnailWidthContainer);	// number of thumbnails that can be displayed in 1 row
				jQuery(g_containerThumbnails).css('max-width',w*g_oneThumbnailWidthContainer);
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
		
		//jQuery(g_containerViewer).children().remove();
		//g_containerViewer=jQuery('<div class="nanoGalleryViewer" style="visibility:hidden"></div>').appendTo(g_baseControl);
		g_containerViewerContainer=jQuery('<div class="nanoGalleryViewerContainer" style="visibility:hidden"></div>').appendTo('body');
		jQuery(g_containerViewerContainer).addClass('nanogallery_theme_'+g_options.theme);
		SetColorSchemeViewer(g_containerViewerContainer);

		g_containerViewer=jQuery('<div class="nanoGalleryViewer" style="visibility:hidden"></div>').appendTo(g_containerViewerContainer);
		
		var sImg='';
		for( var i =0; i <  g_itemInfo.length ; i++ ) {
			sImg+='<img class="image" src="" style="visibility:hidden;position:absolute;top:0;bottom:0;left:0;right:0;margin:auto;">';
		}
		sImg+='<img class="image" src="" style="visibility:hidden;position:absolute;top:0;bottom:0;left:0;right:0;margin:auto;">';

		g_containerViewerContent=jQuery('<div class="content">'+sImg+'<div class="contentAreaPrevious"></div><div class="contentAreaNext"></div></div>').appendTo(g_containerViewer);
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

		jQuery(g_containerViewerContent).find('img').on("click",function(e){
			e.stopPropagation();
			if( e.pageX < (jQuery(window).width()/2) ) {
				DisplayPreviousImage();
			}
			else {
				DisplayNextImage();
			}
		});
		jQuery(g_containerViewerToolbar).find('.nextButton').on("click",function(){ DisplayNextImage(); });
		jQuery(g_containerViewerToolbar).find('.previousButton').on("click",function(){ DisplayPreviousImage(); });
		jQuery(g_containerViewerContent).find('.contentAreaNext').on("click",function(e){ e.stopPropagation(); DisplayNextImage(); });
		jQuery(g_containerViewerContent).find('.contentAreaPrevious').on("click",function(e){ e.stopPropagation(); DisplayPreviousImage(); });

		
		jQuery(g_containerViewerContent).on("click",function(e){ e.stopPropagation(); CloseInternalViewer(); });

	};
	
	function DisplayNextImage() {
		g_viewerPreviousItem=g_viewerCurrentItem;
		if( g_viewerCurrentItem == g_itemInfo.length-1 ) {
			g_viewerCurrentItem=0;
		}
		else {
			g_viewerCurrentItem++;
		}
		DisplayInternalViewer();
	};
	function DisplayPreviousImage() {
		g_viewerPreviousItem=g_viewerCurrentItem;
		if( g_viewerCurrentItem == 0 ) {
			g_viewerCurrentItem=g_itemInfo.length-1;
		}
		else {
			g_viewerCurrentItem--;
		}
		DisplayInternalViewer();
	};

	
	function DisplayInternalViewer() {
		var url=g_itemInfo[g_viewerCurrentItem].src;


		// set the url and visibility
		jQuery(g_containerViewerContent).find('img:eq('+g_viewerCurrentItem+')').attr('src',g_itemInfo[g_viewerCurrentItem].src);
		if( (g_viewerCurrentItem+1) < g_itemInfo.length ) {
			// set also the url of the next image for pre-loading
			jQuery(g_containerViewerContent).find('img:eq('+(g_viewerCurrentItem+1)+')').attr('src',g_itemInfo[g_viewerCurrentItem+1].src);
		}
		if( g_viewerPreviousItem != -1 ) {
			set2ElementsOnTop( jQuery(g_containerViewerContent), jQuery(g_containerViewerContent).find('img:eq('+g_viewerPreviousItem+')'), jQuery(g_containerViewerContent).find('img:eq('+g_viewerCurrentItem+')') );
		}
		else {
			//set2ElementsOnTop( jQuery(g_containerViewerContent), jQuery(g_containerViewerContent).find('img:eq('+g_viewerPreviousItem+')'), jQuery(g_containerViewerContent).find('img:eq('+g_viewerCurrentItem+')') );
		}


	
		jQuery(g_containerViewerContent).find('img:eq('+g_viewerCurrentItem+')').css({'visibility':'visible', 'opacity':0});
		if( g_viewerPreviousItem != -1 ) {
			jQuery(g_containerViewerContent).find('img:eq('+g_viewerCurrentItem+')').animate({ 'opacity': '1' });
			jQuery(g_containerViewerContent).find('img:eq('+g_viewerPreviousItem+')').animate({ 'opacity': '0' }, function() {
				jQuery(g_containerViewerContent).find('img:eq('+g_viewerPreviousItem+')').css('visibility','hidden');
				setElementOnTop( jQuery(g_containerViewer), jQuery(g_containerViewerContent).find('.contentAreaPrevious') );
				setElementOnTop( jQuery(g_containerViewer), jQuery(g_containerViewerContent).find('.contentAreaNext') );
			});
		}
		else {
			jQuery(g_containerViewerContent).find('img:eq('+g_viewerCurrentItem+')').animate({ 'opacity': '1' });
		}

		
		
		// set title
		if( g_itemInfo[g_viewerCurrentItem]['title'] !== undefined ) {
			jQuery(g_containerViewerToolbar).find('.title').text(g_itemInfo[g_viewerCurrentItem]['title']);
		}
		else {
			jQuery(g_containerViewerToolbar).find('.title').text('');
		}
		// set description
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
			jQuery(g_containerViewerContainer).remove();
			jQuery('body').css('overflow','inherit');
			g_viewerPreviousItem=-1;
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
		//jQuery(g_containerViewerCloseFloating).css('top',pt-11);
		//jQuery(g_containerViewerCloseFloating).css('left',pl-11);
		
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
		s+=s1+'.nanoGalleryViewer .toolbar .previousButton:after { background:'+cs.barBackground+'; color:'+cs.barColor+'; }'+'\n';
		s+=s1+'.nanoGalleryViewer .toolbar .nextButton:after { background:'+cs.barBackground+'; color:'+cs.barColor+'; }'+'\n';
		s+=s1+'.nanoGalleryViewer .toolbar .closeButton:after { background:'+cs.barBackground+'; color:'+cs.barColor+'; }'+'\n';
		s+=s1+'.nanoGalleryViewer .toolbar .label { background:'+cs.barBackground+'; }'+'\n';
		s+=s1+'.nanoGalleryViewer .toolbar .label .title { background:'+cs.barBackground+'; color:'+cs.barColor+'; }'+'\n';
		s+=s1+'.nanoGalleryViewer .toolbar .label .description { background:'+cs.barBackground+'; color:'+cs.barDescriptionColor+'; }'+'\n';
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
	
	// write to console log
	function nanoConsoleLog( msg ) {
		if (window.console) { console.log('nanoGALLERY: ' + msg); }
	};
	
	
	// set z-index to display element on top of all others
	function setElementOnTop( start, elt ) {
		var highest_index = 0;
		if( start=='' ) { start= '*'; }
		//jQuery('[z-index]').each(function() {
		jQuery(start).each(function() {
			var cur = parseInt(jQuery(this).css('z-index'));
			highest_index = cur > highest_index ? cur : highest_index;

			// if (jQuery(this).css("z-index") > highest_index) {
				//highest_index = parseInt(jQuery(this).attr("z-index"));
			// }
		});
		highest_index++;
		jQuery(elt).css('z-index',highest_index);
	};

	// set z-index to display 2 elements on top of all others
	function set2ElementsOnTop( start, elt1, elt2 ) {
		var highest_index = 0;
		if( start=='' ) { start= '*'; }
		//jQuery('[z-index]').each(function() {
		jQuery(start).each(function() {
			var cur = parseInt(jQuery(this).css('z-index'));
			highest_index = cur > highest_index ? cur : highest_index;

			// if (jQuery(this).css("z-index") > highest_index) {
				//highest_index = parseInt(jQuery(this).attr("z-index"));
			// }
		});
		highest_index++;
		jQuery(elt2).css('z-index',highest_index+1);
		jQuery(elt1).css('z-index',highest_index);
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



/*!
 * jQuery Color Animations v2.1.2
 * https://github.com/jquery/jquery-color
 *
 * Copyright 2013 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * Date: Wed Jan 16 08:47:09 2013 -0600
 */
(function( jQuery, undefined ) {

	var stepHooks = "backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor",

	// plusequals test for += 100 -= 100
	rplusequals = /^([\-+])=\s*(\d+\.?\d*)/,
	// a set of RE's that can match strings and generate color tuples.
	stringParsers = [{
			re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
			parse: function( execResult ) {
				return [
					execResult[ 1 ],
					execResult[ 2 ],
					execResult[ 3 ],
					execResult[ 4 ]
				];
			}
		}, {
			re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
			parse: function( execResult ) {
				return [
					execResult[ 1 ] * 2.55,
					execResult[ 2 ] * 2.55,
					execResult[ 3 ] * 2.55,
					execResult[ 4 ]
				];
			}
		}, {
			// this regex ignores A-F because it's compared against an already lowercased string
			re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,
			parse: function( execResult ) {
				return [
					parseInt( execResult[ 1 ], 16 ),
					parseInt( execResult[ 2 ], 16 ),
					parseInt( execResult[ 3 ], 16 )
				];
			}
		}, {
			// this regex ignores A-F because it's compared against an already lowercased string
			re: /#([a-f0-9])([a-f0-9])([a-f0-9])/,
			parse: function( execResult ) {
				return [
					parseInt( execResult[ 1 ] + execResult[ 1 ], 16 ),
					parseInt( execResult[ 2 ] + execResult[ 2 ], 16 ),
					parseInt( execResult[ 3 ] + execResult[ 3 ], 16 )
				];
			}
		}, {
			re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
			space: "hsla",
			parse: function( execResult ) {
				return [
					execResult[ 1 ],
					execResult[ 2 ] / 100,
					execResult[ 3 ] / 100,
					execResult[ 4 ]
				];
			}
		}],

	// jQuery.Color( )
	color = jQuery.Color = function( color, green, blue, alpha ) {
		return new jQuery.Color.fn.parse( color, green, blue, alpha );
	},
	spaces = {
		rgba: {
			props: {
				red: {
					idx: 0,
					type: "byte"
				},
				green: {
					idx: 1,
					type: "byte"
				},
				blue: {
					idx: 2,
					type: "byte"
				}
			}
		},

		hsla: {
			props: {
				hue: {
					idx: 0,
					type: "degrees"
				},
				saturation: {
					idx: 1,
					type: "percent"
				},
				lightness: {
					idx: 2,
					type: "percent"
				}
			}
		}
	},
	propTypes = {
		"byte": {
			floor: true,
			max: 255
		},
		"percent": {
			max: 1
		},
		"degrees": {
			mod: 360,
			floor: true
		}
	},
	support = color.support = {},

	// element for support tests
	supportElem = jQuery( "<p>" )[ 0 ],

	// colors = jQuery.Color.names
	colors,

	// local aliases of functions called often
	each = jQuery.each;

// determine rgba support immediately
supportElem.style.cssText = "background-color:rgba(1,1,1,.5)";
support.rgba = supportElem.style.backgroundColor.indexOf( "rgba" ) > -1;

// define cache name and alpha properties
// for rgba and hsla spaces
each( spaces, function( spaceName, space ) {
	space.cache = "_" + spaceName;
	space.props.alpha = {
		idx: 3,
		type: "percent",
		def: 1
	};
});

function clamp( value, prop, allowEmpty ) {
	var type = propTypes[ prop.type ] || {};

	if ( value == null ) {
		return (allowEmpty || !prop.def) ? null : prop.def;
	}

	// ~~ is an short way of doing floor for positive numbers
	value = type.floor ? ~~value : parseFloat( value );

	// IE will pass in empty strings as value for alpha,
	// which will hit this case
	if ( isNaN( value ) ) {
		return prop.def;
	}

	if ( type.mod ) {
		// we add mod before modding to make sure that negatives values
		// get converted properly: -10 -> 350
		return (value + type.mod) % type.mod;
	}

	// for now all property types without mod have min and max
	return 0 > value ? 0 : type.max < value ? type.max : value;
}

function stringParse( string ) {
	var inst = color(),
		rgba = inst._rgba = [];

	string = string.toLowerCase();

	each( stringParsers, function( i, parser ) {
		var parsed,
			match = parser.re.exec( string ),
			values = match && parser.parse( match ),
			spaceName = parser.space || "rgba";

		if ( values ) {
			parsed = inst[ spaceName ]( values );

			// if this was an rgba parse the assignment might happen twice
			// oh well....
			inst[ spaces[ spaceName ].cache ] = parsed[ spaces[ spaceName ].cache ];
			rgba = inst._rgba = parsed._rgba;

			// exit each( stringParsers ) here because we matched
			return false;
		}
	});

	// Found a stringParser that handled it
	if ( rgba.length ) {

		// if this came from a parsed string, force "transparent" when alpha is 0
		// chrome, (and maybe others) return "transparent" as rgba(0,0,0,0)
		if ( rgba.join() === "0,0,0,0" ) {
			jQuery.extend( rgba, colors.transparent );
		}
		return inst;
	}

	// named colors
	return colors[ string ];
}

color.fn = jQuery.extend( color.prototype, {
	parse: function( red, green, blue, alpha ) {
		if ( red === undefined ) {
			this._rgba = [ null, null, null, null ];
			return this;
		}
		if ( red.jquery || red.nodeType ) {
			red = jQuery( red ).css( green );
			green = undefined;
		}

		var inst = this,
			type = jQuery.type( red ),
			rgba = this._rgba = [];

		// more than 1 argument specified - assume ( red, green, blue, alpha )
		if ( green !== undefined ) {
			red = [ red, green, blue, alpha ];
			type = "array";
		}

		if ( type === "string" ) {
			return this.parse( stringParse( red ) || colors._default );
		}

		if ( type === "array" ) {
			each( spaces.rgba.props, function( key, prop ) {
				rgba[ prop.idx ] = clamp( red[ prop.idx ], prop );
			});
			return this;
		}

		if ( type === "object" ) {
			if ( red instanceof color ) {
				each( spaces, function( spaceName, space ) {
					if ( red[ space.cache ] ) {
						inst[ space.cache ] = red[ space.cache ].slice();
					}
				});
			} else {
				each( spaces, function( spaceName, space ) {
					var cache = space.cache;
					each( space.props, function( key, prop ) {

						// if the cache doesn't exist, and we know how to convert
						if ( !inst[ cache ] && space.to ) {

							// if the value was null, we don't need to copy it
							// if the key was alpha, we don't need to copy it either
							if ( key === "alpha" || red[ key ] == null ) {
								return;
							}
							inst[ cache ] = space.to( inst._rgba );
						}

						// this is the only case where we allow nulls for ALL properties.
						// call clamp with alwaysAllowEmpty
						inst[ cache ][ prop.idx ] = clamp( red[ key ], prop, true );
					});

					// everything defined but alpha?
					if ( inst[ cache ] && jQuery.inArray( null, inst[ cache ].slice( 0, 3 ) ) < 0 ) {
						// use the default of 1
						inst[ cache ][ 3 ] = 1;
						if ( space.from ) {
							inst._rgba = space.from( inst[ cache ] );
						}
					}
				});
			}
			return this;
		}
	},
	is: function( compare ) {
		var is = color( compare ),
			same = true,
			inst = this;

		each( spaces, function( _, space ) {
			var localCache,
				isCache = is[ space.cache ];
			if (isCache) {
				localCache = inst[ space.cache ] || space.to && space.to( inst._rgba ) || [];
				each( space.props, function( _, prop ) {
					if ( isCache[ prop.idx ] != null ) {
						same = ( isCache[ prop.idx ] === localCache[ prop.idx ] );
						return same;
					}
				});
			}
			return same;
		});
		return same;
	},
	_space: function() {
		var used = [],
			inst = this;
		each( spaces, function( spaceName, space ) {
			if ( inst[ space.cache ] ) {
				used.push( spaceName );
			}
		});
		return used.pop();
	},
	transition: function( other, distance ) {
		var end = color( other ),
			spaceName = end._space(),
			space = spaces[ spaceName ],
			startColor = this.alpha() === 0 ? color( "transparent" ) : this,
			start = startColor[ space.cache ] || space.to( startColor._rgba ),
			result = start.slice();

		end = end[ space.cache ];
		each( space.props, function( key, prop ) {
			var index = prop.idx,
				startValue = start[ index ],
				endValue = end[ index ],
				type = propTypes[ prop.type ] || {};

			// if null, don't override start value
			if ( endValue === null ) {
				return;
			}
			// if null - use end
			if ( startValue === null ) {
				result[ index ] = endValue;
			} else {
				if ( type.mod ) {
					if ( endValue - startValue > type.mod / 2 ) {
						startValue += type.mod;
					} else if ( startValue - endValue > type.mod / 2 ) {
						startValue -= type.mod;
					}
				}
				result[ index ] = clamp( ( endValue - startValue ) * distance + startValue, prop );
			}
		});
		return this[ spaceName ]( result );
	},
	blend: function( opaque ) {
		// if we are already opaque - return ourself
		if ( this._rgba[ 3 ] === 1 ) {
			return this;
		}

		var rgb = this._rgba.slice(),
			a = rgb.pop(),
			blend = color( opaque )._rgba;

		return color( jQuery.map( rgb, function( v, i ) {
			return ( 1 - a ) * blend[ i ] + a * v;
		}));
	},
	toRgbaString: function() {
		var prefix = "rgba(",
			rgba = jQuery.map( this._rgba, function( v, i ) {
				return v == null ? ( i > 2 ? 1 : 0 ) : v;
			});

		if ( rgba[ 3 ] === 1 ) {
			rgba.pop();
			prefix = "rgb(";
		}

		return prefix + rgba.join() + ")";
	},
	toHslaString: function() {
		var prefix = "hsla(",
			hsla = jQuery.map( this.hsla(), function( v, i ) {
				if ( v == null ) {
					v = i > 2 ? 1 : 0;
				}

				// catch 1 and 2
				if ( i && i < 3 ) {
					v = Math.round( v * 100 ) + "%";
				}
				return v;
			});

		if ( hsla[ 3 ] === 1 ) {
			hsla.pop();
			prefix = "hsl(";
		}
		return prefix + hsla.join() + ")";
	},
	toHexString: function( includeAlpha ) {
		var rgba = this._rgba.slice(),
			alpha = rgba.pop();

		if ( includeAlpha ) {
			rgba.push( ~~( alpha * 255 ) );
		}

		return "#" + jQuery.map( rgba, function( v ) {

			// default to 0 when nulls exist
			v = ( v || 0 ).toString( 16 );
			return v.length === 1 ? "0" + v : v;
		}).join("");
	},
	toString: function() {
		return this._rgba[ 3 ] === 0 ? "transparent" : this.toRgbaString();
	}
});
color.fn.parse.prototype = color.fn;

// hsla conversions adapted from:
// https://code.google.com/p/maashaack/source/browse/packages/graphics/trunk/src/graphics/colors/HUE2RGB.as?r=5021

function hue2rgb( p, q, h ) {
	h = ( h + 1 ) % 1;
	if ( h * 6 < 1 ) {
		return p + (q - p) * h * 6;
	}
	if ( h * 2 < 1) {
		return q;
	}
	if ( h * 3 < 2 ) {
		return p + (q - p) * ((2/3) - h) * 6;
	}
	return p;
}

spaces.hsla.to = function ( rgba ) {
	if ( rgba[ 0 ] == null || rgba[ 1 ] == null || rgba[ 2 ] == null ) {
		return [ null, null, null, rgba[ 3 ] ];
	}
	var r = rgba[ 0 ] / 255,
		g = rgba[ 1 ] / 255,
		b = rgba[ 2 ] / 255,
		a = rgba[ 3 ],
		max = Math.max( r, g, b ),
		min = Math.min( r, g, b ),
		diff = max - min,
		add = max + min,
		l = add * 0.5,
		h, s;

	if ( min === max ) {
		h = 0;
	} else if ( r === max ) {
		h = ( 60 * ( g - b ) / diff ) + 360;
	} else if ( g === max ) {
		h = ( 60 * ( b - r ) / diff ) + 120;
	} else {
		h = ( 60 * ( r - g ) / diff ) + 240;
	}

	// chroma (diff) == 0 means greyscale which, by definition, saturation = 0%
	// otherwise, saturation is based on the ratio of chroma (diff) to lightness (add)
	if ( diff === 0 ) {
		s = 0;
	} else if ( l <= 0.5 ) {
		s = diff / add;
	} else {
		s = diff / ( 2 - add );
	}
	return [ Math.round(h) % 360, s, l, a == null ? 1 : a ];
};

spaces.hsla.from = function ( hsla ) {
	if ( hsla[ 0 ] == null || hsla[ 1 ] == null || hsla[ 2 ] == null ) {
		return [ null, null, null, hsla[ 3 ] ];
	}
	var h = hsla[ 0 ] / 360,
		s = hsla[ 1 ],
		l = hsla[ 2 ],
		a = hsla[ 3 ],
		q = l <= 0.5 ? l * ( 1 + s ) : l + s - l * s,
		p = 2 * l - q;

	return [
		Math.round( hue2rgb( p, q, h + ( 1 / 3 ) ) * 255 ),
		Math.round( hue2rgb( p, q, h ) * 255 ),
		Math.round( hue2rgb( p, q, h - ( 1 / 3 ) ) * 255 ),
		a
	];
};


each( spaces, function( spaceName, space ) {
	var props = space.props,
		cache = space.cache,
		to = space.to,
		from = space.from;

	// makes rgba() and hsla()
	color.fn[ spaceName ] = function( value ) {

		// generate a cache for this space if it doesn't exist
		if ( to && !this[ cache ] ) {
			this[ cache ] = to( this._rgba );
		}
		if ( value === undefined ) {
			return this[ cache ].slice();
		}

		var ret,
			type = jQuery.type( value ),
			arr = ( type === "array" || type === "object" ) ? value : arguments,
			local = this[ cache ].slice();

		each( props, function( key, prop ) {
			var val = arr[ type === "object" ? key : prop.idx ];
			if ( val == null ) {
				val = local[ prop.idx ];
			}
			local[ prop.idx ] = clamp( val, prop );
		});

		if ( from ) {
			ret = color( from( local ) );
			ret[ cache ] = local;
			return ret;
		} else {
			return color( local );
		}
	};

	// makes red() green() blue() alpha() hue() saturation() lightness()
	each( props, function( key, prop ) {
		// alpha is included in more than one space
		if ( color.fn[ key ] ) {
			return;
		}
		color.fn[ key ] = function( value ) {
			var vtype = jQuery.type( value ),
				fn = ( key === "alpha" ? ( this._hsla ? "hsla" : "rgba" ) : spaceName ),
				local = this[ fn ](),
				cur = local[ prop.idx ],
				match;

			if ( vtype === "undefined" ) {
				return cur;
			}

			if ( vtype === "function" ) {
				value = value.call( this, cur );
				vtype = jQuery.type( value );
			}
			if ( value == null && prop.empty ) {
				return this;
			}
			if ( vtype === "string" ) {
				match = rplusequals.exec( value );
				if ( match ) {
					value = cur + parseFloat( match[ 2 ] ) * ( match[ 1 ] === "+" ? 1 : -1 );
				}
			}
			local[ prop.idx ] = value;
			return this[ fn ]( local );
		};
	});
});

// add cssHook and .fx.step function for each named hook.
// accept a space separated string of properties
color.hook = function( hook ) {
	var hooks = hook.split( " " );
	each( hooks, function( i, hook ) {
		jQuery.cssHooks[ hook ] = {
			set: function( elem, value ) {
				var parsed, curElem,
					backgroundColor = "";

				if ( value !== "transparent" && ( jQuery.type( value ) !== "string" || ( parsed = stringParse( value ) ) ) ) {
					value = color( parsed || value );
					if ( !support.rgba && value._rgba[ 3 ] !== 1 ) {
						curElem = hook === "backgroundColor" ? elem.parentNode : elem;
						while (
							(backgroundColor === "" || backgroundColor === "transparent") &&
							curElem && curElem.style
						) {
							try {
								backgroundColor = jQuery.css( curElem, "backgroundColor" );
								curElem = curElem.parentNode;
							} catch ( e ) {
							}
						}

						value = value.blend( backgroundColor && backgroundColor !== "transparent" ?
							backgroundColor :
							"_default" );
					}

					value = value.toRgbaString();
				}
				try {
					elem.style[ hook ] = value;
				} catch( e ) {
					// wrapped to prevent IE from throwing errors on "invalid" values like 'auto' or 'inherit'
				}
			}
		};
		jQuery.fx.step[ hook ] = function( fx ) {
			if ( !fx.colorInit ) {
				fx.start = color( fx.elem, hook );
				fx.end = color( fx.end );
				fx.colorInit = true;
			}
			jQuery.cssHooks[ hook ].set( fx.elem, fx.start.transition( fx.end, fx.pos ) );
		};
	});

};

color.hook( stepHooks );

jQuery.cssHooks.borderColor = {
	expand: function( value ) {
		var expanded = {};

		each( [ "Top", "Right", "Bottom", "Left" ], function( i, part ) {
			expanded[ "border" + part + "Color" ] = value;
		});
		return expanded;
	}
};

// Basic color names only.
// Usage of any of the other color names requires adding yourself or including
// jquery.color.svg-names.js.
colors = jQuery.Color.names = {
	// 4.1. Basic color keywords
	aqua: "#00ffff",
	black: "#000000",
	blue: "#0000ff",
	fuchsia: "#ff00ff",
	gray: "#808080",
	green: "#008000",
	lime: "#00ff00",
	maroon: "#800000",
	navy: "#000080",
	olive: "#808000",
	purple: "#800080",
	red: "#ff0000",
	silver: "#c0c0c0",
	teal: "#008080",
	white: "#ffffff",
	yellow: "#ffff00",

	// 4.2.3. "transparent" color keyword
	transparent: [ null, null, null, 0 ],

	_default: "#ffffff"
};

})( jQuery );



