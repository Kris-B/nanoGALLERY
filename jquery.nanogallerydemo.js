/**!
 * @preserve nanoGALLERY - Demo Panel
 * Plugin for jQuery by Christophe Brisbois
 * Demo: http://nanogallery.brisbois.fr
 * Sources: https://github.com/Kris-B/nanoGALLERY
 */

 
// ##################################
// ##### nanoGALLERY DEMO PANEL #####
// ##################################
 

// jQuery plugin - nanoGALLERY DEMO PANEL
(function( $ ) {
  jQuery.fn.nanoGalleryDemo = function(options) {
    var g_containerDemo=null,
    g_containerDemoPanel=null,
    g_containerNew=null,
    g_save=null;
    
    var settings = $.extend(true, {
      // default settings
      userID : '',
      kind : '',
      album : '',
      photoset : '',
      blackList : 'scrapbook|profil', whiteList : '', albumList : '',
      RTL : false,
      picasaUseUrlCrossDomain : true,
      flickrSkipOriginal : true,
      galleryToolbarWidthAligned : true, galleryToolbarHideIcons : false,
      galleryFullpageButton : false, galleryFullpageBgColor : '#111',
      galleryRenderStep : 10,
      breadcrumbAutoHideTopLevel : false,
      displayBreadcrumb : false,
      theme : 'default',
      colorScheme : 'none', colorSchemeViewer : 'default',
      items : null,
      itemsBaseURL : '',
      itemsSelectable : false, showCheckboxes: true, checkboxStyle : 'left:15px; top:15px;',
      jsonCharset: 'Latin', jsonProvider: '',
      paginationMaxLinesPerPage : 0, paginationDots : false,
      maxWidth : 0,
      viewer : 'internal',
      viewerFullscreen: false,
      viewerDisplayLogo : false,
      fancyBoxOptions : null,
      imageTransition : 'slide',
      openOnStart : '',
      viewerToolbar : { 
        display:true, position : 'bottom', style : 'innerImage', autoMinimize:800,
        standard:'minimizeButton , previousButton, pageCounter ,nextButton,playPauseButton,fullscreenButton,infoButton,linkOriginalButton,closeButton,label',
        minimized:'minimizeButton,label'  
      },
      thumbnailAlignment : 'center',
      thumbnailWidth : 230, thumbnailHeight : 154,
      thumbnailGutterWidth : 2, thumbnailGutterHeight : 2,
      thumbnailAdjustLastRowHeight : true,
      thumbnailFeatured : false,
      thumbnailAlbumDisplayImage : false,
      thumbnailHoverEffect : null,
      thumbnailLabel : { position : 'overImageOnBottom', display : true, displayDescription : true, titleMaxLength : 0, descriptionMaxLength : 0, hideIcons : false, title : '', itemsCount : '' },
      thumbnailDisplayInterval : 5, thumbnailDisplayTransition : true,
      thumbnailLazyLoad : false, thumbnailLazyLoadTreshold : 100,
      thumbnailGlobalImageTitle : '', thumbnailGlobalAlbumTitle : '',
      //thumbnailSizeSM : 480, thumbnailSizeME : 992, thumbnailSizeLA : 1200, thumbnailSizeXL : 1800,
      breakpointSizeSM : 480, breakpointSizeME : 992, breakpointSizeLA : 1200, breakpointSizeXL : 1800,
      fnThumbnailInit : null, fnThumbnailHoverInit : null, fnThumbnailHoverResize : null, fnThumbnailHover : null, fnThumbnailHoverOut : null, fnThumbnailDisplayEffect : null,
      fnViewerInfo : null,
      fnImgToolbarCustInit : null, fnImgToolbarCustDisplay : null, fnImgToolbarCustClick : null,
      fnProcessData : null,
      fnChangeSelectMode : null,
      fnInitGallery : null,
      touchAnimation : true, touchAutoOpenDelay : 0,
      useTags : false,
      preset : 'none',
      locationHash : true,
      slideshowDelay : 3000, slideshowAutoStart : false,
      photoSorting : '', albumSorting : '', dataSorting : '',
      lazyBuild : 'none', lazyBuildTreshold : 150,
      debugMode: false,
      i18n : {
        'breadcrumbHome' : 'Galleries', 'breadcrumbHome_FR' : 'Galeries',
        'paginationPrevious' : 'Previous', 'paginationPrevious_FR' : 'Pr&eacute;c&eacute;dent', 'paginationPrevious_DE' : 'Zur&uuml;ck', 'paginationPrevious_IT' : 'Indietro',
        'paginationNext' : 'Next', 'paginationNext_FR' : 'Suivant', 'paginationNext_DE' : 'Weiter', 'paginationNext_IT' : 'Avanti',
        'thumbnailLabelItemsCountPart1' : '', //'| ',
        'thumbnailLabelItemsCountPart2' : '', //' photos', 'thumbnailLabelItemsCountPart2_DE' : ' Fotos',
        'thumbnailImageTitle' : '', 'thumbnailAlbumTitle' : '',
        'thumbnailImageDescription' : '', 'thumbnailAlbumDescription' : '',
        'infoBoxPhoto' : 'Photo', 'infoBoxDate' : 'Date', 'infoBoxAlbum' : 'Album', 'infoBoxDimensions' : 'Dimensions', 'infoBoxFilename' : 'Filename', 'infoBoxFileSize' : 'File size', 'infoBoxCamera' : 'Camera', 'infoBoxFocalLength' : 'Focal length', 'infoBoxExposure' : 'Exposure', 'infoBoxFNumber' : 'F Number', 'infoBoxISO' : 'ISO', 'infoBoxMake' : 'Make', 'infoBoxFlash' : 'Flash', 'infoBoxViews' : 'Views', 'infoBoxComments' : 'Comments'
      }
    }, options );


    return this.each(function(index) {
      g_save=jQuery(this)[0].outerHTML;
      g_containerDemo =jQuery('<div class="nanoGalleryDemo" style="padding:5px;"></div>').replaceAll(this);
      // var lstEffects=['none','scale120','scaleLabelOverImage','overScale','overScaleOutside','slideUp','slideDown','slideRight','slideLeft','rotateCornerBL','rotateCornerBR','','imageScale150','imageScaleIn80','imageScale150Outside','imageSplit4','imageSplitVert','imageSlideUp','imageSlideDown','imageSlideRight','imageSlideLeft','imageRotateCornerBL','imageRotateCornerBR','imageFlipHorizontal','imageFlipVertical','imageSlide2Up','imageSlide2Down','imageSlide2Left','imageSlide2Right','imageSlide2UpRight','imageSlide2UpLeft','imageSlide2DownRight','imageSlide2DownLeft','imageSlide2Random','',
      var lstEffects=['none','scale120','scaleLabelOverImage','overScale','overScaleOutside','slideUp','slideDown','slideRight','slideLeft','rotateCornerBL','rotateCornerBR','','imageScale150','imageScaleIn80','imageScale150Outside','imageSplit4','imageSplitVert','imageSlideUp','imageSlideDown','imageSlideRight','imageSlideLeft','imageRotateCornerBL','imageRotateCornerBR','imageFlipHorizontal','imageFlipVertical','',
              'labelAppear','labelAppear75','labelOpacity50','descriptionAppear','descriptionSlideUp','labelSlideUpTop','labelSlideUp','labelSlideDown','labelSplit4','labelSplitVert','labelAppearSplit4','labelAppearSplitVert','','borderLighter','borderDarker']
   
      var sHoverEffects=''
      for( var i=0; i< lstEffects.length; i++ ) {
        sHoverEffects+='<option style="color:#000">'+lstEffects[i]+'</option>';
      }
      var sThumbnailLabelPosition='<option style="color:#000">overImageOnBottom</option>';
      sThumbnailLabelPosition+='<option style="color:#000">overImageOnMiddle</option>';
      sThumbnailLabelPosition+='<option style="color:#000">overImageOnTop</option>';
      sThumbnailLabelPosition+='<option style="color:#000">onBottom</option>';

      var sGalleryColorScheme='<option style="color:#000">none</option>';
      sGalleryColorScheme+='<option style="color:#000">default</option>';
      //sGalleryColorScheme+='<option style="color:#000">dark</option>';
      sGalleryColorScheme+='<option style="color:#000">darkRed</option>';
      sGalleryColorScheme+='<option style="color:#000">darkGreen</option>';
      sGalleryColorScheme+='<option style="color:#000">darkBlue</option>';
      sGalleryColorScheme+='<option style="color:#000">darkOrange</option>';
      sGalleryColorScheme+='<option style="color:#000">light</option>';
      sGalleryColorScheme+='<option style="color:#000">lightBackground</option>';
      
      var sViewerColorScheme='<option style="color:#000">none</option>';
      sViewerColorScheme+='<option style="color:#000">default</option>';
      sViewerColorScheme+='<option style="color:#000">dark</option>';
      sViewerColorScheme+='<option style="color:#000">darkRed</option>';
      sViewerColorScheme+='<option style="color:#000">darkGreen</option>';
      sViewerColorScheme+='<option style="color:#000">darkBlue</option>';
      sViewerColorScheme+='<option style="color:#000">darkOrange</option>';
      sViewerColorScheme+='<option style="color:#000">light</option>';

      var sCSS='<option style="color:#000">default</option>';
      sCSS+='<option style="color:#000">clean</option>';
      sCSS+='<option style="color:#000">light</option>';

      var sBColor='<option style="color:#000">light</option>';
      sBColor+='<option style="color:#000">dark</option>';
      
      var sPanel='<div style="line-height:normal;margin:10px auto 30px auto;text-align:center;border:1px solid #555;background:#000;padding:5px;font-size:1.2em;"><span style="color:#d3d3d3;">nano</span><span style="color:#6e6;">GALLERY</span><span style="color:#d3d3d3;"> - demonstration panel</span></div>';

      sTRStyle=' style="padding:0px !important;" ';
      sTDStyle=' style="padding:0px !important;" ';
      
      sPanel+='<table>';
      sPanel+='<tbody>';
      sPanel+='<tr'+sTRStyle+'>';
        sPanel+='<td'+sTDStyle+'>';
          sPanel+='<b>Thumbnail hover effects:</b>&nbsp;';
        sPanel+='</td>';
        sPanel+='<td'+sTDStyle+'>';
          sPanel+='<select name="lHoverEffect1" style="color:#000">'+sHoverEffects+'</select>';
        sPanel+='</td>';
        sPanel+='<td'+sTDStyle+'>';
          sPanel+='<select name="lHoverEffect2" style="color:#000">'+sHoverEffects+'</select>';
        sPanel+='</td>';
        sPanel+='<td'+sTDStyle+'>';
          sPanel+='<select name="lHoverEffect3" style="color:#000">'+sHoverEffects+'</select></div>';
        sPanel+='</td>';
      sPanel+='</tr'+sTRStyle+'>';
      sPanel+='<tr>';
        sPanel+='<td'+sTDStyle+'>';
          // sPanel+='&nbsp;&nbsp;&nbsp;*: requires Transit plugin';
        sPanel+='</td>';
        sPanel+='<td'+sTDStyle+'>';
        sPanel+='</td>';
        sPanel+='<td'+sTDStyle+'>';
        sPanel+='</td>';
        sPanel+='<td>';
        sPanel+='</td'+sTDStyle+'>';
      sPanel+='</tr>';
      sPanel+='<tr'+sTRStyle+'>';
        sPanel+='<td'+sTDStyle+'>';
          sPanel+='<b>Thumbnail size (w/h):</b>';
        sPanel+='</td>';
        sPanel+='<td'+sTDStyle+'>';
          sPanel+='<input type="text" name="thumbWidth" value="120" style="width:50px;color:#000">';
        sPanel+='</td>';
        sPanel+='<td'+sTDStyle+'>';
          sPanel+='<input type="text" name="thumbHeight" value="120" style="width:50px;color:#000">';
        sPanel+='</td>';
        sPanel+='<td'+sTDStyle+'>';
        sPanel+='</td>';
      sPanel+='</tr>';
      sPanel+='<tr'+sTRStyle+'>';
        sPanel+='<td'+sTDStyle+'>';
          sPanel+='<b>Thumbnail label: </b>';
        sPanel+='</td>';
        sPanel+='<td'+sTDStyle+'>';
          sPanel+='<select name="lThumbnailLabelPosition" style="color:#000">'+sThumbnailLabelPosition+'</select>';
        sPanel+='</td>';
        sPanel+='<td'+sTDStyle+'>';
          sPanel+='<input type="checkbox" name="thumbnailLabelDisplay" value="true" checked style="margin:0"> Display label';
        sPanel+='</td>';
        sPanel+='<td'+sTDStyle+'>';
          sPanel+='<input type="checkbox" name="thumbnailLabelDisplayDescription" value="true" checked style="margin:0"> Display description';
        sPanel+='</td>';
      sPanel+='</tr>';
      sPanel+='<tr'+sTRStyle+'>';
        sPanel+='<td'+sTDStyle+'>';
          sPanel+='<b>Gallery color scheme:</b>';
        sPanel+='</td>';
        sPanel+='<td'+sTDStyle+'>';
          sPanel+='<select name="lGalleryColorScheme" style="color:#000">'+sGalleryColorScheme+'</select>';
        sPanel+='</td>';
        sPanel+='<td'+sTDStyle+'>';
          sPanel+='<b>Image color scheme:</b> ';
        sPanel+='</td>';
        sPanel+='<td'+sTDStyle+'>';
          sPanel+='<select name="lViewerColorScheme" style="color:#000">'+sViewerColorScheme+'</select>';
        sPanel+='</td>';
      sPanel+='</tr>';
      sPanel+='<tr'+sTRStyle+'>';
        sPanel+='<td'+sTDStyle+'>';
          sPanel+='<b>Theme:</b> ';
        sPanel+='</td>';
        sPanel+='<td'+sTDStyle+'>';
          sPanel+='<select name="lCSS" style="color:#000">'+sCSS+'</select>';
        sPanel+='</td>';
        sPanel+='<td'+sTDStyle+'>';
          sPanel+='<b>Background color</b>:';
        sPanel+='</td>';
        sPanel+='<td'+sTDStyle+'>';
          sPanel+='<select name="lBColor" style="color:#000">'+sBColor+'</select>';
        sPanel+='</td>';
      sPanel+='</tr>';
      sPanel+='</tbody>';
      sPanel+='</table>';
      

      sPanel+='<div style="display:table;margin:auto;"><button name="bGo" "type="button" style="color:#000;padding:5px 15px;margin:5px;">--> Launch</button></div>';

      sPanel+='<hr style="margin:0px;"><div style="display:table;margin:15px auto;text-align:center;">';
      sPanel+='<button name="bPreset1" "type="button" style="color:#000;padding:4px;">&nbsp; Preset 1 &nbsp;</button>';
      sPanel+='<button name="bPreset2" type="button" style="color:#000;padding:4px;">&nbsp; Preset 2 &nbsp;</button>';
      sPanel+='<button name="bPreset3" type="button" style="color:#000;padding:4px;">&nbsp; Preset 3 &nbsp;</button>';
      sPanel+='<button name="bPreset4" type="button" style="color:#000;padding:4px;">&nbsp; Preset 4 &nbsp;</button>';
      sPanel+='<button name="bPreset5" type="button" style="color:#000;padding:4px;">&nbsp; Preset 5 &nbsp;</button></div>';
      g_containerDemoPanel=jQuery(g_containerDemo).append('<div class="nanoGalleryDemoPanel" style="display:table;border:2px solid #666;background:#ccc;margin:10px auto;padding:5px;font-size:0.8em;">'+sPanel+'</div>');

      g_containerNew=jQuery(g_save).appendTo(g_containerDemo);
      jQuery(g_containerDemoPanel).find('[name=lHoverEffect1]').val('labelAppear75');


      settings.thumbnailHoverEffect='labelAppear75';
      var nanoGALLERY_obj = jQuery(g_containerNew).nanoGallery(settings);

      jQuery(g_containerDemoPanel).find('button[name=bGo]').on("click",function(){
        runDemo();
      });
      
      jQuery(g_containerDemoPanel).find('button[name=bPreset1]').on("click",function(){
        setPreset('borderLighter','imageSlideRight','none','overImageOnBottom',true,true,'dark');
      });
      jQuery(g_containerDemoPanel).find('button[name=bPreset2]').on("click",function(){
        setPreset('labelAppear75','imageScale150*','borderLighter','overImageOnBottom',true,true,'dark');
      });
      jQuery(g_containerDemoPanel).find('button[name=bPreset3]').on("click",function(){
        setPreset('imageScale150*','labelSlideUp','none','overImageOnBottom',true,false,'dark');
      });
      jQuery(g_containerDemoPanel).find('button[name=bPreset4]').on("click",function(){
        setPreset('imageSplitVert','none','none','overImageOnBottom',true,false,'light');
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
        //settings.thumbnailHoverEffect.push({'name':sTHE,'duration':200,'durationBack':200,'easing':'swing','easingBack':'swing'});
        settings.thumbnailHoverEffect.push({'name':sTHE});
      }
      sTHE=jQuery(g_containerDemoPanel).find('[name=lHoverEffect2] option:selected').text();
      if( sTHE != 'none' && sTHE != '' ) {
        sTHE=sTHE.replace('*', '');
        //settings.thumbnailHoverEffect.push({'name':sTHE,'duration':200,'durationBack':200,'easing':'swing','easingBack':'swing'});
        settings.thumbnailHoverEffect.push({'name':sTHE});
      }
      sTHE=jQuery(g_containerDemoPanel).find('[name=lHoverEffect3] option:selected').text();
      if( sTHE != 'none' && sTHE != '' ) {
        sTHE=sTHE.replace('*', '');
        //settings.thumbnailHoverEffect.push({'name':sTHE,'duration':200,'durationBack':200,'easing':'swing','easingBack':'swing'});
        settings.thumbnailHoverEffect.push({'name':sTHE});
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

      //settings.thumbnailLabel.position=jQuery(g_containerDemoPanel).find('input[name=thumbnailLabelPosition]:checked',g_containerDemoPanel).val();
      settings.thumbnailLabel.position=jQuery(g_containerDemoPanel).find('[name=lThumbnailLabelPosition] option:selected').text();

      settings.thumbnailLabel.display=jQuery(g_containerDemoPanel).find('[name=thumbnailLabelDisplay]').prop('checked');
      settings.thumbnailLabel.displayDescription=jQuery(g_containerDemoPanel).find('[name=thumbnailLabelDisplayDescription]').prop('checked');

      settings.colorScheme=jQuery(g_containerDemoPanel).find('[name=lGalleryColorScheme] option:selected').text();
      settings.colorSchemeViewer=jQuery(g_containerDemoPanel).find('[name=lViewerColorScheme] option:selected').text();

      settings.theme=jQuery(g_containerDemoPanel).find('[name=lCSS] option:selected').text();
      
      if( jQuery(g_containerDemoPanel).find('[name=lBColor] option:selected').text() == 'dark' ) {
        jQuery(g_containerDemoPanel).css('background','#222');
      }
      else {
        jQuery(g_containerDemoPanel).css('background','#eee');
      }
      
      jQuery(g_containerNew).animate({opacity: 0,height:0},200).promise().done(function(){
      jQuery(g_containerNew).remove();
        g_containerNew=jQuery(g_save).appendTo(g_containerDemo);
        var nanoGALLERY_obj = jQuery(g_containerNew).nanoGallery(settings);

      });
    }
  };

}( jQuery ));
  
  
