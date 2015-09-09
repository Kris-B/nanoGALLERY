/**!
 * @preserve nanoGALLERY PORTABLE v1.0.0
 * by Christophe Brisbois
 * Demo: http://nanogallery.brisbois.fr
 */



/*!
* domready (c) Dustin Diaz 2014 - License MIT
*/
!function (name, definition) {

  if (typeof module != 'undefined') module.exports = definition()
  else if (typeof define == 'function' && typeof define.amd == 'object') define(definition)
  else this[name] = definition()

}('domready', function () {

  var fns = [], listener
    , doc = document
    , domContentLoaded = 'DOMContentLoaded'
    , loaded = /^loaded|^i|^c/.test(doc.readyState)

  if (!loaded)
  doc.addEventListener(domContentLoaded, listener = function () {
    doc.removeEventListener(domContentLoaded, listener)
    loaded = 1
    while (listener = fns.shift()) listener()
  })

  return function (fn) {
    loaded ? fn() : fns.push(fn)
  }
});



// ################################
// ##### nanoGALLERY PORTABLE #####
// ################################

var baseURL='http://nanogallery.brisbois.fr/';
//var baseURL='./';

(function nanoGalleryPortable() {

  function myjQueryScript(){
    //Your jQuery Codes Here
    var m = document.getElementsByTagName('script')[0];
    var s1 = document.createElement('script');
    //s2.async = 0;
    s1.src = baseURL+'third.party/imagesloaded/imagesloaded.pkgd.min.js';
    m.parentNode.insertBefore(s1, m);
    var s2 = document.createElement('script');
    //s2.async = 0;
    s2.src = baseURL+'jquery.nanogallery.js';
    m.parentNode.insertBefore(s2, m);

    // remove start place holder
    jQuery("#nanoGALLERYPORTABLE").html('');
    
    var tid = setInterval( function () {
      // wait until nanoGALLERY is loaded
      if( !jQuery.fn.nanoGallery ){ return; }
        clearInterval( tid );       
        var t= window['nanogalleryPortable'] ;
        jQuery("#nanoGALLERYPORTABLE").nanoGallery(t);
        return;
    }, 100 );

    
/*    jQuery(document).ready(function () {
      var t= window['nanogalleryPortable'] ;
      jQuery("#nanoGALLERYPORTABLE").nanoGallery(t);
    });
*/
  }

  // add CSS file
  var t=window['nanogalleryPortable'].theme;
  var src='';
  switch( t ) {
    case 'light':
      src=baseURL+'css/themes/light/nanogallery_light.css';
      break;
    case 'clean':
      src=baseURL+'css/themes/clean/nanogallery_clean.css';
      break;
    default:
      src=baseURL+'css/nanogallery.css';
      break;
  }
  var m=document.getElementsByTagName('script')[0];
  var cs=document.createElement('link');
  cs.type='text/css';
  cs.href=src;
  cs.rel="stylesheet";
  m.parentNode.insertBefore(cs, m);


  domready(function () {
    // dom is loaded!

    // Only do anything if jQuery isn't defined
    if (typeof jQuery == 'undefined') { 
      if (typeof $ == 'function') {
        // warning, global var
        var thisPageUsingOtherJSLibrary = true;
      }
      
      function getScript(url, success) {
        var script = document.createElement('script');
        script.src = url;
        var head = document.getElementsByTagName('head')[0],
        done = false;
        // Attach handlers for all browsers
        script.onload = script.onreadystatechange = function() {
          if (!done && (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete')) {
          done = true;
            //console.log('done=true; callback function provided as param');
            success();
            script.onload = script.onreadystatechange = null;
            head.removeChild(script);
          };
        };
        head.appendChild(script);
      };
      
      getScript('http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js', function() {
        if (typeof jQuery=='undefined') {
          //console.log('Super failsafe - still somehow failed...');
        } else {
          //console.log('jQuery loaded! Make sure to use .noConflict just in case');
          if (thisPageUsingOtherJSLibrary) {
            //console.log('Run your jQuery Code');
            myjQueryScript();
          } else {
            //console.log('Use .noConflict(), then run your jQuery Code');
            myjQueryScript();
          }
        }
      });
    } else { // jQuery was already loaded
        //console.log('Run your jQuery Code');
        myjQueryScript();
    };
  })

})();
 
