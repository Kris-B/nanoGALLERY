/**!
 * @preserve nanoGALLERY v4.1.0
 * Plugin for jQuery by Christophe Brisbois
 * http://nanogallery.brisbois.fr
 * 
 * External components:
 *  - jQuery (http://www.jquery.com)
 *  - jQuery Color plugin - is embedded
 *  - Transit (http://ricostacruz.com/jquery.transit) - optional
 *  - fancybox (http://fancyapps.com) - optional
 *  - jQuery-JSONP (https://github.com/jaubourg/jquery-jsonp) - optional
 *  - http://closure-compiler.appspot.com/home - to minimize the code
 */


/*

nanoGALLERY v4.1.0 release notes.

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
- multi-level navigation support to API and HREF-method
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

*/
 
 

(function ($) {
  jQuery.fn.nanoGallery = function (options) {
    var settings = $.extend(true, {
      // default settings
      userID:'',
      kind:'',
      album:'',
      photoset:'',
      blackList:'scrapbook|profil',
      whiteList:'',
      albumList:'',
      //topLabel:'home',
      galleryToolbarWidthAligned:true,
      displayBreadcrumb:false,
      theme:'default',
      colorScheme:'default',
      colorSchemeViewer:'default',
      items:null,
      itemsBaseURL:'',
      maxItemsPerLine:0,
      paginationMaxItemsPerPage:0,
      paginationMaxLinesPerPage:0,
      maxWidth:0,
      viewer:'internal',
      thumbnailWidth:230,
      thumbnailHeight:154,
      thumbnailHoverEffect:null,
      //thumbnailHoverEffect:[{'name':'borderLighter','duration':300}],
      //thumbnailHoverEffect:[{'name':'imageFlipHorizontal','duration':300}],
      thumbnailLabel:{position:'overImageOnBottom',display:true,displayDescription:true},
      thumbnailDisplayInterval:30,
      thumbnailDisplayTransition:true,
      thumbnailLazyLoad:false,
      thumbnailLazyLoadTreshold:100,
      touchAnimation:true,
      useTags:false,
      preset:'none',
      slideshowDelay:3000,
      i18n:{
        'paginationPrevious':'Previous','paginationPrevious_FR':'Précédent','paginationPrevious_DE':'Zurück',
        'paginationNext':'Next','paginationNext_FR':'Suivant','paginationNext_DE':'Weiter'
        }
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
      blackList:'scrapbook|profil',
      whiteList:'',
      albumList:'',
      //topLabel:'home',
      galleryToolbarWidthAligned:true,
      displayBreadcrumb:false,
      theme:'default',
      colorScheme:'default',
      colorSchemeViewer:'default',
      items:null,
      itemsBaseURL:'',
      maxItemsPerLine:0,
      paginationMaxItemsPerPage:0,
      paginationMaxLinesPerPage:0,
      maxWidth:0,
      viewer:'internal',
      thumbnailWidth:230,
      thumbnailHeight:154,
      thumbnailHoverEffect:null,
      thumbnailLabel:{position:'overImageOnBottom',display:true,displayDescription:false},
      thumbnailDisplayInterval:30,
      thumbnailDisplayTransition:true,
      thumbnailLazyLoad:false,
      thumbnailLazyLoadTreshold:100,
      touchAnimation:true,
      useTags:false,
      preset:'none',
      slideshowDelay:3000
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

      var sPanel='<div style="line-height:normal;margin:10px auto 30px auto;text-align:center;border:1px solid #555;background:#000;padding:5px;font-size:1.2em;"><span style="color:#d3d3d3;">nano</span><span style="color:#6e6;">GALLERY</span> - demonstration panel</div>';
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
      //  jQuery(g_containerDemoPanel).find('[name=thumbMaxItemsPerLine]').val(tMIPL);
      //  settings.maxItemsPerLine=tMIPL;
      //}
      //var tMW=parseInt(jQuery(g_containerDemoPanel).find('[name=thumbMaxWidth]').val(),10);
      //if( tMW>= 50 ) {
      //  jQuery(g_containerDemoPanel).find('[name=thumbMaxWidth]').val(tMW);
      //  settings.maxWidth=tMW;
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
    g_containerPagination=null,
    g_containerBreadcrumb=null,
    g_containerTags=null,
    g_containerNavigationbar=null,
    g_containerNavigationbarCont=null,
    g_containerNavigationbarContDisplayed=false,
    g_containerViewerContainer=null,
    g_containerViewer=null,
    g_containerViewerDisplayed=false,
    g_containerThumbnailsDisplayed=false,
    g_containerViewerCloseFloating=null,
    g_containerViewerContent=null,
    g_containerViewerToolbar=null,
    g_path2timthumb="",
    g_ngItems=[],
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
    g_galleryItemsCount=0,
    g_viewerCurrentItem=0,
    g_viewerCurrentItemID=0,
    g_viewerPreviousItem=-1,
    g_viewerPreviousItemID=-1,
    g_viewerMaxImages=0,
    g_betamax=-1,
    g_windowsHash=new Array(),
    g_playSlideshow=false,
    g_playSlideshowTimerID=0,
    g_slideshowDelay=3000,
    g_thumbnailDisplayInterval=30,
    g_thumbnailLazyLoadTreshold=100,
    g_supportFullscreenAPI=false,
    g_viewerIsFullscreen=false,
    g_supportTransit=false,
    g_i18nLang='';
    var g_i18nTranslations={'paginationPrevious':'Previous','paginationNext':'Next','breadcrumbHome':'List of Albums'};
    var lastImageChange=0,
    g_paginationLinesMaxItemsPossiblePerLine=1,
    g_paginationMaxItemsPerPage=0,
    g_paginationMaxLinesPerPage=0,
    g_oldBorderColor=0,
    g_oldLabelOpacity=1,
    g_thumbnailHoverEffect=[];
    
    
  var g_colorScheme_default = {
    navigationbar : { background:'none', borderTop:'1px solid #555', borderBottom:'1px solid #555', borderRight:'', borderLeft:'', color:'#ccc', colorHover:'#fff' },
    thumbnail : { background:'#000', border:'1px solid #000', labelBackground:'rgba(34, 34, 34, 0.75)', titleColor:'#eee', descriptionColor:'#ccc'}
  };
  var g_colorScheme_darkRed = {
    // #ffa3a3 #ff7373 #ff4040 #ff0000 #a60000
    navigationbar : { background:'#a60000', border:'1px dotted #ff0000', color:'#ccc', colorHover:'#fff' },
    thumbnail : { background:'#a60000', border:'1px solid #ff0000', labelBackground:'rgba(134, 0, 0, 0.75)', titleColor:'#eee', descriptionColor:'#ccc'}
  };
  var g_colorScheme_darkGreen = {
    // #97e697 #67e667 #39e639 #00cc00 #008500
    navigationbar : { background:'#008500', border:'1px dotted #00cc00', color:'#ccc', colorHover:'#fff' },
    thumbnail : { background:'#008500', border:'1px solid #00cc00', labelBackground:'rgba(0, 105, 0, 0.75)', titleColor:'#eee', descriptionColor:'#ccc'}
  };
  var g_colorScheme_darkBlue = {
    // #a0b0d7 #7080d7 #4a60d7 #162ea2 #071871
    navigationbar : { background:'#071871', border:'1px dotted #162ea2', color:'#ccc', colorHover:'#fff' },
    thumbnail : { background:'#071871', border:'1px solid #162ea2', labelBackground:'rgba(7, 8, 81, 0.75)', titleColor:'#eee', descriptionColor:'#ccc'}
  };
  var g_colorScheme_darkOrange = {
    // #ffd7b7 #ffd773 #ffc840 #ffb600 #a67600
    navigationbar : { background:'#a67600', border:'1px dotted #ffb600', color:'#ccc', colorHover:'#fff' },
    thumbnail : { background:'#a67600', border:'1px solid #ffb600', labelBackground:'rgba(134, 86, 0, 0.75)', titleColor:'#eee', descriptionColor:'#ccc'}
  };
  var g_colorScheme_light = {
    navigationbar : { background:'#ddd', border:'1px dotted #999', color:'#eee', colorHover:'#000' },
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
  
  
  // class to store one item (thumbnail)
  var NGItems = (function () {
    // private static --> all instances
    var nextId = 1;

    // constructor
    function NGItems( paramTitle, paramID ) {
      // private
      var ID=0;
      // public (this instance only)
      if( paramID === undefined || paramID === null ) {  //|| paramID == -1 ) {
        ID=nextId++;
      }
      else {
        ID=paramID;
      }
      this.GetID = function () { return ID; };
      // public
      this.title=paramTitle;
      this.thumbsrc='';
      this.src='';
      this.description='';
      this.destinationURL='';
      this.kind='';
      this.hovered=false;
      this.elt=null;
      this.contentIsLoaded=false;
      this.contentLength=0;
      //if( tags.length == 0 ) {
      //  this.tags=null;
      //}
      //else {
      //  this.tags=tags.split(' ');
      //}
      this.albumID=0;
    }
  
    // public static
    NGItems.get_nextId = function () {
      return nextId;
    };

    // public (shared across instances)
    //NGItems.prototype = {
    //  announce: function () {
    //    alert('Hi there! My id is ' + this.get_id() + ' and my name is "' + this.get_name() + '"!\r\n' +
    //        'The next fellow\'s id will be ' + MyClass.get_nextId() + '!');
    //  }
    //};

    return NGItems;
  })();

    
  // ##########################
  // ##### INITIALIZATION #####
  // ##########################
  
  this.Initiate=function(element, params) {
    "use strict";
    g_options=params;
    g_baseControl=element;

    // browser language
    g_i18nLang = (navigator.language || navigator.userLanguage).toUpperCase();
    if( g_i18nLang === 'undefined') { g_i18nLang=''; }
    
    if( jQuery.support.transition ) { g_supportTransit=true; }
    
    // browser back-button to close the image currently displayed
    $(window).bind( 'hashchange', function( event ) {
      if (location.hash.length == 0) {
      //  if( g_windowsHash.length > 0 ) {
          g_windowsHash.pop();
          //alert(g_windowsHash.length);
          CloseInternalViewer();
      //  }
      }
      return;
      
      //if( g_windowsHash.length > 0 ) {
      //  //alert(window.location.hash + '-' + itm);
      //  var itm=g_windowsHash[g_windowsHash.length-1]
      //  if( itm != window.location.hash ) {
      //    g_windowsHash.pop();
      //    //if( #ng_'+jQuery(g_baseControl).attr('id')+'_v'
      //    CloseInternalViewer();
      //  }
      //}
    });
    $(window).trigger("hashchange");


    if( g_options.blackList !='' ) { g_blackList=g_options.blackList.toUpperCase().split('|'); }
    if( g_options.whiteList !='' ) { g_whiteList=g_options.whiteList.toUpperCase().split('|'); }
    if( g_options.albumList !='' ) { g_albumList=g_options.albumList.toUpperCase().split('|'); }
    // Set theme and colorScheme
    jQuery(element).addClass('nanogallery_theme_'+g_options.theme);
    SetColorScheme(element);
    //if( window.location.hostname.indexOf('bri') == -1 ) { g_betamax = 4; }

    if( g_options.kind=='picasa' || g_options.kind=='flickr' ) {
      g_options.displayBreadcrumb=true;
    }
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


    if( toType(g_options.slideshowDelay) == 'number' && g_options.slideshowDelay >= 2000 ) {
      g_slideshowDelay=g_options.slideshowDelay;
    }
    else {
      nanoConsoleLog('Parameter "slideshowDelay" must be an integer >= 2000 ms.');
    }
    if( toType(g_options.thumbnailDisplayInterval) == 'number' && g_options.thumbnailDisplayInterval >= 0 ) {
      g_thumbnailDisplayInterval=g_options.thumbnailDisplayInterval;
    }
    else {
      nanoConsoleLog('Parameter "thumbnailDisplayInterval" must be an integer.');
    }
    if( toType(g_options.thumbnailLazyLoadTreshold) == 'number' && g_options.thumbnailLazyLoadTreshold >= 0 ) {
      g_thumbnailLazyLoadTreshold=g_options.thumbnailLazyLoadTreshold;
    }
    else {
      nanoConsoleLog('Parameter "thumbnailLazyLoadTreshold" must be an integer.');
    }
    if( toType(g_options.paginationMaxItemsPerPage) == 'number' && g_options.paginationMaxItemsPerPage >= 0 ) {
      g_paginationMaxItemsPerPage=g_options.paginationMaxItemsPerPage;
    }
    else {
      nanoConsoleLog('Parameter "paginationMaxItemsPerPage" must be an integer.');
    }
    if( toType(g_options.paginationMaxLinesPerPage) == 'number' && g_options.paginationMaxLinesPerPage >= 0 ) {
      g_paginationMaxLinesPerPage=g_options.paginationMaxLinesPerPage;
    }
    else {
      nanoConsoleLog('Parameter "paginationMaxLinesPerPage" must be an integer.');
    }

    
    g_containerNavigationbarCont=jQuery('<div class="nanoGalleryNavigationbarContainer"></div>').appendTo(element);
    jQuery(g_containerNavigationbarCont).hide();//css('visibility','hidden');
    g_containerNavigationbar=jQuery('<div class="nanoGalleryNavigationbar"></div>').appendTo(g_containerNavigationbarCont);
    g_containerBreadcrumb=jQuery('<div class="nanoGalleryBreadcrumb"></div>').appendTo(g_containerNavigationbar);
    if( g_options.displayBreadcrumb == true && ( g_options.kind=='picasa' || g_options.kind=='flickr')) {
      //g_containerBreadcrumb =jQuery('<div class="nanoGalleryBreadcrumb"></div>').appendTo(element);
    }
    g_containerParent=jQuery('<div class="nanoGalleryContainerParent"></div>').appendTo(element);
    g_containerThumbnails=jQuery('<div class="nanoGalleryContainer"></div>').appendTo(g_containerParent);

    if( g_paginationMaxItemsPerPage > 0 && g_paginationMaxLinesPerPage > 0 ) {
      g_paginationMaxItemsPerPage=0;
    }

    if( g_paginationMaxItemsPerPage > 0 || g_paginationMaxLinesPerPage > 0 ) {
      g_containerPagination=jQuery('<div class="nanoGalleryPagination"></div>').appendTo(g_containerParent);

      // GESTURE --> requires HAMMER.JS
      // drag gallery left/right to display previous/next page
      if( typeof(Hammer) !== 'undefined' ) {
        var hammertimeGallery = Hammer(jQuery(g_containerParent)[0], {
          drag:true,
          transform_always_block:true,
          drag_block_horizontal: true,
          //drag_min_distance: 25,
          prevent_default:false,
          drag_lock_min_distance: 20,
          hold: false,
          release: true,
          swipe: true,
          tap: false,
          touch: true,
          transform: false
        });

        var galleryPosX=0, galleryPosY=0;
        hammertimeGallery.on('drag release', function(ev) {
          switch(ev.type) {
            case 'drag':
              galleryPosX = ev.gesture.deltaX;
              galleryPosY = ev.gesture.deltaY;
              if( Math.abs(galleryPosX)  < 25 ) {
                jQuery(g_containerParent).css({ 'left': 0 });  
              }
              else {
                jQuery(g_containerParent).css({ 'left': galleryPosX });
              }
              break;
            case 'release':
              ev.stopPropagation();
              if( Math.abs(galleryPosX)  < 25 ) {
                jQuery(g_containerParent).css({ 'left': 0 });  
              }
              if( galleryPosX < -25 ) {
                paginationNextPage();
              }
              if( galleryPosX > 25 ) {
                paginationPreviousPage();
              }
              galleryPosX=0;
              break;
          }
        });
      }
    }
    
    g_path2timthumb = ""; //timthumbFolder; --> for GetSimple CMS

    // i18n translations
    if( toType(g_options.i18n) == 'object' ){
      Object.keys(g_options.i18n).forEach(function(key) {
        //console.log(key);
        switch(key) {
          //paginationPrevious
          case 'paginationPrevious_'+g_i18nLang:
            g_i18nTranslations.paginationPrevious=g_options.i18n[key];
            break;
          case 'paginationPrevious':
            g_i18nTranslations.paginationPrevious=g_options.i18n[key];
            break;
          //paginationNext
          case 'paginationNext_'+g_i18nLang:
            g_i18nTranslations.paginationNext=g_options.i18n[key];
            break;
          case 'paginationNext':
            g_i18nTranslations.paginationNext=g_options.i18n[key];
            break;
          //breadcrumbHome
          case 'breadcrumbHome_'+g_i18nLang:
            g_i18nTranslations.breadcrumbHome=g_options.i18n[key];
            break;
          case 'breadcrumbHome':
            g_i18nTranslations.breadcrumbHome=g_options.i18n[key];
            break;
        }
      });
    }
    
    
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
        nanoAlert('incorrect parameter for "thumbnailHoverEffect".');
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
        case 'labelSlideUpTop':
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
        //case 'flipHorizontal':    // hover issue
        //case 'flipVertical':
        case 'rotateCornerBR':
        case 'rotateCornerBL':
        case 'imageRotateCornerBR':
        case 'imageRotateCornerBL':
          if ( !g_supportTransit ) {
            nanoConsoleLog('Parameter "'+g_thumbnailHoverEffect[i].name+'" for "thumbnailHoverEffect" requires the additional jQuery plugin "Transit".');
          }
          break;
        default:
          nanoAlert('Unknow parameter "'+g_thumbnailHoverEffect[i].name+'" for "thumbnailHoverEffect".');
          break;
      }
    }


    // fullscreen API support
    if (document.fullscreenEnabled || document.webkitFullscreenEnabled || document.msFullscreenEnabled || document.mozFullScreenEnabled) {
      g_supportFullscreenAPI=true;
    } else {
      nanoConsoleLog('Your browser doesn’t support the fullscreen API. Fullscreen button will not be displayed.')
    }
    
    var si=0;
    if( g_options.thumbnailWidth > g_options.thumbnailHeight ) { si=g_options.thumbnailWidth; }
    else { si=g_options.thumbnailHeight; }
    
    g_ngItems=[];

    switch(g_options.kind) {
      case '':
        NGAddItem(g_i18nTranslations.breadcrumbHome, '', '', '', '', 'album', '', '0', '-1' );
        if( g_options.itemsBaseURL.length >0 ) {g_options.itemsBaseURL+='/';}
        if( g_options.items !== undefined && g_options.items !== null ) {
          ProcessItemOption();
        }
        else {
          var elements=jQuery(element).children('a');
          if( elements.length > 0 )
            ProcessHREF(elements);
          else
            nanoAlert('error: no image to process.');
        }
        break;
      
      case 'getsimple':
        return;
        var url=params.pluginURL+'/nanogallery_getitems.php';
        nanoAlert(url);
        //jQuery.getJSON(url+'/nanogallery_getitems.php', {limit: 1}, function(data) {
        //jQuery.getJSON(url+'/nanogallery_getitems.php', function(data) {
        jQuery.ajaxSetup({ cache: false });
        jQuery.support.cors = true;
        jQuery.getJSON(url, function(data) {
          nanoAlert("ok");
          // data is now an array with all the images
          jQuery.each(data, function(i) {
            nanoAlert(data[i]);
            // do something with each image
            // data[i] will have the image path
          });
        });
        nanoAlert("done");
        break;
        
      case 'flickr':
        for( i=0; i<g_flickrThumbAvailableSizes.length; i++) {
          g_flickrThumbSize=g_flickrThumbAvailableSizesStr[i];
          if( si < g_flickrThumbAvailableSizes[i] ) {
            break;
          }
        }
        if( g_options.photoset.length > 0 ) {
          NGAddItem(g_i18nTranslations.breadcrumbHome, '', '', '', '', 'album', '', g_options.photoset, '-1' );
        }
        else {
          NGAddItem(g_i18nTranslations.breadcrumbHome, '', '', '', '', 'album', '', '0', '-1' );
        }
        manageGalleryToolbar(0);
        FlickrRetrieveItems(0);
        break;
      case 'picasa':
      default:
        for(var i=0; i<g_picasaThumbAvailableSizes.length; i++) {
          g_picasaThumbSize=g_picasaThumbAvailableSizes[i];
          if( si < g_picasaThumbAvailableSizes[i] ) {
            break;
          }
        }
        if( g_options.album.length > 0 ) {
          NGAddItem(g_i18nTranslations.breadcrumbHome, '', '', '', '', 'album', '', g_options.album, '-1' );
        }
        else {
          NGAddItem(g_i18nTranslations.breadcrumbHome, '', '', '', '', 'album', '', '0', '-1' );
        }
        manageGalleryToolbar(0);
        PicasaRetrieveItems(0);
        break;
    }
    
    
    // GLOBAL EVENT MANAGEMENT
    // Page resize
    var g_resizeTimeOut=0;
    jQuery(window).resize(function() { 
      if(g_resizeTimeOut) clearTimeout(g_resizeTimeOut);
      g_resizeTimeOut = setTimeout(function () {
        RePositionElements();
        thumbnailsLazySetSrc();
        return;
      }, 200);
    });
    
    // page scrolled
    var g_scrollTimeOut=0;
    jQuery(window).on('scroll', function () {
      //if(this.scrollTo) clearTimeout(this.scrollTo);
      //this.scrollTo = setTimeout(function () {
      if(g_scrollTimeOut) clearTimeout(g_scrollTimeOut);
      g_scrollTimeOut = setTimeout(function () {
        thumbnailsLazySetSrc();
        return;
      }, 200);
    });

    // Keyboard management
    jQuery(document).keyup(function(e) {
      if( g_containerViewerDisplayed ) {
        switch( e.keyCode) {
          case 27:    // Esc key
            if( g_windowsHash.length > 0 ) { 
              window.history.back();
            }
            else {
              CloseInternalViewer();
            }
            //CloseInternalViewer();
            break;
          case 32:    // SPACE
          case 13:    // ENTER
            SlideshowToggle();
            break;
          case 38:    // UP
          case 39:    // RIGHT
          case 33:    // PAGE UP
            DisplayNextImagePart1(true);
            break;
          case 40:    // DOWN
          case 37:    // LEFT
          case 34:    // PAGE DOWN
            DisplayPreviousImage(true);
            break;
          case 35:    // END
          case 36:     // BEGIN
        }
      }
    });

    
  };
  
  // ####################################
  // ##### LIST OF ITEMS IN OPTIONS #####
  // ####################################


  function GetI18nItem( item, property ) {
    var s='';
    if( g_i18nLang != '' ) {
      if( item[property+'_'+g_i18nLang] !== undefined && item[property+'_'+g_i18nLang].length>0 ) {
        s=item[property+'_'+g_i18nLang];
        return s;
      }
    }
    s=item[property];
    return s;
  }
  
  function ProcessItemOption() {
    
    var foundAlbumID=false;
    jQuery.each(g_options.items, function(i,item){
      
      var title='';
      title=GetI18nItem(item,'title');
      if( title === undefined ) { title=''; }
      
      var thumbsrc='';
      if( item.srct !== undefined && item.srct.length>0 ) {
        thumbsrc=g_options.itemsBaseURL+item.srct;
      }
      else {
        thumbsrc=g_options.itemsBaseURL+item.src;
      }
      var src=g_options.itemsBaseURL+item.src;
      var description='';     //'&nbsp;';
      description=GetI18nItem(item,'description');
      if( description === undefined ) { description=''; }
      //if( toType(item.description) == 'string' ) {
      //  description=item.description;
      //}

      var destinationURL='';
      if( item.destURL !== undefined && item.destURL.length>0 ) {
        destinationURL=item.destURL;
      }
      var tags='';
      //if( item.tags !== undefined && item.tags.length>0 ) {
      //  tags=item.tags;
      //}
      var tags=GetI18nItem(item,'tags');
      if( tags === undefined ) { tags=''; }

      var albumID=0;
      if( item.albumID !== undefined  ) {
        albumID=item.albumID;
        foundAlbumID=true;
      }
      var ID=null;
      if( item.ID !== undefined ) {
        ID=item.ID;
      }
      var kind='image';
      if( item.kind !== undefined && item.kind.length>0 ) {
        kind=item.kind;
      }
      
      NGAddItem(title, thumbsrc, src, description, destinationURL, kind, tags, ID, albumID );
    });
    
    if( foundAlbumID ) {
      g_options.displayBreadcrumb=true;
    }

    // get the number of iimages per album for all the items
    var l=g_ngItems.length;
    var nb=0;
    for( var i=0; i<l; i++ ){
      nb=0;
      for( var j=0; j<l; j++ ){
        if( i!=j && g_ngItems[i].GetID() == g_ngItems[j].albumID ) {
          nb++;
        }
      }
      g_ngItems[i].contentLength=nb;
    }

    manageGalleryToolbar(0);
    removeGallery();
    renderGallery(0,0);
  };
  
  // ###################################
  // ##### LIST OF HREF ATTRIBUTES #####
  // ###################################

  function ProcessHREF(elements) {
    //g_ngItems=[];
    var foundAlbumID=false;
    
    jQuery.each(elements, function(i,item){
      var thumbsrc='';
      if( jQuery(item).attr('data-ngthumb') !== undefined && jQuery(item).attr('data-ngthumb').length>0 ) {
        thumbsrc=g_options.itemsBaseURL+jQuery(item).attr('data-ngthumb');
      }
      if( jQuery(item).attr('data-ngThumb') !== undefined && jQuery(item).attr('data-ngThumb').length>0 ) {
        thumbsrc=g_options.itemsBaseURL+jQuery(item).attr('data-ngThumb');
      }

      src=g_options.itemsBaseURL+jQuery(item).attr('href');
      //newObj.description=jQuery(item).attr('data-ngdesc');
      var description='';
      if( jQuery(item).attr('data-ngdesc') !== undefined && jQuery(item).attr('data-ngdesc').length>0 ) {
        description=jQuery(item).attr('data-ngdesc');
      }
      if( jQuery(item).attr('data-ngDesc') !== undefined && jQuery(item).attr('data-ngDesc').length>0 ) {
        description=jQuery(item).attr('data-ngDesc');
      }

      var destURL='';
      if( jQuery(item).attr('data-ngdest') !== undefined && jQuery(item).attr('data-ngdest').length>0 ) {
        destURL=jQuery(item).attr('data-ngdest');
      }
      if( jQuery(item).attr('data-ngDest') !== undefined && jQuery(item).attr('data-ngDest').length>0 ) {
        destURL=jQuery(item).attr('data-ngDest');
      }

      var albumID=0;
      if( jQuery(item).attr('data-ngalbumid') !== undefined ) {
        albumID=jQuery(item).attr('data-ngalbumid');
        foundAlbumID=true;
      }
      if( jQuery(item).attr('data-ngAlbumID') !== undefined ) {
        albumID=jQuery(item).attr('data-ngAlbumID');
        foundAlbumID=true;
      }
      
      var ID=null;
      if( jQuery(item).attr('data-ngid') !== undefined ) {
        ID=jQuery(item).attr('data-ngid');
      }
      if( jQuery(item).attr('data-ngID') !== undefined ) {
        ID=jQuery(item).attr('data-ngID');
      }

      var kind='image';
      if( jQuery(item).attr('data-ngkind') !== undefined && jQuery(item).attr('data-ngkind').length>0 ) {
        kind=jQuery(item).attr('data-ngkind');
      }
      if( jQuery(item).attr('data-ngKind') !== undefined && jQuery(item).attr('data-ngKind').length>0 ) {
        kind=jQuery(item).attr('data-ngKind');
      }

      //NGAddItem(jQuery(item).text(), thumbsrc, src, description, destURL, 'image', '' );
      NGAddItem(jQuery(item).text(), thumbsrc, src, description, destURL, kind, '', ID, albumID );
    });
    
    jQuery.each(elements, function(i,item){ jQuery(item).remove(); });
    
    if( foundAlbumID ) {
      g_options.displayBreadcrumb=true;
    }

    // get the number of iimages per album for all the items
    var l=g_ngItems.length;
    var nb=0;
    for( var i=0; i<l; i++ ){
      nb=0;
      for( var j=0; j<l; j++ ){
        if( i!=j && g_ngItems[i].GetID() == g_ngItems[j].albumID ) {
          nb++;
        }
      }
      g_ngItems[i].contentLength=nb;
    }
    
    manageGalleryToolbar(0);
    removeGallery();
    renderGallery(0,0);
  };

  
  // ##########################
  // ##### FLICKR STORAGE #####
  // ##########################

  function FlickrRetrieveItems(albumIdx) {
    removeGallery();
    manageGalleryToolbar(albumIdx);

    //if( albumIdx == 0 ) {
    if( g_ngItems[albumIdx].GetID() == 0 ) {
      // RETRIEVE PHOTOSETS
      
      if( g_ngItems[albumIdx].contentLength == 0 ) {    // already loaded?
        if( g_options.displayBreadcrumb == true ) { jQuery(g_containerBreadcrumb).find('.folder').last().addClass('loading'); }
        var url = "http://api.flickr.com/services/rest/?&method=flickr.photosets.getList&api_key=" + g_flickrApiKey + "&user_id="+g_options.userID+"&primary_photo_extras=tags&format=json&jsoncallback=?";

        // get the content and display it
        jQuery.ajaxSetup({ cache: false });
        jQuery.support.cors = true;

        if( jQuery.jsonp !== undefined ) {
          // use jQuery-JSONP plugin
          jQuery.jsonp({
            "url": url,
            "success": function(data) {
              if( g_options.displayBreadcrumb == true ) { jQuery(g_containerBreadcrumb).find('.folder').last().removeClass('loading'); }
              FlickrParsePhotoSets(albumIdx, data);
              renderGallery(0,0);
            },
            "error": function(xOptions,textStatus) {
              if( g_options.displayBreadcrumb == true ) { jQuery(g_containerBreadcrumb).find('.folder').last().removeClass('loading'); }
              nanoAlert("Could not retrieve Flickr photoset list: "+textStatus);
            }
          });
        }
        else {
          // use jQuery
          jQuery.getJSON(url, function(data) {
            if( g_options.displayBreadcrumb == true ) { jQuery(g_containerBreadcrumb).find('.folder').last().removeClass('loading'); }
            FlickrParsePhotoSets(albumIdx, data);
            renderGallery(0,0);
          })
          .fail( function(jqxhr, textStatus, error) {
            if( g_options.displayBreadcrumb == true ) { jQuery(g_containerBreadcrumb).find('.folder').last().removeClass('loading'); }
            var err = textStatus + ', ' + error;
            nanoAlert("Could not retrieve Flickr photoset list (jQuery): " + err);
          });
        }
      }
      else {
        renderGallery(albumIdx,0);
      }
    }
    else {
      // RETRIEVE PHOTOS
      if( !g_ngItems[albumIdx].contentIsLoaded ) {
        if( g_options.displayBreadcrumb == true ) { jQuery(g_containerBreadcrumb).find('.folder').last().addClass('loading'); }
        var url = "http://api.flickr.com/services/rest/?&method=flickr.photosets.getPhotos&api_key=" + g_flickrApiKey + "&photoset_id="+g_ngItems[albumIdx].GetID()+"&extras=description,views,url_s,url_o,url_m&format=json&jsoncallback=?";

        // get the content and display it
        jQuery.ajaxSetup({ cache: false });
        jQuery.support.cors = true;

        if( jQuery.jsonp !== undefined ) {
          // use jQuery-JSONP plugin
          jQuery.jsonp({
            "url": url,
            "success": function(data) {
              //if( g_options.displayBreadcrumb == true ) { jQuery(g_containerBreadcrumb).find('.folder').last().removeClass('loading'); }
              FlickrParsePhotos(albumIdx, data);
              renderGallery(albumIdx,0);
            },
            "error": function(xOptions,textStatus) {
              if( g_options.displayBreadcrumb == true ) { jQuery(g_containerBreadcrumb).find('.folder').last().removeClass('loading'); }
              nanoAlert("Could not retrieve Flickr photo list: "+textStatus);
            }
          });
        }
        else {
          // use jQuery
          jQuery.getJSON(url, function(data) {
            if( g_options.displayBreadcrumb == true ) { jQuery(g_containerBreadcrumb).find('.folder').last().removeClass('loading'); }
            FlickrParsePhotos(albumIdx, data);
            renderGallery(albumIdx,0);
          })
          .fail( function(jqxhr, textStatus, error) {
            if( g_options.displayBreadcrumb == true ) { jQuery(g_containerBreadcrumb).find('.folder').last().removeClass('loading'); }
            var err = textStatus + ', ' + error;
            nanoAlert("Could not retrieve Flickr photo list (jQuery): " + err);
          });
        }
      }
      else {
        renderGallery(albumIdx,0);
      }
    }
  }

  
  function FlickrParsePhotoSets( albumIdx, data ) {
    var ok=true;
    if( data.stat !== undefined ) {
      if( data.stat === 'fail' ) {
        nanoAlert("Could not retrieve Flickr photoset list: " + data.message + " (code: "+data.code+").");
        ok=false;
      }
    }

  
    if( ok ) {
      var nb=0;
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
        //alert(item.primary_photo_extras.tags);
        var tags='';
        if( item.primary_photo_extras.tags !== undefined ) {
          tags=item.primary_photo_extras.tags;
        }
        if( CheckAlbumName(itemTitle) ) {
          NGAddItem(itemTitle, itemThumbURL, '', itemDescription, '', 'album', tags, itemID, g_ngItems[albumIdx].GetID() );
          nb++;
        }
      });
      
      g_ngItems[albumIdx].contentIsLoaded=true;
      g_ngItems[albumIdx].contentLength=nb;
    }
  }

  function FlickrParsePhotos( albumIdx, data ) {
    //if( g_options.displayBreadcrumb == true ) { jQuery(g_containerBreadcrumb).find('.folder').last().removeClass('loading'); }

    var nb=0;
    jQuery.each(data.photoset.photo, function(i,item){
      //Get the title 
      itemTitle = item.title;    //._content;
      itemID=item.id;
      //Get the description
      itemDescription=item.description._content;
      itemThumbURL = "http://farm" + item.farm + ".staticflickr.com/" + item.server + "/" + item.id +"_" + item.secret + "_"+g_flickrThumbSize+".jpg";
      if( item.url_o !== undefined ) {
        imgUrl=item.url_o;
      }
      else {
        imgUrl=item.url_m;
        //imgUrl = "http://farm" + item.farm + ".staticflickr.com/" + item.server + "/" + item.id + "_" + item.secret + "_o.jpg";
      }
      
      NGAddItem(item.title, itemThumbURL, imgUrl, itemDescription, '', 'image', '', itemID, g_ngItems[albumIdx].GetID() );
      nb++;
      
    });
    g_ngItems[albumIdx].contentIsLoaded=true;
    g_ngItems[albumIdx].contentLength=nb;
    //renderGallery();
  }
  

  // ##########################
  // ##### PICASA STORAGE #####
  // ##########################

  function PicasaRetrieveItems( albumIdx ) {
    //itemID, albumLabel, internalLevel, internalFolderID 
    //jQuery(g_containerThumbnails).children().remove();
    removeGallery();
    manageGalleryToolbar(albumIdx);

    if( g_ngItems[albumIdx].contentLength != 0 ) {    // already loaded?
      renderGallery(albumIdx,0);
      return;
    }
    
    var url='';
    var kind='album';

    
    //if( albumIdx == 0 ) {
    if( g_ngItems[albumIdx].GetID() == 0 ) {
      // albums
      url = 'http://picasaweb.google.com/data/feed/api/user/'+g_options.userID+'?alt=json&kind=album&thumbsize='+g_picasaThumbSize;
    }
    else {
      // photos
      url = 'http://picasaweb.google.com/data/feed/api/user/'+g_options.userID+'/albumid/'+g_ngItems[albumIdx].GetID()+'?alt=json&kind=photo&thumbsize='+g_picasaThumbSize+'&imgmax=d';
      kind='image';
    }

    // get the content and display it
    if( g_options.displayBreadcrumb == true ) { jQuery(g_containerBreadcrumb).find('.folder').last().addClass('loading'); }
    jQuery.ajaxSetup({ cache: false });
    jQuery.support.cors = true;
    url = url + "&callback=?";

    //jQuery.getJSON(url, function(data) {
    //    })
    //.fail( function(jqxhr, textStatus, error) {
    //  var err = textStatus + ', ' + error;
    //  alert("Error with Picasa: " + err);
    //});

    if( jQuery.jsonp !== undefined ) {
      // use jQuery-JSONP plugin
      jQuery.jsonp({
        "url": url,  //+"?callback=?",
        "success": function(data) {
          if( g_options.displayBreadcrumb == true ) { jQuery(g_containerBreadcrumb).find('.folder').last().removeClass('loading'); }
          PicasaParseData(albumIdx,data,kind);
          //if( kind == 'image' ) {
          //  ngitem.contentIsLoaded=true;
          //}
          renderGallery(albumIdx,0);
        },
        "error": function(xOptions,textStatus) {
          if( g_options.displayBreadcrumb == true ) { jQuery(g_containerBreadcrumb).find('.folder').last().removeClass('loading'); }
          nanoAlert("Could not retrieve Picasa/Google+ data: "+textStatus);
        }
      });
    }
    else {
      // use jQuery
      jQuery.getJSON(url, function(data) {
        if( g_options.displayBreadcrumb == true ) { jQuery(g_containerBreadcrumb).find('.folder').last().removeClass('loading'); }
        PicasaParseData(albumIdx,data,kind);
        //if( kind == 'image' ) {
        //  ngitem.contentIsLoaded=true;
        //}
        renderGallery(albumIdx,0);
      })
      .fail( function(jqxhr, textStatus, error) {
        if( g_options.displayBreadcrumb == true ) { jQuery(g_containerBreadcrumb).find('.folder').last().removeClass('loading'); }
        var err = textStatus + ', ' + error;
        nanoAlert("Could not retrieve Picasa/Google+ data (jQuery): " + err);
      });
    }
  };  
  
  
  function PicasaParseData( albumIdx, data, kind ) {
    var nb=0;
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
      if( kind == 'image') { 
        itemTitle=itemDescription;
        itemDescription='';
      }
      
      imgUrl=data.media$group.media$content[0].url
      itemKind=kind;

      var ok=true;
      if( kind == 'album' ) {
        if( !CheckAlbumName(itemTitle) ) { ok=false; }
      }
      
      var tags='';
      
      
      if( ok ) {
        var src='';
        if( kind == 'album' ) {
          src=itemID;
        }
        else {
          src=imgUrl;
        }
        NGAddItem(itemTitle, itemThumbURL, src, itemDescription, '', kind, tags, itemID, g_ngItems[albumIdx].GetID() );
        nb++;
      }
      
    });
    g_ngItems[albumIdx].contentIsLoaded=true;
    g_ngItems[albumIdx].contentLength=nb;
    
  }
  
  
  // ################################
  // ##### NGITEMS MANIPULATION #####
  // ################################
  
  function NGAddItem(title, thumbSrc, imageSrc, description, destinationURL, kind, tags, ID, albumID ) {
    var newObj=new NGItems(title,ID);
    newObj.thumbsrc=thumbSrc;
    newObj.src=imageSrc;
    newObj.description=description;
    newObj.destinationURL=destinationURL;
    newObj.kind=kind;
    newObj.albumID=albumID;
    if( tags.length == 0 ) {
      newObj.tags=null;
    }
    else {
      newObj.tags=tags.split(' ');
    }
    g_ngItems.push(newObj);
    return newObj;
  };

  function GetNGItem( ID ) {
    var l=g_ngItems.length;
    for( var i=0; i<l; i++ ) {
      if( g_ngItems[i].GetID() == ID ) {
        return g_ngItems[i];
      }
    }
    return null;
  }

  
  // ###########################
  // ##### GALLERY TOOLBAR #####
  // ###########################

  function manageGalleryToolbar(albumIdx) {
    var displayToolbar=false;
  

    // Breadcrumb
    if( g_options.displayBreadcrumb == true ) {
      displayToolbar=true;
      jQuery(g_containerBreadcrumb).find('.folder').last().removeClass('loading');
      var bcItems=jQuery(g_containerBreadcrumb).children();
      var l1=bcItems.length;
      var found=false;
      var lastAlbumID=-1;
      for( var i=0; i < l1; i++ ) {
        lastAlbumIdx=jQuery(bcItems[i]).data('albumIdx');
        if( lastAlbumIdx == albumIdx ) {
          jQuery(g_containerBreadcrumb).children().slice(i-1);
          found=true;
          break;
        }
      }

      if( !found ) {
        if( albumIdx != 0 ) {
          // add separator
          var newSep=jQuery('<div class="separator"></div>').appendTo(g_containerBreadcrumb);
          jQuery(newSep).data('albumIdx',lastAlbumID);
          newSep.click(function() {
            var sepAlbumIdx=jQuery(this).data('albumIdx');
            jQuery(this).nextAll().remove();
            jQuery(this).remove();
            switch(g_options.kind) {
              case 'flickr':
                FlickrRetrieveItems(sepAlbumIdx);
                break;
              case 'picasa':
                PicasaRetrieveItems(sepAlbumIdx);
                break;
              default:
                renderGallery(sepAlbumIdx,0);
                break;
            }
            return;
          });;
        }
        // add album to breadcrumb
        var newDiv =jQuery('<div class="folder">'+g_ngItems[albumIdx].title+'</div>').appendTo(g_containerBreadcrumb);
        jQuery(newDiv).data('albumIdx',albumIdx);
        newDiv.click(function() {
          var cAlbumIdx=jQuery(this).data('albumIdx');
          jQuery(this).nextAll().remove();
          switch(g_options.kind) {
            case 'flickr':
              FlickrRetrieveItems(cAlbumIdx);
              break;
            case 'picasa':
              PicasaRetrieveItems(cAlbumIdx);
              break;
            default:
              renderGallery(cAlbumIdx,0);
              break;
          }
          return;
        });;        
      }
    }
    
    // Tag-bar
    //pipo
    //g_containerNavigationbar
    if( g_options.useTags ) {
      displayToolbar=true;
      if( g_containerTags == null ) {
        g_containerTags =jQuery('<div class="nanoGalleryTags"></div>').appendTo(g_containerNavigationbar);
      }
    }
    
    if( !g_containerNavigationbarContDisplayed && displayToolbar ) {
      g_containerNavigationbarContDisplayed=true;
      jQuery(g_containerNavigationbarCont).show();
    }
    
  }

  function SetGalleryToolbarWidth(pageNumber) {
    if( g_options.galleryToolbarWidthAligned ) {
      if( g_containerNavigationbarCont !== undefined ) {
        var w=jQuery(g_containerThumbnails).width();
        if( pageNumber > 0 ) {
          if( jQuery(g_containerNavigationbarCont).width() < w ) {
            jQuery(g_containerNavigationbarCont).css('width',w);
          }
        }
        else {
          jQuery(g_containerNavigationbarCont).css('width',w);
        }
      }
    }
  }
  

  // ##### REPOSITION ITEMS ON SCREEN RESIZE EVENT
  function RePositionElements() {
    if( g_containerThumbnailsDisplayed ) {
      SetTumbnailsContainerWidth(0);
      SetTumbnailsContainerHeight();
      // pagination - max lines per page mode
      if( g_paginationMaxLinesPerPage > 0 ) {
        var areaW=jQuery(g_containerParent).width();
        if( g_oneThumbnailWidthContainer > 0 ) {
          n=parseInt(areaW/g_oneThumbnailWidthContainer);
          if( n < 1 ) { n=1; }
          if( n != g_paginationLinesMaxItemsPossiblePerLine ) {
            removeGallery();
            var aIdx=jQuery(g_containerPagination).data('galleryIdx');
            renderGallery(aIdx,0);
          }
        }
      }
      
    }
    if( g_containerViewerDisplayed ) {
      ResizeInternalViewer();
    }
  };


  // thumbnail image lazy load
  function thumbnailsLazySetSrc() {
    if( g_containerThumbnailsDisplayed ) {
      var wp=getViewport();
      var $eltInViewport=jQuery(g_containerThumbnails).find('.container').filter(function() {
         return inViewport(this, g_thumbnailLazyLoadTreshold);
      });

      $($eltInViewport).each(function(){
          var $image=$(this).find('img');
          if( $($image).attr('src') == '' ) {
            var idx=$(this).data('index')
            $($image).attr('src',g_ngItems[idx].thumbsrc);
          }
      });
    }
}

  /*function RePositionElements() {
    if( g_containerThumbnailsDisplayed ) {
      SetTumbnailsContainerWidth(0);
      SetTumbnailsContainerHeight();
    }
    if( g_containerViewerDisplayed ) {
      ResizeInternalViewer();
    }
  };*/

  // check album name - blackList/whiteList
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
  
  // ###################
  // ##### GALLERY #####
  // ###################

  function renderGallery(albumIdx,pageNumber) {
    var elt=jQuery(g_containerThumbnails).parent();
    //jQuery(g_containerThumbnails).animate({'max-height': '0'}, 200);
    jQuery(elt).animate({opacity: 0},100).promise().done(function(){
      g_containerThumbnailsDisplayed=false;
      jQuery(g_containerThumbnails).children().remove();
      jQuery(elt).css('opacity','1');
      renderGallery2(albumIdx,pageNumber);
      managePagination(albumIdx,pageNumber);
    });
  };

  function removeGallery() {
    if( g_paginationMaxItemsPerPage > 0 || g_paginationMaxLinesPerPage > 0 ) {
      jQuery(g_containerPagination).children().remove();
    }

    var l=g_ngItems.length;
    for( var i=0; i < l ; i++ ) {
      g_ngItems[i].hovered=false;
    }
    var elt=jQuery(g_containerThumbnails).parent();
    //jQuery(g_containerThumbnails).animate({'max-height': '0'}, 200);
    jQuery(elt).animate({opacity: 0},100).promise().done(function(){
      g_containerThumbnailsDisplayed=false;
      jQuery(g_containerThumbnails).children().remove();
      jQuery(elt).css('opacity','1');
      //renderGallery2();
    });
  
  };

  
  // Display pagination
  function managePagination(albumIdx,pageNumber) {
    jQuery(g_containerPagination).children().remove();

    jQuery(g_containerPagination).data('galleryIdx',albumIdx);
    jQuery(g_containerPagination).data('currentPageNumber',pageNumber);
    var n2=0;


    var w=0;
    if( pageNumber > 0 ) {
      var eltPrev=jQuery('<div class="paginationPrev">'+g_i18nTranslations.paginationPrevious+'</div>').appendTo(g_containerPagination);
      w+=jQuery(eltPrev).outerWidth(true);
      eltPrev.click(function(e) {
        paginationPreviousPage();
      });
    }

    var firstPage=0

    
    // pagination - max items per page mode
    if( g_paginationMaxItemsPerPage != 0 ) {
      n2=Math.ceil(g_ngItems[albumIdx].contentLength/g_paginationMaxItemsPerPage);
    }

    // pagination - max lines per page mode
    if( g_paginationMaxLinesPerPage > 0 ) {
      n2=Math.ceil(g_ngItems[albumIdx].contentLength/(g_paginationMaxLinesPerPage*g_paginationLinesMaxItemsPossiblePerLine));
    }

    if( pageNumber >= 5 ) {
      firstPage=pageNumber-5;
      if( n2 > pageNumber+6 ) {
        n2=pageNumber+6;
      }
    }
    else {
      if( n2 > 10 ) {
        n2=10;
      }
    }
    
    if( n2==1 ) {
      // only one page -> do not display anything
      return;
    }
    
    for(var i=firstPage; i < n2; i++ ) {
      var c='';
      if( i == pageNumber ) { c=' currentPage'; }
      var elt=jQuery('<div class="paginationItem'+c+'">'+(i+1)+'</div>').appendTo(g_containerPagination);
      jQuery(elt).data('pageNumber',i);
      w+=jQuery(elt).outerWidth(true);
      elt.click(function(e) {
        var aIdx=jQuery(g_containerPagination).data('galleryIdx');
        var pn=jQuery(this).data('pageNumber');
        removeGallery();
        renderGallery(aIdx,pn);
      });

    }

    if( (pageNumber+1) < n2 ) {
      var eltNext=jQuery('<div class="paginationNext">'+g_i18nTranslations.paginationNext+'</div>').appendTo(g_containerPagination);
      w+=jQuery(eltNext).outerWidth(true);
      eltNext.click(function(e) {
        paginationNextPage();
      });
    }

    jQuery(g_containerPagination).width(w);

  }

  function paginationNextPage() {
    var aIdx=jQuery(g_containerPagination).data('galleryIdx');

    var n1=0;
    // pagination - max items per page mode
    if( g_paginationMaxItemsPerPage != 0 ) {
      n1=g_ngItems[aIdx].contentLength/g_paginationMaxItemsPerPage;
    }
    // pagination - max lines per page mode
    if( g_paginationMaxLinesPerPage > 0 ) {
      n1=g_ngItems[aIdx].contentLength/(g_paginationMaxLinesPerPage*g_paginationLinesMaxItemsPossiblePerLine);
    }
    n2=Math.ceil(n1);
    
    var pn=jQuery(g_containerPagination).data('currentPageNumber');
    if( pn < (n2-1) ) {
      pn++;
    }
    else {
      pn=0;
    }
    removeGallery();
    jQuery(g_containerParent).css({ 'left': 0 });  
    renderGallery(aIdx,pn);
  }
  
  function paginationPreviousPage() {
    var aIdx=jQuery(g_containerPagination).data('galleryIdx');

    var n1=0;
    // pagination - max items per page mode
    if( g_paginationMaxItemsPerPage != 0 ) {
      n1=g_ngItems[aIdx].contentLength/g_paginationMaxItemsPerPage;
    }
    // pagination - max lines per page mode
    if( g_paginationMaxLinesPerPage > 0 ) {
      n1=g_ngItems[aIdx].contentLength/(g_paginationMaxLinesPerPage*g_paginationLinesMaxItemsPossiblePerLine);
    }
    n2=Math.ceil(n1);
    
    var pn=jQuery(g_containerPagination).data('currentPageNumber');
    if( pn > 0 ) {
      pn--;
    }
    else {
      pn=n2-1;
    }
    removeGallery();
    jQuery(g_containerParent).css({ 'left': 0 });  
    renderGallery(aIdx,pn);
  }


  
  function renderGallery2(albumIdx, pageNumber) {
    g_oneThumbnailWidth=0;
    g_oneThumbnailWidthContainer=0;
    g_oneThumbnailHeight=0;
    g_oneThumbnailHeightContainer=0;
    g_oneThumbnailLabelTitleHeight=0;

    var l=g_ngItems.length;
    // if one description is defined then put a value to those without
    var foundDesc=false;
/*    if( g_options.thumbnailLabel.position == 'onBottom'  ) {
      for(var i=0; i<l; i++ ) {
        if( g_ngItems[i].albumID == g_ngItems[albumIdx].albumID && g_ngItems[i].description.length > 0 ) { foundDesc=true; }
      }
    }*/

    g_galleryItemsCount=0;
    var currentCounter=0;

    var firstCounter=0;
    var lastCounter=0;
    if( g_paginationMaxItemsPerPage > 0 ) {
      firstCounter=pageNumber*g_paginationMaxItemsPerPage;
      lastCounter=firstCounter+g_paginationMaxItemsPerPage;
    }
    if( g_paginationMaxLinesPerPage > 0 ) {
      firstCounter=pageNumber*g_paginationMaxLinesPerPage*g_paginationLinesMaxItemsPossiblePerLine;
      lastCounter=firstCounter+g_paginationMaxLinesPerPage*g_paginationLinesMaxItemsPossiblePerLine;
    }

    var firstPass=true;
    var endInViewportTest=false;
    var startInViewportTest=false;
    for(var i=0; i<l; i++ ) {
      var item=g_ngItems[i];
      if( item.albumID == g_ngItems[albumIdx].GetID() ) {
        currentCounter++;
        // pagination - max items per page mode
        if( g_paginationMaxItemsPerPage > 0 && currentCounter > lastCounter ) {
          break;
        }

        // pagination - max lines per page mode
        if( g_paginationMaxLinesPerPage > 0 ) {
          if( (g_galleryItemsCount+1) > (g_paginationMaxLinesPerPage*g_paginationLinesMaxItemsPossiblePerLine) ) {
            break;
          }
        }
        
        if( currentCounter > firstCounter ) {
          g_galleryItemsCount++;
          var $newDivTemp =jQuery('<div class="container" style="display: inline-block"></div>');  
          var $newDivTemp1 =jQuery('<div class="subcontainer" style="display: inline-block"></div>');  
          //jQuery(newDivTemp1).append('<div class="imgContainer" style="width:'+g_options.thumbnailWidth+'px;height:'+g_options.thumbnailHeight+'px;"><img class="image" src="'+item['thumbsrc']+'" style="max-width:'+g_options.thumbnailWidth+'px;max-height:'+g_options.thumbnailHeight+'px;"></div>');
          
          var newImg=null;
          if( g_options.thumbnailLazyLoad ) {
            newImg=jQuery('<div class="imgContainer" style="width:'+g_options.thumbnailWidth+'px;height:'+g_options.thumbnailHeight+'px;"><img class="image" src="" style="max-width:'+g_options.thumbnailWidth+'px;max-height:'+g_options.thumbnailHeight+'px;"></div>');
          }
           else {
            newImg=jQuery('<div class="imgContainer" style="width:'+g_options.thumbnailWidth+'px;height:'+g_options.thumbnailHeight+'px;"><img class="image" src="'+item.thumbsrc+'" style="max-width:'+g_options.thumbnailWidth+'px;max-height:'+g_options.thumbnailHeight+'px;"></div>');
          }
          jQuery($newDivTemp1).append(newImg);
          if( item.kind == 'album' ) {
            // album
            if( g_options.thumbnailLabel.display == true ) {
              jQuery($newDivTemp1).append('<div class="iconInfo"></div>');
              var sDesc='';
              if( g_options.thumbnailLabel.displayDescription == true ) { sDesc = item.description; }
              var newLabel=jQuery('<div class="labelImage" style="width:'+g_options.thumbnailWidth+'px;max-height:'+g_options.thumbnailHeight+'px;"><div class="labelFolderTitle">'+item.title+'</div><div class="labelDescription">'+sDesc+'</div></div>');
              jQuery($newDivTemp1).append(newLabel);
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
              jQuery($newDivTemp1).append(newLabel);
            }
          }
          jQuery($newDivTemp).append($newDivTemp1);
          if( g_options.thumbnailDisplayTransition ) {
            jQuery($newDivTemp).css('opacity','0');
          }
          else {
            jQuery($newDivTemp).css('opacity','1');
          }
          var newDiv =jQuery($newDivTemp).appendTo(g_containerThumbnails); //.animate({ opacity: 1},1000, 'swing');  //.show('slow'); //.fadeIn('slow').slideDown('slow');
          //alert(jQuery(newDiv).position().top);
          
          g_ngItems[i].elt=newDiv;

          if( g_options.thumbnailDisplayTransition ) {
            if( g_thumbnailDisplayInterval > 0 ) {
              jQuery(newDiv).delay(g_galleryItemsCount*g_thumbnailDisplayInterval).fadeTo(150, 1);
            }
            else {
              jQuery(newDiv).fadeTo(150, 1);
            }
          }

          
          
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
          

          if( firstPass ) {
            g_oneThumbnailWidth=jQuery(newDiv).find('.imgContainer').outerWidth(true) ;
            g_oneThumbnailHeight= jQuery(newDiv).find('.imgContainer').outerHeight(true);
          }
          jQuery(newDiv).width(g_oneThumbnailWidth);
          jQuery(newDiv).height(g_oneThumbnailHeight);
          if( firstPass ) {
            g_oneThumbnailWidthContainer=jQuery(newDiv).outerWidth(true);
            g_oneThumbnailHeightContainer=jQuery(newDiv).outerHeight(true);
            if( item.kind == 'album' ) {
              g_oneThumbnailLabelTitleHeight=jQuery(newDiv).find('.labelFolderTitle').outerWidth(true);
            }
            else {
              g_oneThumbnailLabelTitleHeight=jQuery(newDiv).find('.labelImageTitle').outerHeight(true);
            }
            
            // pagination - max lines per page mode
            if( g_paginationMaxLinesPerPage > 0 ) {
              var areaW=jQuery(g_containerParent).width();
              g_paginationLinesMaxItemsPossiblePerLine=parseInt(areaW/g_oneThumbnailWidthContainer);
              if( g_paginationLinesMaxItemsPossiblePerLine < 1 ) {
                g_paginationLinesMaxItemsPossiblePerLine=1;
              }
              if(  g_options.maxItemsPerLine >0 && g_paginationLinesMaxItemsPossiblePerLine >  g_options.maxItemsPerLine ) {
                g_paginationLinesMaxItemsPossiblePerLine=g_options.maxItemsPerLine;
              }
            }
          }

          jQuery(newDiv).data('index',i);

          if( g_options.thumbnailLazyLoad ) {
            if( !endInViewportTest ) {
              if( inViewport(newDiv, g_thumbnailLazyLoadTreshold) ) {
                jQuery(newDiv).find('img').attr('src',item.thumbsrc);
                startInViewportTest=true;
              }
              else {
                if( startInViewportTest ) { endInViewportTest=true; }
              }
            }
          }
          
          // CSS init depending on choosen effect
          ThumbnailInit( newDiv );
          
          // backup values used in animations/transitions
          if( firstPass ) {
            g_oldBorderColor=jQuery(newDiv).css('border-color');
            if( g_oldBorderColor == '' || g_oldBorderColor == null || g_oldBorderColor == undefined ) { g_oldBorderColor='#000'; }
            g_oldLabelOpacity=jQuery(newDiv).find('.labelImage').css('opacity');
            firstPass=false;
          }
          
          $(newDiv).nanoHoverIntent({
            over: function() {
              //e.preventDefault();
              ThumbnailHover(this);
              return;
            },
            out: function() {
              //e.preventDefault();
              ThumbnailHoverOut(this);
              return;
            },
            interval:50,
            timeout: 150
          });

          newDiv.click(function(e) {
            e.stopPropagation();
            var n=jQuery(this).data('index');

            if( g_options.touchAnimation == false || g_ngItems[n].hovered === true ) {
              // open URL
              if( g_ngItems[n].destinationURL !== undefined && g_ngItems[n].destinationURL.length >0 ) {
                window.location = g_ngItems[n].destinationURL;
                return;
              }

              if( g_ngItems[n].kind == 'album' ) {
                switch( g_options.kind ) {
                  case 'picasa':
                    // open Picasa/Google+ album
                    PicasaRetrieveItems(n);
                    break;
                  case 'flickr':
                    // Open Flickr photoset
                    FlickrRetrieveItems(n);
                    break;
                  default:
                    manageGalleryToolbar(n);
                    removeGallery();
                    renderGallery(n,0);
                    break;
                }
              }
              else {
                // Display image
                DisplayItem(this);
              }
            }
            else {
              // hover effect on click --> touchscreen
              ThumbnailHoverOutAll();
              ThumbnailHover(this);
            }
            return;
          });
          
          // play the hover out animation on thumbnail --> touchscreen
          if( g_options.touchAnimation ) {
            $(document.body).click(function(e){
              ThumbnailHoverOutAll();
              return;
            });
          }
        }

      }
    }
    
    SetTumbnailsContainerWidth(pageNumber);
    var newH=SetTumbnailsContainerHeight();

    
    /*if( g_paginationMaxLinesPerPage > 0 ) {
      var areaH=jQuery(g_containerThumbnails).outerHeight();
      jQuery(g_containerThumbnails).css('max-height',areaH);
    }*/

    /*jQuery(g_containerThumbnails).animate({maxHeight: newH}, 200, function() {
      // animation to display the thumbnails
      jQuery(g_containerThumbnails).find('.container').each(function(i) {
        if( g_thumbnailDisplayInterval > 0 ) {
          jQuery(this).delay((i++) * g_thumbnailDisplayInterval).fadeTo(150, 1);
        }
        else {
          jQuery(this).fadeTo(150, 1);
        }
      });
      g_containerThumbnailsDisplayed=true;
    });*/
    g_containerThumbnailsDisplayed=true;

  };
  
  function ThumbnailHoverOutAll() {
    var l=g_ngItems.length;
    for( var i=0; i < l ; i++ ) {
      if( g_ngItems[i].hovered === true ) {
        ThumbnailHoverOut(g_ngItems[i].elt);
      }
    }
  }
  
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
        case 'labelSlideUpTop':
          if( g_options.thumbnailLabel.position == 'overImageOnTop' || g_options.thumbnailLabel.position == 'overImageOnBottom' ) {
            jQuery(elt).css('overflow','hidden');
            jQuery(elt).find('.labelImage').css({'top':g_oneThumbnailHeight, 'bottom':'none'});
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
    var n=jQuery(elt).data('index');
    g_ngItems[n].hovered=true;
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
          case 'labelSlideUpTop':
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
    if( g_containerViewerDisplayed ) { return; }
    jQuery(elt).find('*').stop(true,false);
    var n=jQuery(elt).data("index");
    
    g_ngItems[n].hovered=false;
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
          case 'labelSlideUpTop':
            var n= g_oneThumbnailHeight + 'px';
            if( g_options.thumbnailLabel.position == 'overImageOnBottom' ) {
              if( g_supportTransit ) {
                jQuery(elt).find('.labelImage').transition({ 'top': n},g_thumbnailHoverEffect[j].duration, g_thumbnailHoverEffect[j].easing);
              }
              else {
                jQuery(elt).find('.labelImage').animate({ 'top': n},g_thumbnailHoverEffect[j].duration, g_thumbnailHoverEffect[j].easing);
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
    var nbLines=Math.ceil(g_galleryItemsCount/nbItemsPerLineLines);
    var h=nbLines*g_oneThumbnailHeightContainer;
    //if( g_containerThumbnailsDisplayed ) { jQuery(g_containerThumbnails).css('max-height',h); }
    return h;
  };
    
  function SetTumbnailsContainerWidth(pageNumber) {
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
        var w=parseInt(wcont/g_oneThumbnailWidthContainer);  // number of thumbnails that can be displayed in 1 row
        jQuery(g_containerThumbnails).css('max-width',w*g_oneThumbnailWidthContainer);
      }
    }
    
    SetGalleryToolbarWidth(pageNumber);
  };
  

  // #########################
  // ##### IMAGE DISPLAY #####
  // #########################

  function DisplayItem(element) {
    if( g_options.viewer == 'fancybox' ) {
      OpenFancyBox(element);
    }
    else {
      g_windowsHash.push('#ng_'+jQuery(g_baseControl).attr('id')+'_v');
      top.location.hash = 'ng_'+jQuery(g_baseControl).attr('id')+'_v';
      OpenInternalViewer(element);
    }
  };
  
  function OpenInternalViewer(element) {
    //jQuery('*').stop(true,false);
    g_viewerPreviousItem=-1;
    g_viewerPreviousItemID=-1;
    g_viewerCurrentItem=-1;
    g_viewerCurrentItemID=jQuery(element).data('index');
    g_viewerMaxImages=0;
    for( var i =0; i <=  g_viewerCurrentItemID ; i++ ) {
      if( g_ngItems[i].albumID == g_ngItems[g_viewerCurrentItemID].albumID && g_ngItems[i].kind == 'image' ) {
        g_viewerCurrentItem++;
      }
    }
    
    
    //jQuery(g_containerViewer).children().remove();
    //g_containerViewer=jQuery('<div class="nanoGalleryViewer" style="visibility:hidden"></div>').appendTo(g_baseControl);
    jQuery('body').css('overflow','hidden');  //avoid scrollbars
    g_containerViewerContainer=jQuery('<div  class="nanoGalleryViewerContainer" style="visibility:visible"></div>').appendTo('body');
    jQuery(g_containerViewerContainer).addClass('nanogallery_theme_'+g_options.theme);
    SetColorSchemeViewer(g_containerViewerContainer);

    g_containerViewer=jQuery('<div  id="nanoGalleryViewer" class="nanoGalleryViewer" style="visibility:visible"></div>').appendTo(g_containerViewerContainer);
    
    var sImg='';
    var l=g_ngItems.length;
    g_viewerMaxImages=0;
    for( var i =0; i <  l ; i++ ) {
      if( g_ngItems[i].albumID == g_ngItems[g_viewerCurrentItemID].albumID && g_ngItems[i].kind == 'image' ) {
        sImg+='<img class="image" src="" style="visibility:visible;opacity:0;position:absolute;top:0;bottom:0;left:0;right:0;margin:auto;zoom:1;">';
        g_viewerMaxImages++;
      }
    }
    //sImg+='<img class="image" src="" style="visibility:hidden;position:absolute;top:0;bottom:0;left:0;right:0;margin:auto;">';

    g_containerViewerContent=jQuery('<div class="content">'+sImg+'<div class="contentAreaPrevious"></div><div class="contentAreaNext"></div></div>').appendTo(g_containerViewer);
    g_containerViewerCloseFloating=jQuery('<div class="closeButtonFloating"></div>').appendTo(g_containerViewer);
    //g_containerViewerCloseFloating=jQuery('<div class="closeButtonFloating"></div>').appendTo(jQuery(g_containerViewerContent).find('img'));
    var fs='';
    if( g_supportFullscreenAPI ) {
      fs='<div class="setFullscreenButton fullscreenButton"></div>';
    }
    g_containerViewerToolbar=jQuery('<div class="toolbar"><div class="previousButton"></div><div class="playButton playPauseButton"></div><div class="nextButton"></div>'+fs+'<div class="closeButton"></div><div class="label"><div class="title"></div><div class="description"></div></div>').appendTo(g_containerViewer);

    setElementOnTop('',g_containerViewer);

    DisplayInternalViewer(false);
    
    
    // GESTURE : drag --> requires HAMMER.JS
    if( typeof(Hammer) !== 'undefined' ) {
      var hammertime = Hammer(document.getElementById('nanoGalleryViewer'), {
        drag:true,
        transform_always_block:true,
        drag_block_horizontal: true,
        //drag_min_distance: 25,
        prevent_default:false,
        drag_lock_min_distance: 20,
        hold: false,
        release: true,
        swipe: true,
        tap: false,
        touch: true,
        transform: false
      });

      var posX=0, posY=0;
      hammertime.on('drag release', function(ev) {
        switch(ev.type) {
          case 'drag':
            ev.stopPropagation();
            posX = ev.gesture.deltaX;
            posY = ev.gesture.deltaY;
            if( Math.abs(posX)  < 25 ) {
              jQuery(g_containerViewerContent).find('img').css({ 'left': 0 });  
            }
            else {
              jQuery(g_containerViewerContent).find('img').css({ 'left': posX });
            }
            break;
          case 'release':
            ev.gesture.stopPropagation();
            ev.stopPropagation();
            if( Math.abs(posX)  < 25 ||  (new Date().getTime()) - lastImageChange < 100 ) {
              jQuery(g_containerViewerContent).find('img').css({ 'left': 0 });  
            }
            if( Math.round(posX) < -25 ) {
              DisplayNextImagePart1(false);
            }
            if( Math.round(posX) > 25 ) {
              DisplayPreviousImage(false);
            }
            posX=0;
            break;
        }
      });
    }
    
    jQuery(g_containerViewerCloseFloating).on("click",function(e){
      e.stopPropagation();
      //CloseInternalViewer();
      if( g_windowsHash.length > 0 ) { 
        window.history.back();
      }
      else {
        CloseInternalViewer();
      }
    });
    
    jQuery(g_containerViewerToolbar).find('.closeButton').on("click",function(e){
      e.stopPropagation();
      //CloseInternalViewer();
      if( g_windowsHash.length > 0 ) { 
        window.history.back();
      }
      else {
        CloseInternalViewer();
      }
    });

    jQuery(g_containerViewerContent).find('img').on("click",function(e){
      e.stopPropagation();
      if( e.pageX < (jQuery(window).width()/2) ) {
        DisplayPreviousImage(true);
      }
      else {
        DisplayNextImagePart1(true);
      }
    });
    

    jQuery(g_containerViewerToolbar).find('.playPauseButton').on("click",function(e){ 
      e.stopPropagation();
      SlideshowToggle();
    });
    
    jQuery(g_containerViewerToolbar).find('.fullscreenButton').on("click",function(e){ 
      e.stopPropagation();
      ViewerFullscreenToggle();
    });

    jQuery(g_containerViewerToolbar).find('.nextButton').on("click",function(e){ e.stopPropagation(); DisplayNextImagePart1(true); });
    jQuery(g_containerViewerToolbar).find('.previousButton').on("click",function(e){ e.stopPropagation(); DisplayPreviousImage(true); });
    jQuery(g_containerViewerContent).find('.contentAreaNext').on("click",function(e){ e.stopPropagation(); DisplayNextImagePart1(true); });
    jQuery(g_containerViewerContent).find('.contentAreaPrevious').on("click",function(e){ e.stopPropagation(); DisplayPreviousImage(true); });


    
    
    jQuery(g_containerViewerContent).on("click",function(e){ 
      if( (new Date().getTime()) - lastImageChange < 100 ) { return; }
      e.stopPropagation();
      //CloseInternalViewer(); 
      if( g_windowsHash.length > 0 ) { 
        window.history.back();
      }
      else {
        CloseInternalViewer();
      }
    });

  };
  
  function ViewerFullscreenToggle(){
    //ViewerFullscreenToggle
    if( g_viewerIsFullscreen ) {
      if (document.exitFullscreen) {
              document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
              document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
              document.msExitFullscreen();
            } else if (document.mozCancelFullScreen) {
              document.mozCancelFullScreen();
            }

      g_viewerIsFullscreen=false;
      jQuery(g_containerViewerToolbar).find('.fullscreenButton').removeClass('removeFullscreenButton').addClass('setFullscreenButton');
    }
    else {
      if (jQuery(g_containerViewerContainer)[0].requestFullscreen) {
                  jQuery(g_containerViewerContainer)[0].requestFullscreen();
              } else if (jQuery(g_containerViewerContainer)[0].webkitRequestFullscreen) {
                jQuery(g_containerViewerContainer)[0].webkitRequestFullscreen();
              } else if (jQuery(g_containerViewerContainer)[0].msRequestFullscreen) {
                jQuery(g_containerViewerContainer)[0].msRequestFullscreen();
              } else if (jQuery(g_containerViewerContainer)[0].mozRequestFullScreen) {
                jQuery(g_containerViewerContainer)[0].mozRequestFullScreen();
              }
      g_viewerIsFullscreen=true;
      jQuery(g_containerViewerToolbar).find('.fullscreenButton').removeClass('setFullscreenButton').addClass('removeFullscreenButton');
    }
  }
  
  function SlideshowToggle(){
    if( g_playSlideshow ) {
      window.clearInterval(g_playSlideshowTimerID);
      g_playSlideshow=false;
      jQuery(g_containerViewerToolbar).find('.playPauseButton').removeClass('pauseButton').addClass('playButton');
    }
    else {
      g_playSlideshow=true;
      jQuery(g_containerViewerToolbar).find('.playPauseButton').removeClass('playButton').addClass('pauseButton');
      DisplayNextImage(true);
      g_playSlideshowTimerID=window.setInterval(function(){DisplayNextImage(true)},g_slideshowDelay);
    }
  }
  
  function DisplayNextImagePart1(effect) {
    if( g_playSlideshow ) {
      window.clearInterval(g_playSlideshowTimerID);
      g_playSlideshowTimerID=window.setInterval(function(){DisplayNextImage(true)},g_slideshowDelay);
    }
    DisplayNextImage(effect);
  }
  
  
  function DisplayNextImage(effect) {
//alert('next');
    if( (new Date().getTime()) - lastImageChange < 100 ) { return; }
    g_viewerPreviousItem=g_viewerCurrentItem;
    g_viewerPreviousItemID=g_viewerCurrentItemID;
    var l=g_ngItems.length;
    var found=false;
    for(var i=g_viewerCurrentItemID+1; i<l; i++ ){
      if( g_ngItems[i].albumID == g_ngItems[g_viewerPreviousItemID].albumID && g_ngItems[i].kind == 'image' ) {
        found=true;
        g_viewerCurrentItemID=i;
        g_viewerCurrentItem++;
        break;
      }
    }
    if( !found ) {
      for(var i=0; i<=g_viewerPreviousItemID; i++ ){
        if( g_ngItems[i].albumID == g_ngItems[g_viewerPreviousItemID].albumID && g_ngItems[i].kind == 'image' ) {
          g_viewerCurrentItemID=i;
          g_viewerCurrentItem=0;
          break;
        }
      }
    }
    
    DisplayInternalViewer(effect, {'scrollRight':true});
  };
  
  function DisplayPreviousImage(effect) {
    if( (new Date().getTime()) - lastImageChange < 100 ) { return; }
    if( g_playSlideshow ) {
      SlideshowToggle();
    }
    g_viewerPreviousItem=g_viewerCurrentItem;
    g_viewerPreviousItemID=g_viewerCurrentItemID;

    
//alert('previous:'+g_viewerPreviousItem + '-' + g_viewerPreviousItemID);
    
    var found=false;
    for(var i=g_viewerPreviousItemID-1; i>=0; i-- ){
      if( g_ngItems[i].albumID == g_ngItems[g_viewerPreviousItemID].albumID && g_ngItems[i].kind == 'image' ) {
        found=true;
        g_viewerCurrentItemID=i;
        g_viewerCurrentItem--;
        break;
      }
    }
    if( !found ) {
      for(var i=g_ngItems.length-1; i>=g_viewerPreviousItemID; i-- ){
        if( g_ngItems[i].albumID == g_ngItems[g_viewerPreviousItemID].albumID && g_ngItems[i].kind == 'image' ) {
          g_viewerCurrentItemID=i;
          g_viewerCurrentItem=g_viewerMaxImages-1;
          break;
        }
      }
    }

    DisplayInternalViewer(effect,{'scrollLeft':true});
  };

  
  function DisplayInternalViewer(effect, options) {
    lastImageChange=new Date().getTime();
  
    var scrollH='0px';
    if( effect === true) {
      if( options !== undefined ) {
        if( options['scrollLeft'] ) {
          if (options['scrollLeft'] == true ) {
            if( g_supportTransit ) {
              //scrollH='+=-200px';
              scrollH='+200px';
            }
            else {
              //scrollH='-=200px';
              scrollH='-200px';
            }
          }
        }
        if( options['scrollRight'] ) {
          if (options['scrollRight'] == true ) {
            scrollH='-200px';
          }
        }
      }
    }

    // set the url and visibility
    jQuery(g_containerViewerContent).find('img:eq('+g_viewerCurrentItem+')').attr('src',g_ngItems[g_viewerCurrentItemID].src);
    var l=g_ngItems.length;
    for(var i=g_viewerCurrentItemID+1; i<l; i++ ){
      if( g_ngItems[i].albumID == g_ngItems[g_viewerCurrentItemID].albumID && g_ngItems[i].kind == 'image' ) {
        // set also the url of the next image for pre-loading
        jQuery(g_containerViewerContent).find('img:eq('+(g_viewerCurrentItem+1)+')').attr('src',g_ngItems[i].src);
        break;
      }
    }

    jQuery(g_containerViewerContent).find('img:eq('+g_viewerCurrentItem+')').css({'opacity':0, 'left':'0px', visibility: "visible"});
    set2ElementsOnTop( jQuery(g_containerViewerContent), jQuery(g_containerViewerContent).find('img:eq('+g_viewerPreviousItem+')'), jQuery(g_containerViewerContent).find('img:eq('+g_viewerCurrentItem+')') );
    if( g_viewerPreviousItemID != -1 && g_viewerPreviousItemID != g_viewerCurrentItemID ) {
      jQuery(g_containerViewerContent).find('*').stop(true,true);
      if( g_supportTransit ) {
        jQuery(g_containerViewerContent).find('img:eq('+g_viewerCurrentItem+')').transition({ 'opacity':1 });
      }
      else {
        jQuery(g_containerViewerContent).find('img:eq('+g_viewerCurrentItem+')').animate({opacity: 1});
        //jQuery(g_containerViewerContent).find('img:eq('+g_viewerCurrentItem+')').css({opacity: 0, visibility: 'visible'}).animate({opacity: 1.0});
      }
      if( effect === true ) {
        if( g_supportTransit ) {
          jQuery(g_containerViewerContent).find('img:eq('+g_viewerPreviousItem+')').transition({ 'opacity':0, 'left': scrollH }, function() {
            jQuery(g_containerViewerContent).find('img:eq('+g_viewerPreviousItem+')').css({ 'left':'0px'});
          });
        }
        else {
          jQuery(g_containerViewerContent).find('img:eq('+g_viewerPreviousItem+')').animate({ 'opacity': 0,'left': scrollH }, function() {
            jQuery(g_containerViewerContent).find('img:eq('+g_viewerPreviousItem+')').css({ 'left':'0px'});
          });
        }
      }
      else {
        if( g_supportTransit ) {
          jQuery(g_containerViewerContent).find('img:eq('+g_viewerPreviousItem+')').transition({ 'opacity': 0}, function() {
            jQuery(g_containerViewerContent).find('img:eq('+g_viewerPreviousItem+')').css({ 'left':'0px'});
          });
        }
        else {
          jQuery(g_containerViewerContent).find('img:eq('+g_viewerPreviousItem+')').animate({ 'opacity': 0 }, function() {
            jQuery(g_containerViewerContent).find('img:eq('+g_viewerPreviousItem+')').css({ 'left':'0px'});
          });
        }
      }
    }
    else {
      if( g_supportTransit ) {
        jQuery(g_containerViewerContent).find('img:eq('+g_viewerCurrentItem+')').transition({ 'opacity': 1 });
      }
      else {
        jQuery(g_containerViewerContent).find('img:eq('+g_viewerCurrentItem+')').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0});
      }
    }
    setElementOnTop( jQuery(g_containerViewer), jQuery(g_containerViewerContent).find('.contentAreaPrevious') );
    setElementOnTop( jQuery(g_containerViewer), jQuery(g_containerViewerContent).find('.contentAreaNext') );
    
    // set title
    if( g_ngItems[g_viewerCurrentItemID].title !== undefined ) {
      jQuery(g_containerViewerToolbar).find('.title').html(g_ngItems[g_viewerCurrentItemID].title);
    }
    else {
      jQuery(g_containerViewerToolbar).find('.title').html('');
    }
    // set description
    if( g_ngItems[g_viewerCurrentItemID].description !== undefined ) {
      jQuery(g_containerViewerToolbar).find('.description').html(g_ngItems[g_viewerCurrentItemID].description);
    }
    else {
      jQuery(g_containerViewerToolbar).find('.description').html('');
    }
    
    ResizeInternalViewer();
    g_containerViewerDisplayed=true;
  };
  
  function CloseInternalViewer() {
    if( g_containerViewerDisplayed ) {
      if( g_playSlideshow ) {
        window.clearInterval(g_playSlideshowTimerID);
        g_playSlideshow=false;
      }
      if( g_viewerIsFullscreen ) {
        ViewerFullscreenToggle()
      }
      g_containerViewerDisplayed=false;
      //top.location.hash = "";
      jQuery(g_containerViewer).remove();
      jQuery(g_containerViewerContainer).remove();
      jQuery('body').css('overflow','inherit');
      g_viewerPreviousItem=-1;
      g_viewerPreviousItemID=-1;
      ThumbnailHoverOutAll();
    }
  };
  
  function ResizeInternalViewer() {
    var w=jQuery(window).width();
    var h=jQuery(window).height();
    jQuery(g_containerViewer).css({
      "visibility":"visible",
      "position": "fixed",    //"absolute",
      "top":0,
      "left":0,
      "width":jQuery(window).width(),
      "height":jQuery(window).height()
    });

    var elt=jQuery(g_containerViewerContent).find('img');
    
    var contentOuterWidthV=Math.abs(jQuery(g_containerViewerContent).outerHeight(true)-jQuery(g_containerViewerContent).height());  // vertical margin+border+padding
    var contentOuterWidthH=Math.abs(jQuery(g_containerViewerContent).outerHeight(true)-jQuery(g_containerViewerContent).height());  // horizontal margin+border+padding
    
    var imgBorderV=jQuery(elt).outerHeight(false)-jQuery(elt).innerHeight();
    var imgBorderH=Math.abs(jQuery(elt).outerWidth(false)-jQuery(elt).innerWidth());
    
    var imgPaddingV=Math.abs(jQuery(elt).innerHeight()-jQuery(elt).height());
    var imgPaddingH=Math.abs(jQuery(elt).innerHeight()-jQuery(elt).height());
    
    var tV=imgBorderV+imgPaddingV;  //+tmargin;
    var tH=imgBorderH+imgPaddingH;  //+tmargin;

    var h=jQuery(window).height()-jQuery(g_containerViewerToolbar).outerHeight(true)-contentOuterWidthV;
    var w=jQuery(window).width()-contentOuterWidthH;
    jQuery(g_containerViewerContent).css({'height':h, 'width':w  });
        
    jQuery(g_containerViewerContent).children('img').css({'max-width': (w-tV),'max-height':h-tH });
    
    var pt=(jQuery(g_containerViewerContent).find('img').outerHeight(true)-jQuery(g_containerViewerContent).find('img').outerHeight())/2;
    var pl=(jQuery(g_containerViewerContent).find('img').outerWidth(true)-jQuery(g_containerViewerContent).find('img').outerWidth())/2;
    //jQuery(g_containerViewerCloseFloating).css('top',pt-11);
    //jQuery(g_containerViewerCloseFloating).css('left',pl-11);
    
  };
  
  
  function OpenFancyBox(element) {
    var n=jQuery(element).data("index");
    var lstImages=[];
    var current=0;

    lstImages[current]=new Object;
    lstImages[current].href=g_ngItems[n].src;
    lstImages[current].title=g_ngItems[n].title;
    
    var l=g_ngItems.length;
    for( var j=n+1; j<l ; j++) {
      if( g_ngItems[j].kind == 'image' && g_ngItems[j].destinationURL == '' ) {
        current++;
        lstImages[current]=new Object;
        lstImages[current].href=g_ngItems.length[j].src;
        lstImages[current].title=g_ngItems.length[j].title;
      }
    }
    for( var j=0; j<n; j++) {
      if( g_ngItems[j].kind == 'image' && g_ngItems[j].destinationURL == '' ) {
        current++;
        lstImages[current]=new Object;
        lstImages[current].href=g_ngItems.length[j].src;
        lstImages[current].title=g_ngItems.length[j].title;
      }
    }
    jQuery.fancybox.open(lstImages,{'autoPlay':false, 'nextEffect':'fade', 'prevEffect':'fade','scrolling':'no',
      helpers    : {  buttons  : { 'position' : 'bottom'} }
    });
  };
  
  // ##### BREADCRUMB/THUMBNAIL COLOR SCHEME #####
  function SetColorScheme(element) {
    var cs=null;
    switch(toType(g_options.colorScheme)) {
      case 'object':    // user custom color scheme object 
        cs=g_colorScheme_default;
        jQuery.extend(true,cs,g_options.colorScheme);
        g_colorSchemeLabel='nanogallery_colorscheme_custom';
        break;
      case 'string':    // name of an internal defined color scheme
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
        nanoAlert('Error in colorScheme parameter.');
        return;
    }

    
    //var s1='.nanogallery_theme_'+g_options.theme+' ';
    var s1='.' + g_colorSchemeLabel + ' ';
    var s=s1+'.nanoGalleryNavigationbar { background:'+cs.navigationbar.background+'; }'+'\n';
    if( cs.navigationbar.border !== undefined ) { s+=s1+'.nanoGalleryNavigationbar { border:'+cs.navigationbar.border+'; }'+'\n'; }
    if( cs.navigationbar.borderTop !== undefined ) { s+=s1+'.nanoGalleryNavigationbar { border-top:'+cs.navigationbar.borderTop+'; }'+'\n'; }
    if( cs.navigationbar.borderBottom !== undefined ) { s+=s1+'.nanoGalleryNavigationbar { border-bottom:'+cs.navigationbar.borderBottom+'; }'+'\n'; }
    if( cs.navigationbar.borderRight !== undefined ) { s+=s1+'.nanoGalleryNavigationbar { border-right:'+cs.navigationbar.borderRight+'; }'+'\n'; }
    if( cs.navigationbar.borderLeft !== undefined ) { s+=s1+'.nanoGalleryNavigationbar { border-left:'+cs.navigationbar.borderLeft+'; }'+'\n'; }
    //s+=s1+'.g_containerNavigationbar .folder { color:'+cs.navigationbar.color+'; }'+'\n';
    s+=s1+'.nanoGalleryNavigationbar .folder  { color:'+cs.navigationbar.color+'; }'+'\n';
    s+=s1+'.nanoGalleryNavigationbar .separator  { color:'+cs.navigationbar.color+'; }'+'\n';
    s+=s1+'.nanoGalleryNavigationbar .nanoGalleryTags { color:'+cs.navigationbar.color+'; }'+'\n';
    //s+=s1+'.nanoGalleryNavigationbar .separator:after { color:'+cs.navigationbar.color+'; }'+'\n';
    //s+=s1+'.g_containerNavigationbar .folder:hover { color:'+cs.navigationbar.colorHover+'; }'+'\n';
    s+=s1+'.nanoGalleryNavigationbar .folder:hover { color:'+cs.navigationbar.colorHover+'; }'+'\n';
    s+=s1+'.nanoGalleryNavigationbar .separator:hover { color:'+cs.navigationbar.colorHover+'; }'+'\n';
    s+=s1+'.nanoGalleryNavigationbar .nanoGalleryTags:hover { color:'+cs.navigationbar.colorHover+'; }'+'\n';

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
      case 'object':    // user custom color scheme object 
        cs=g_colorSchemeViewer_default;
        jQuery.extend(true,cs,g_options.colorSchemeViewer);
        g_colorSchemeLabel='nanogallery_colorschemeviewer_custom';
        break;
      case 'string':    // name of an internal defined color scheme
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
        nanoAlert('Error in colorSchemeViewer parameter.');
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

  

  
  
  // #################
  // ##### TOOLS #####
  // #################
  
  
  // Display a message
  function nanoAlert( msg ) {
    alert('nanoGALLERY: ' + msg);
    nanoConsoleLog(msg);
  };
  
  // write to console log
  function nanoConsoleLog( msg ) {
    if (window.console) { console.log('nanoGALLERY: ' + msg); }
  };
  
  // get viewport coordinates and size
  function getViewport() {
    var $wp = $(window);
    return {
      l: $wp.scrollLeft(),
      t: $wp.scrollTop(),
      w: $wp.width(),
      h: $wp.height()
    }
  }

  function inViewport($elt, threshold) {
    var wp=getViewport();
    var eltOS=$($elt).offset();
    var th=$($elt).outerHeight(true);
    var tw=$($elt).outerWidth(true);
    if( eltOS.top >= (wp.t-threshold) 
      && (eltOS.top+th) <= (wp.t+wp.h+threshold) 
      && eltOS.left >= (wp.l-threshold) 
      && (eltOS.left+tw) <= (wp.l+wp.w+threshold) ) {
        return true;
    }
    else {
      return false;
    }
  }

  
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





/**!
 * @preserve
 * Includes also hoverIntent r7 // 2013.03.11 // jQuery 1.9.1+
 * http://cherne.net/brian/resources/jquery.hoverIntent.html
 *
 * You may use hoverIntent under the terms of the MIT license. Basically that
 * means you are free to use hoverIntent as long as this header is left intact.
 * Copyright 2007, 2013 Brian Cherne
 */

/* hoverIntent is similar to jQuery's built-in "hover" method except that
 * instead of firing the handlerIn function immediately, hoverIntent checks
 * to see if the user's mouse has slowed down (beneath the sensitivity
 * threshold) before firing the event. The handlerOut function is only
 * called after a matching handlerIn.
 *
 * // basic usage ... just like .hover()
 * .hoverIntent( handlerIn, handlerOut )
 * .hoverIntent( handlerInOut )
 *
 * // basic usage ... with event delegation!
 * .hoverIntent( handlerIn, handlerOut, selector )
 * .hoverIntent( handlerInOut, selector )
 *
 * // using a basic configuration object
 * .hoverIntent( config )
 *
 * @param  handlerIn   function OR configuration object
 * @param  handlerOut  function OR selector for delegation OR undefined
 * @param  selector    selector OR undefined
 * @author Brian Cherne <brian(at)cherne(dot)net>
 */

/* embedded version renamed nanoHoverIntent to avoid conflicts */

(function($) {
    $.fn.nanoHoverIntent = function(handlerIn,handlerOut,selector) {

        // default configuration values
        var cfg = {
            interval: 100,
            sensitivity: 7,
            timeout: 0
        };

        if ( typeof handlerIn === "object" ) {
            cfg = $.extend(cfg, handlerIn );
        } else if ($.isFunction(handlerOut)) {
            cfg = $.extend(cfg, { over: handlerIn, out: handlerOut, selector: selector } );
        } else {
            cfg = $.extend(cfg, { over: handlerIn, out: handlerIn, selector: handlerOut } );
        }

        // instantiate variables
        // cX, cY = current X and Y position of mouse, updated by mousemove event
        // pX, pY = previous X and Y position of mouse, set by mouseover and polling interval
        var cX, cY, pX, pY;

        // A private function for getting mouse position
        var track = function(ev) {
            cX = ev.pageX;
            cY = ev.pageY;
        };

        // A private function for comparing current and previous mouse position
        var compare = function(ev,ob) {
            ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
            // compare mouse positions to see if they've crossed the threshold
            if ( ( Math.abs(pX-cX) + Math.abs(pY-cY) ) < cfg.sensitivity ) {
                $(ob).off("mousemove.nanoHoverIntent",track);
                // set hoverIntent state to true (so mouseOut can be called)
                ob.hoverIntent_s = 1;
                return cfg.over.apply(ob,[ev]);
            } else {
                // set previous coordinates for next time
                pX = cX; pY = cY;
                // use self-calling timeout, guarantees intervals are spaced out properly (avoids JavaScript timer bugs)
                ob.hoverIntent_t = setTimeout( function(){compare(ev, ob);} , cfg.interval );
            }
        };

        // A private function for delaying the mouseOut function
        var delay = function(ev,ob) {
            ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
            ob.hoverIntent_s = 0;
            return cfg.out.apply(ob,[ev]);
        };

        // A private function for handling mouse 'hovering'
        var handleHover = function(e) {
            // copy objects to be passed into t (required for event object to be passed in IE)
            var ev = jQuery.extend({},e);
            var ob = this;

            // cancel hoverIntent timer if it exists
            if (ob.hoverIntent_t) { ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t); }

            // if e.type == "mouseenter"
            if (e.type == "mouseenter") {
                // set "previous" X and Y position based on initial entry point
                pX = ev.pageX; pY = ev.pageY;
                // update "current" X and Y position based on mousemove
                $(ob).on("mousemove.nanoHoverIntent",track);
                // start polling interval (self-calling timeout) to compare mouse coordinates over time
                if (ob.hoverIntent_s != 1) { ob.hoverIntent_t = setTimeout( function(){compare(ev,ob);} , cfg.interval );}

                // else e.type == "mouseleave"
            } else {
                // unbind expensive mousemove event
                $(ob).off("mousemove.hoverIntent",track);
                // if hoverIntent state is true, then call the mouseOut function after the specified delay
                if (ob.hoverIntent_s == 1) { ob.hoverIntent_t = setTimeout( function(){delay(ev,ob);} , cfg.timeout );}
            }
        };

        // listen for mouseenter and mouseleave
        return this.on({'mouseenter.hoverIntent':handleHover,'mouseleave.hoverIntent':handleHover}, cfg.selector);
    };
})(jQuery);


