<?php
/**
* galleryJSON add-on for nanoGALLERY (or other image galleries)
*
* This is an add-on for nanoGALLERY (image gallery for jQuery - http://nanogallery.brisbois.fr).
* This PHP application will publish your images and albums from a webserver to nanoGALLERY.
* The content is provided on demand, one album at one time.
* Thumbnails are generated automatically.
* 
* License: For personal, non-profit organizations, or open source projects (without any kind of fee), you may use nanoGALLERY for free. 
* -------- ALL OTHER USES REQUIRE THE PURCHASE OF A PROFESSIONAL LICENSE.
*
*
* PHP 5.2+
* @version    0.2.0
* @author     Christophe BRISBOIS - http://www.brisbois.fr/
* @copyright  Copyright 2014
* @license    CC BY-NC 3.0
* @link       https://github.com/Kris-B/galleryJSON
* @Support    https://github.com/Kris-B/galleryJSON/issues
*
*/


  include 'galleryJSON.Encoding.php';

  // Comment next line to enable warnings (only for debugging purposes)
  error_reporting(E_ERROR | E_PARSE);

  class galleryData {
    var $fullDir='';
    //var $images;
    //var $URI;
  }

  class item {
    var $src='';
    var $srct='';
    var $title='';
    var $description='';
    var $ID='';
    var $albumID='0';
    var $kind='';      // album
  }

  
  class galleryJSON {

    function __construct() {
    
      // RETRIEVE THE COVER IMAGE (THUMBNAIL) OF ONE ALBUM (FOLDER)
      function GetAlbumCover( $baseFolder ) {

        // look for cover image
        $files = glob($baseFolder.'/'.$GLOBALS['albumCoverDetector'].'*.*');
        if( count($files) > 0 ) {
          $i=basename($files[0]);
          if( preg_match("/\.(".$GLOBALS['fileExtensions'].")*$/i", $i) ) {
            $tn=GetThumbnail( $baseFolder, $i);
            if( $tn != '' ) {
              return $tn;
            }
          }
        }
        
        // no cover image found --> use the first image for the cover
        $i=GetFirstImageFolder( $baseFolder );
        if( $i != '' ) {
          $tn=GetThumbnail( $baseFolder, $i);
          if( $tn != '' ) {
            return $tn;
          }
        }
        
        return '';
      }

      
      // Retrieve the first image of one folder --> ALBUM THUMBNAIL
      function GetFirstImageFolder( $folder ) {
        $image='';

        $dh = opendir($folder);
        while (false !== ($filename = readdir($dh))) {
          if ( is_file( $folder.'/'.$filename ) && preg_match("/\.(".$GLOBALS['fileExtensions'].")*$/i", $filename) ) {
            $image=$filename;
            break;
          }
        }
        closedir( $dh );
        
        return $image;
      }
      
      // RETRIEVE ONE IMAGE'S THUMBNAIL
      function GetThumbnail( $baseFolder, $filename ) {
        $tn = $baseFolder.'_thumbnails/'.$filename;
      
        if( file_exists($tn) ) {
          //if( filemtime($tn) < filemtime($baseFolder.$filename) ) {
            // image file is older as the thumbnail file
            return '_thumbnails/'.$filename;
          //}
        }
        
        // generate the thumbnail
        $tn=GenerateThumbnail( $baseFolder, $filename);
        if( $tn != '' ) {
          return $tn;
        }
        
        // fallback: original image (no thumbnail)
        return $filename;
      }
      
      
      // GENERATE ONE THUMBNAIL
      function GenerateThumbnail( $baseFolder, $filename) {
        if( !$GLOBALS['thumbnailsGenerate'] ) {
          return '';
        }
        
        $td = $baseFolder.'/_thumbnails';
          if( !file_exists($td) ) {
            mkdir($td, 0777, true);
        }
        //$orgImage = imagecreatefromjpeg($baseFolder.'/'.$filename);
        
        $size=getimagesize($baseFolder.'/'.$filename);
        switch($size['mime']){
          case 'image/jpeg':
            $orgImage = imagecreatefromjpeg($baseFolder.'/'.$filename);
            break;
          case 'image/gif':
            $orgImage = imagecreatefromgif($baseFolder.'/'.$filename);
            break;
          case 'image/png':
            $orgImage = imagecreatefrompng($baseFolder.'/'.$filename);
            break;
          default:
            return '';
          break;
        }
        $width = $size[0];
        $height = $size[1];
        
        $tnFilename = $baseFolder.'/_thumbnails/'.$filename; 
        $thumbWidth = $GLOBALS['thumbnailSizes']['width'];
        $thumbHeight = $GLOBALS['thumbnailSizes']['height'];
	
        $originalAspect = $width / $height;
        $thumbAspect = $thumbWidth / $thumbHeight;
	
        if( $GLOBALS['thumbnailSizes']['crop'] ) {
          // CROP THE IMAGE
          // some inspiration found in donkeyGallery (from Gix075) https://github.com/Gix075/donkeyGallery 
          if( $originalAspect >= $thumbAspect ) {
            // If image is wider than thumbnail (in aspect ratio sense)
            $newHeight = $thumbHeight;
            $newWidth = $width / ($height / $thumbHeight);
          }
          else {
            // If the thumbnail is wider than the image
            $newWidth = $thumbWidth;
            $newHeight = $height / ($width / $thumbWidth);
          }
    
          $thumb = imagecreatetruecolor( $thumbWidth, $thumbHeight );
    
          // Resize and crop
          imagecopyresampled($thumb, $orgImage,
                     0 - ($newWidth - $thumbWidth) / 2,     // dest_x: Center the image horizontally
                     0 - ($newHeight - $thumbHeight) / 2,   // dest-y: Center the image vertically
                     0, 0,                                  // src_x, src_y
                     $newWidth, $newHeight,
                     $width, $height);
        }
        else {
          // DO NOT CROP
          if( $originalAspect >= $thumbAspect ) {
            $newHeight = $height / $width * $thumbWidth;
            $newWidth = $thumbWidth;
          }
          else {
            $newWidth = $width / $height * $thumbHeight;
            $newHeight = $thumbHeight;
          }
    
          $thumb = imagecreatetruecolor( $newWidth, $newHeight );
    
          // Resize
          imagecopyresampled($thumb, $orgImage, 0, 0, 0, 0, $newWidth, $newHeight, $width, $height);
        }
        
        switch($size['mime']){
          case 'image/jpeg':
            imagejpeg($thumb, $tnFilename, 90);
            break;
          case 'image/gif':
            imagegif($thumb, $tnFilename);
            break;
          case 'image/png':
            imagepng($thumb, $tnFilename, 1);
            break;
        }

        return '_thumbnails/'.$filename;

      }

      
      // Extract title and description from filename
      function GetTitleDesc( $filename, $isImage ) {
        if( $isImage ) {
          $filename = file_ext_strip($filename);
        }
      
        $oneItem = new item();
        if( strpos($filename, $GLOBALS['titleDescSeparator']) > 0 ) {
          // title and description
          $s = explode($GLOBALS['titleDescSeparator'],$filename);
          $oneItem->title = CustomEncode($s[0]);
          if( $isImage ) {
            $oneItem->description = CustomEncode(preg_replace('/.[^.]*$/', '', $s[1]));
          }
          else {
            $oneItem->description = CustomEncode($s[1]);
          }
        }
        else {
          // only title
          if( $isImage ) {
            $oneItem->title = CustomEncode($filename);  //(preg_replace('/.[^.]*$/', '', $filename));
          }
          else {
            $oneItem->title = CustomEncode($filename);
          }
          $oneItem->description = '';
        }
        
        $oneItem->title = str_replace($GLOBALS['albumCoverDetector'], '', $oneItem->title);   // filter cover detector string
        return $oneItem;

      }
      
      // Returns only the file extension (without the period).
      function file_ext($filename) {
        if( !preg_match('/./', $filename) ) return '';
        return preg_replace('/^.*./', '', $filename);
      }
      // Returns the file name, less the extension.
      function file_ext_strip($filename){
        return preg_replace('/.[^.]*$/', '', $filename);
      }
      
      
      function CustomEncode( $s ) {
        return \ForceUTF8\Encoding::toUTF8(($s));
        //return \ForceUTF8\Encoding::fixUTF8(($s));
      }
      
      function CustomDecode( $s ) {
        return utf8_decode($s);
        // return $s;
      }
      
      function compare($a, $b) {
        $al = strtolower($a->title);
        $bl = strtolower($b->title);
        if ($al == $bl) {
            return 0;
        }
        $b=false;
        switch ( $GLOBALS['sortOrder'] ) {
          case 'DESC' :
            if( $al < $bl ) { $b = true; }
            break;
          case 'ASC':
          default:
            if( $al > $bl ) { $b = true; }
            break;
        }
        return ($b) ? +1 : -1;
      }


      // retrieve the album ID in the URL
      $album = '/';
      $albumID = '';
      if( isset($_GET['albumID']) ) {
        $albumID = $_GET['albumID'];
      }
      if( !$albumID == '0' && $albumID != '' && $albumID != null ) {
        // $album='/'.utf8_decode(urldecode($albumID)).'/';
        $album = '/'.CustomDecode($albumID).'/';
      }
      else {
        $albumID = '0';
      }

      $data = new galleryData();
      $data->fullDir = __DIR__.'/ngcontent'.($album);

      // read configuration
      $config = parse_ini_file( './galleryJSON.cfg', true );
      $GLOBALS['fileExtensions'] = $config['config']['fileExtensions'];
      $GLOBALS['sortOrder'] = strtoupper($config['config']['sortOrder']);
      $GLOBALS['titleDescSeparator'] = strtoupper($config['config']['titleDescSeparator']);
      $GLOBALS['albumCoverDetector'] = strtoupper($config['config']['albumCoverDetector']);
      $GLOBALS['albumBlackListDetector'] = strtoupper($config['config']['albumBlackListDetector']);


      if( isset($config['thumbnailSizes']['width']) && isset($config['thumbnailSizes']['height']) ) {
        $GLOBALS['thumbnailsGenerate'] = true;
        $GLOBALS['thumbnailSizes']['width'] = $config['thumbnailSizes']['width'];
        $GLOBALS['thumbnailSizes']['height'] = $config['thumbnailSizes']['height'];
        if( isset($config['thumbnailSizes']['crop']) ) {
          $GLOBALS['thumbnailSizes']['crop'] = $config['thumbnailSizes']['crop'];
        }
        else {
          $GLOBALS['thumbnailSizes']['crop'] = false;
        }
      }
      else {
        $GLOBALS['thumbnailsGenerate'] = false;
      }
      
      $lstImages = array();
      $lstAlbums = array();

      $dh = opendir($data->fullDir);
      // loop the folder to retrieve images and albums
      if( $dh != false ) {
        while( false !== ($filename = readdir($dh)) ) {
          if( $filename != '.' && $filename != '..' && $filename != '_thumbnails' && substr($filename, 0, strlen($GLOBALS['albumBlackListDetector'])) != $GLOBALS['albumBlackListDetector'] ) {

            if( is_file($data->fullDir.$filename) && preg_match("/\.(". $GLOBALS['fileExtensions'] .")*$/i", $filename) ) {
              // ONE IMAGE
              $oneItem = new item();

              $e = GetTitleDesc($filename, true);
              $oneItem->title = $e->title;
              $oneItem->description = $e->description;
              $oneItem->src = CustomEncode('ngcontent'.$album.'/'.$filename);
           
              $tn = GetThumbnail( $data->fullDir, $filename);
              $oneItem->srct = CustomEncode('ngcontent'.$album.$tn);
              $size = getimagesize($data->fullDir.$tn);
              $oneItem->imgtWidth = $size[0];
              $oneItem->imgtHeight = $size[1];

              $oneItem->albumID = $albumID;
              
              $lstImages[] = $oneItem;
            }
            else {
              // ONE ALBUM
              $oneItem = new item();
              $oneItem->kind = 'album';

              $e=GetTitleDesc($filename, false);
              $oneItem->title = $e->title;
              $oneItem->description = $e->description;
              
              $oneItem->albumID = $albumID;
              if( $albumID == '0' || $albumID == '' ) {
                $oneItem->ID = CustomEncode($filename);
              }
              else {
                $oneItem->ID = $albumID.CustomEncode('/'.$filename);
              }
              
              $s = GetAlbumCover( $data->fullDir.$filename.'/' );
              if( $s != '' ) {
                // a cover has been found
                $path='';
                if( $albumID == '0' ) {
                  $path = $filename;
                }
                else {
                  $path = $album.'/'.$filename;
                }
                $oneItem->srct = CustomEncode('/ngcontent/'.$path.'/'.$s);
                $size = getimagesize(__DIR__.'/ngcontent'.'/'.$path.'/'.$s);
                $oneItem->imgtWidth = $size[0];
                $oneItem->imgtHeight = $size[1];

                $lstAlbums[] = $oneItem;
              }
            }
          }
        }
        closedir( $dh );
      }
      
      // sort data
      usort($lstAlbums, 'compare');
      usort($lstImages, 'compare');

      // return the data
      header('Content-Type: application/json; charset=utf-8');
      $output = json_encode( array_merge($lstAlbums, $lstImages) );     // accept only UTF-8 encoding
      if( isset($_GET['jsonp']) ) {
        // return in JSONP
        echo $_GET['jsonp'] . '(' . $output . ')';
      }
      else {
        // return in JSON
        echo $output;
      }
    }

  }

  $t = new galleryJSON();

  exit;
?>