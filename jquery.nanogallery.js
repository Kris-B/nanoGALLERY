/**!
 * @preserve nanoGALLERY v3.4.0
 * Plugin for jQuery by Christophe Brisbois
 * http://nanogallery.brisbois.fr
 * 
 * External components:
 *  - jQuery (http://www.jquery.com)
 * 	- Color animation (http://www.bitstorm.org/jquery/color-animation/) - is embedded
 *  - Transit (http://ricostacruz.com/jquery.transit/) - optional
 *  - fancybox (http://www.fancybox.net) - optional
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
			colorScheme:'none',
			colorSchemeViewer:'none',
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
			colorScheme:'none',
			colorSchemeViewer:'none',
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
			thumbnailLabel:{position:'overImageOnBottom',display:true,displayDescription:true},
			preset:'none'
		}, options );


		return this.each(function(index) {
			g_save=jQuery(this)[0].outerHTML;
			g_containerDemo =jQuery('<div class="nanoGalleryDemo" style="padding:5px"></div>').replaceAll(this);
		
			var sHoverEffects='<option style="color:#000">none</option>';
			sHoverEffects+='<option style="color:#000">slideUp</option><option style="color:#000">slideDown</option><option style="color:#000">slideLeft</option><option style="color:#000">slideRight</option>';
			sHoverEffects+='<option style="color:#000">imageSlideUp</option><option style="color:#000">imageSlideDown</option><option style="color:#000">imageSlideLeft</option><option style="color:#000">imageSlideRight</option>';
			sHoverEffects+='<option style="color:#000">labelAppear</option><option style="color:#000">labelAppear75</option><option style="color:#000">labelSlideDown</option><option style="color:#000">labelSlideUp</option>';
			sHoverEffects+='<option style="color:#000">labelOpacity50</option><option style="color:#000">imageScale150</option><option style="color:#000">imageScale150Outside</option><option style="color:#000">scale120</option>';
			sHoverEffects+='<option style="color:#000">borderLighter</option><option style="color:#000">borderDarker</option><option style="color:#000">imageInvisible</option><option style="color:#000">overScale</option>';
			sHoverEffects+='<option style="color:#000">overScaleOutside</option><option style="color:#000">scaleLabelOverImage</option><option style="color:#000"></option>';
			sHoverEffects+='<option style="color:#000">imageFlipHorizontal*</option><option style="color:#000">imageFlipVertical*</option>';
			sHoverEffects+='<option style="color:#000">rotateCornerBR*</option><option style="color:#000">rotateCornerBL*</option><option style="color:#000">imageRotateCornerBR*</option><option style="color:#000">imageRotateCornerBL*</option>';

			var sPanel='<div style="margin:10px auto 30px auto;width:400px;text-align:center;border:1px solid #555;background:#000;padding:5px;font-size:1.2em;"><span style="color:#d3d3d3;">nano</span><span style="color:#6e6;">GALLERY</span> - demonstration panel</div>';
			sPanel+='<div style="display:inline-block;">Thumbnail hover effect 1:&nbsp;<select name="lHoverEffect1" style="color:#000">'+sHoverEffects+'</select></div>';
			sPanel+='<br><div style="display:inline-block;">Thumbnail hover effect 2:&nbsp;<select name="lHoverEffect2" style="color:#000">'+sHoverEffects+'</select></div>';
			sPanel+='<br><div style="display:inline-block;">Thumbnail hover effect 3:&nbsp;<select name="lHoverEffect3" style="color:#000">'+sHoverEffects+'</select></div>';
			sPanel+='<br><div style="display:inline-block;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*: requires Transit plugin</div>';
			sPanel+='<br><br><div style="display:inline-block;">Thumbnail size:&nbsp;Width (px):&nbsp;<input type="text" name="thumbWidth" value="100" style="width:50px;color:#000">&nbsp;&nbsp;Height (px):&nbsp;<input type="text" name="thumbHeight" value="100" style="width:50px;color:#000"></div>';
			//sPanel+='<br><br><div style="display:inline-block;">Maximum number of thumbnails per line:&nbsp;<input type="text" name="thumbMaxItemsPerLine" value="" style="width:50px;color:#000"></div>';
			//sPanel+='<div style="display:inline-block;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Maximum gallery width (px): <input type="text" name="thumbMaxWidth" value="" style="width:50px;color:#000"></div>';
			sPanel+='<br><br><div>Thumbnail label: </div>';
			sPanel+='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Position: <form style="display:inline-block;"><input type="radio" name="thumbnailLabelPosition" value="overImageOnBottom" checked>overImageOnBottom&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="radio" name="thumbnailLabelPosition" value="overImageOnTop">overImageOnTop&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="radio" name="thumbnailLabelPosition" value="onBottom">onBottom</form>';
			sPanel+='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox" name="thumbnailLabelDisplay" value="true" checked>Display label';
			sPanel+='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox" name="thumbnailLabelDisplayDescription" value="true" checked>Display description';
			sPanel+='<br><br><div>Color scheme: ';
			sPanel+='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<form style="display:inline-block;"><input type="radio" name="colorScheme" value="none" checked>none &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="radio" name="colorScheme" value="dark">dark &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="radio" name="colorScheme" value="darkRed">darkRed &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
			sPanel+='<input type="radio" name="colorScheme" value="darkGreen">darkGreen &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="radio" name="colorScheme" value="darkBlue">darkBlue &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
			sPanel+='<input type="radio" name="colorScheme" value="darkOrange">darkOrange &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="radio" name="colorScheme" value="light">light';
			sPanel+='</form></div>';
			sPanel+='<br><div>CSS file: ';
			sPanel+='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<form style="display:inline-block;"><input type="radio" name="cssFile" value="default" checked>default &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="radio" name="cssFile" value="clean">clean</form></div>';
			sPanel+='<br><div>Background color (not a nanoGALLERY parameter): ';
			sPanel+='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<form style="display:inline-block;"><input type="radio" name="backgroundColor" value="dark" checked>Dark&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="radio" name="backgroundColor" value="light">Light</form></div>';


			sPanel+='<div style="display:table;margin:auto;"><button name="bGo" "type="button" style="color:#000;padding:5px 15px;margin:5px;">Launch</button></div>';

			sPanel+='<hr><div style="display:table;margin:15px auto;text-align:center;">';
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
				setPreset('imageRotateCornerBL*','scale120','borderLighter','overImageOnBottom',true,true,'dark');
			});
			jQuery(g_containerDemoPanel).find('button[name=bPreset3]').on("click",function(){
				setPreset('imageScale150','labelSlideUp','none','overImageOnBottom',true,true,'dark');
			});
			jQuery(g_containerDemoPanel).find('button[name=bPreset4]').on("click",function(){
				setPreset('imageInvisible','imageScale150Outside','none','overImageOnBottom',true,true,'light');
			});
			jQuery(g_containerDemoPanel).find('button[name=bPreset5]').on("click",function(){
				setPreset('none','none','none','overImageOnBottom',true,true,'dark');
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
		g_containerViewer=null,
		g_containerViewerDisplayed=false,
		g_containerThumbnailsDisplayed=false,
		g_containerViewerCloseFloating=null,
		g_containerViewerContent=null,
		g_containerViewerToolbar=null,
		g_path2timthumb="",
		g_itemInfo=[],
		g_oneThumbnailWidth=100,
		g_oneThumbnailHeight=100,
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
		background:'rgba(1, 1, 1, 0.75)', imageBorder:'12px solid #f8f8f8', imageBoxShadow:'#888 0px 0px 20px', barBackground:'#222', barBorder:'2px solid #111', barColor:'#eee', barDescriptionColor:'#aaa'
	};
	var g_colorSchemeViewer_darkRed = {
		// #ffa3a3 #ff7373 #ff4040 #ff0000 #a60000
		background:'rgba(1, 1, 1, 0.75)', imageBorder:'12px solid #ffa3a3', imageBoxShadow:'#ff0000 0px 0px 20px', barBackground:'#a60000', barBorder:'2px solid #111', barColor:'#eee', barDescriptionColor:'#aaa'
	};
	var g_colorSchemeViewer_darkGreen = {
		// #97e697 #67e667 #39e639 #00cc00 #008500
		background:'rgba(1, 1, 1, 0.75)', imageBorder:'12px solid #97e697', imageBoxShadow:'#00cc00 0px 0px 20px', barBackground:'#008500', barBorder:'2px solid #111', barColor:'#eee', barDescriptionColor:'#aaa'
	};
	var g_colorSchemeViewer_darkBlue = {
		// #a0b0d7 #7080d7 #4a60d7 #162ea2 #071871
		background:'rgba(1, 1, 1, 0.75)', imageBorder:'12px solid #a0b0d7', imageBoxShadow:'#162ea2 0px 0px 20px', barBackground:'#071871', barBorder:'2px solid #111', barColor:'#eee', barDescriptionColor:'#aaa'
	};
	var g_colorSchemeViewer_darkOrange = {
		// #ffd7b7 #ffd773 #ffc840 #ffb600 #a67600
		background:'rgba(1, 1, 1, 0.75)', imageBorder:'12px solid #ffd7b7', imageBoxShadow:'#ffb600 0px 0px 20px', barBackground:'#a67600', barBorder:'2px solid #111', barColor:'#eee', barDescriptionColor:'#aaa'
	};
	var g_colorSchemeViewer_light = {
		background:'rgba(1, 1, 1, 0.75)', imageBorder:'12px solid #f8f8f8', imageBoxShadow:'#888 0px 0px 20px', barBackground:'#222', barBorder:'2px solid #111', barColor:'#eee', barDescriptionColor:'#aaa'
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
			jQuery(g_baseControl).css('maxWidth',+g_options.maxWidth);
			jQuery(g_baseControl).css('margin-left','auto');
			jQuery(g_baseControl).css('margin-right','auto');
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
				case 'imageScale150':
				case 'imageScale150Outside':
				case 'scale120':
				case 'borderLighter':
				case 'borderDarker':
				case 'imageInvisible':
				case 'overScale':
				case 'overScaleOutside':
				case 'scaleLabelOverImage':
					break;

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
		g_oneThumbnailHeight=0;
		
		// if one description is defined then put a value to those without
		var foundDesc=false;
		if( g_options.thumbnailLabel.position == 'onBottom'  ) {
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
				if( g_options.thumbnailLabel.display == true ) {
					jQuery(newDivTemp1).append('<div class="iconInfo"></div>');
					var sDesc='';
					if( g_options.thumbnailLabel.displayDescription == true ) { sDesc = item.description; }
					var newLabel=jQuery(newDivTemp1).append('<div class="labelImage" style="width:'+g_options.thumbnailWidth+'px;max-height:'+g_options.thumbnailHeight+'px;"><div class="labelFolderTitle">'+item.title+'</div><div class="labelDescription">'+sDesc+'</div></div>');
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
			

			if( g_oneThumbnailWidth == 0 ) { g_oneThumbnailWidth=jQuery(newDiv).outerWidth(true); }
			if( g_oneThumbnailHeight == 0 ) { g_oneThumbnailHeight=jQuery(newDiv).outerHeight(true); }
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
				case 'imageFlipHorizontal':
					if( g_supportTransit ) {
						var n= Math.round(g_oneThumbnailHeight*1.2) + 'px';
						//jQuery(elt).css({ perspective: n, 'backface-visibility': 'hidden' });
						//jQuery(elt).find('.subcontainer').css({perspective: n, 'rotateX': '0deg', 'transform-style':'preserve-3d', 'backface-visibility': 'hidden'});
						jQuery(elt).find('.imgContainer').css({perspective: n, rotateX: '0deg', 'backface-visibility': 'hidden'});
						//jQuery(elt).find('.imgcontainer').css({perspective: n, rotateX: '0deg', 'backface-visibility': 'hidden'});
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
					case 'labelOpacity50':
						if( g_supportTransit ) {
							jQuery(elt).find('.labelImage').transition({ 'opacity': 0.5 },g_thumbnailHoverEffect[j].duration, g_thumbnailHoverEffect[j].easing);
						}
						else {
							jQuery(elt).find('.labelImage').animate({ 'opacity': 0.5 },g_thumbnailHoverEffect[j].duration, g_thumbnailHoverEffect[j].easing);
						}
						break;
					case 'borderLighter':
						if( g_supportTransit ) {
							jQuery(elt).transition({ 'borderColor': lighterColor(g_oldBorderColor,0.5) },g_thumbnailHoverEffect[j].duration, g_thumbnailHoverEffect[j].easing);
						}
						else {
							jQuery(elt).animate({ 'borderColor': lighterColor(g_oldBorderColor,0.5) },g_thumbnailHoverEffect[j].duration, g_thumbnailHoverEffect[j].easing);
						}
						break;
					case 'borderDarker':
						if( g_supportTransit ) {
							jQuery(elt).transition({ 'borderColor': darkerColor(g_oldBorderColor,0.5) },g_thumbnailHoverEffect[j].duration, g_thumbnailHoverEffect[j].easing);
						}
						else {
							jQuery(elt).animate({ 'borderColor': darkerColor(g_oldBorderColor,0.5) },g_thumbnailHoverEffect[j].duration, g_thumbnailHoverEffect[j].easing);
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
					case 'labelOpacity50':
						if( g_supportTransit ) {
							jQuery(elt).find('.labelImage').transition({ 'opacity': g_oldLabelOpacity },g_thumbnailHoverEffect[j].durationBack, g_thumbnailHoverEffect[j].easingBack);
						}
						else {
							jQuery(elt).find('.labelImage').animate({ 'opacity': g_oldLabelOpacity },g_thumbnailHoverEffect[j].durationBack, g_thumbnailHoverEffect[j].easingBack);
						}
						break;
					case 'borderLighter':
					case 'borderDarker':
						if( g_supportTransit ) {
							jQuery(elt).transition({ 'borderColor': g_oldBorderColor },g_thumbnailHoverEffect[j].durationBack, g_thumbnailHoverEffect[j].easingBack);
						}
						else {
							jQuery(elt).animate({ 'borderColor': g_oldBorderColor },g_thumbnailHoverEffect[j].durationBack, g_thumbnailHoverEffect[j].easingBack);
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
		var nbItemsPerLineLines=Math.floor(w/g_oneThumbnailWidth);
		var nbLines=Math.ceil(g_itemInfo.length/nbItemsPerLineLines);
		var h=nbLines*g_oneThumbnailHeight;
		if( g_containerThumbnailsDisplayed ) { jQuery(g_containerThumbnails).css('max-height',h); }
		return h;
	};
		
	function SetTumbnailsContainerWidth() {
		// set the max number of items per line
		if( g_oneThumbnailWidth > 0 ) {
			if( g_options.maxWidth > 0 && g_oneThumbnailWidth > g_options.maxWidth ) { jQuery(g_baseControl).css('maxWidth',g_oneThumbnailWidth); }



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
		
		//jQuery(g_containerViewer).children().remove();
		g_containerViewer=jQuery('<div class="nanoGalleryViewer" style="visibility:hidden"></div>').appendTo(g_baseControl);
		
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
			});
		}
		else {
			jQuery(g_containerViewerContent).find('img:eq('+g_viewerCurrentItem+')').transition({ 'opacity': '1' });
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



/**!
 * Color animation 20120928
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
