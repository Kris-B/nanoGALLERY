<?php
/**
* nanoGALLERY_JSON add-on for nanoGALLERY
*
* Publish a folder/content structure in JSON for albums and images to be displayed with the jQuery plugin nanoGALLERY.
* This is an add-on for nanoGALLERY.
* 
* License: For personal, non-profit organizations, or open source projects (without any kind of fee), you may use nanoGALLERY for free. 
* -------- ALL OTHER USES REQUIRE THE PURCHASE OF A PROFESSIONAL LICENSE.
*
*
* PHP 5.2+
* @version    0.1.0
* @author     Christophe BRISBOIS - http://www.brisbois.fr/
* @copyright  Copyright 2014
* @license    CC BY-NC 3.0
* @link       https://github.com/Kris-B/nanoGALLERY
*
*/


  // comment next line to enable warnings
  error_reporting(E_ERROR | E_PARSE);

  class nanogalleryData {
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

  class nanogalleryJSON {

    function __construct() {
    
      // Retrieve an album's thumbnail (folder)
      function GetAlbumThumbnail( $baseFolder ) {

        // look for thumbnail containing the album thumbnail detector string
        if( is_dir( $baseFolder.'/_thumbnails' ) ) {
          $files = glob($baseFolder.'/_thumbnails/'.$GLOBALS['albumThumbnailDetector'].'*.*');
          if( count($files) > 0 ) {
            return '_thumbnails/'.basename($files[0]);
          }
        }
        
        // fallback 1: use first found thumbnail in thumbnails folder
        if( is_dir( $baseFolder.'/_thumbnails' ) ) {
          $i=GetFirstFileFolder( $baseFolder.'/_thumbnails' );
          if( $i != '' ) {
          return '_thumbnails/'.$i;
          }
        }
        
        // fallback 2: use first found image in images folder
        if( is_dir( $baseFolder.'/_images' ) ) {
          return GetFirstFileFolder( $baseFolder.'_images' );
        }
      }

      
      // Retrieve the first image of one folder --> ALBUM THUMBNAIL
      function GetFirstFileFolder( $folder ) {
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
      
      
      // Extract title and description from filename
      function GetTitleDesc( $filename, $isImage ) {
        $oneItem = new item();
        if( strpos($filename,$GLOBALS['titleDescSeparator']) > 0 ) {
          $s=explode($GLOBALS['titleDescSeparator'],$filename);
          $oneItem->title=utf8_encode($s[0]);
          if( $isImage ) {
            $oneItem->description=utf8_encode(preg_replace('/.[^.]*$/', '', $s[1]));
          }
          else {
            $oneItem->description=utf8_encode($s[1]);
          }
        }
        else {
          if( $isImage ) {
            $oneItem->title=utf8_encode(preg_replace('/.[^.]*$/', '', $filename));
          }
          else {
            $oneItem->title=utf8_encode($filename);
          }
        }
        return $oneItem;

      }
      

      // retrieve the album ID in the URL
      $album='/';
      $albumID=$_GET["albumID"];
      if( !$albumID == '0' && $albumID != '' ) {
        $album='/'.utf8_decode(urldecode($albumID)).'/';
      }

      $data = new nanogalleryData();
      $data->fullDir= __DIR__.'/ngcontent'.($album);

      $config = parse_ini_file( __DIR__.'/nanoGALLERY_JSON.cfg' );
      $GLOBALS['fileExtensions'] = $config['images'];
      $GLOBALS['sortOrder'] = strtoupper($config['sortOrder']);
      $GLOBALS['titleDescSeparator'] = strtoupper($config['titleDescSeparator']);
      $GLOBALS['albumThumbnailDetector'] = strtoupper($config['albumThumbnailDetector']);
      
      $lstImages = array();
      $lstAlbums = array();

      
      $dh = opendir($data->fullDir);
      // loop folder
      if( $dh != false ) {
        while (false !== ($filename = readdir($dh))) {

          if ( $filename != '.' && $filename != '..' ) {

            if ( is_dir($data->fullDir.$filename) ) {

              if ( $filename == '_images' ) {
                
                // CONTENT OF THE FOLDER --> IMAGES and THUMBNAILS
                $di = $data->fullDir.'_images';
                $dih = opendir( $di );
                while (false !== ($image = readdir($dih))) {
                
                  if ( is_file( $di.'/'.$image ) && preg_match("/\.(". $GLOBALS['fileExtensions'] .")*$/i", $image) ) {
                    $oneItem = new item();
                    // $oneItem->src=rawurlencode(utf8_encode('ngcontent'.$album.'_images/'.$image));
                    $oneItem->src=rawurlencode(('ngcontent'.$album.'_images/'.$image));
                    
                    $tn = $data->fullDir.'_thumbnails/'.$image;
                    if( file_exists($tn) ) {
                      // $oneItem->srct=rawurlencode(utf8_encode('ngcontent'.$album.'_thumbnails/'.$image));
                      $oneItem->srct=(rawurlencode('ngcontent'.$album.'_thumbnails/'.$image));
                    }
                    else {
                      $tn = $data->fullDir.'_thumbnails/'.$GLOBALS['albumThumbnailDetector'].$image;
                      if( file_exists($tn) ) {
                        // $oneItem->srct=rawurlencode(utf8_encode('ngcontent'.$album.'_thumbnails/'.$GLOBALS['albumThumbnailDetector'].$image));
                        $oneItem->srct=(rawurlencode('ngcontent'.$album.'_thumbnails/'.$GLOBALS['albumThumbnailDetector'].$image));
                      }
                      else {
                        // fallback: use image if thumbnail not found
                        $tn='ngcontent'.$album.'_images/'.$image;
                        $oneItem->srct=$oneItem->src;
                      }
                    }
                    $size = getimagesize($tn);
                    $oneItem->imgtWidth=$size[0];
                    $oneItem->imgtHeight=$size[1];

                    $oneItem->albumID=$albumID;
                    
                    $e=GetTitleDesc($image, true);
                    $oneItem->title=$e->title;
                    $oneItem->description=$e->description;
                    
                    $lstImages[] = $oneItem;
                  }
                }
                closedir( $dih );
              }
              else
                if ( $filename == '_thumbnails' ) {
                  // THUMBNAIL FOLDER --> ignore
                }
                else {
                  // ALBUMS
                  $oneItem = new item();
                  $oneItem->kind='album';

                  $e=GetTitleDesc($filename, false);
                  $oneItem->title=$e->title;
                  $oneItem->description=$e->description;
                  
                  $oneItem->albumID=$albumID;
                  if( $albumID == '0' || $albumID == '' ) {
                    $oneItem->ID=rawurlencode(utf8_encode($filename));
                  }
                  else {
                    $oneItem->ID=$albumID.rawurlencode(utf8_encode('/'.$filename));
                  }
                  
                  $s= GetAlbumThumbnail( $data->fullDir.$filename );

                  $t='';
                  if( $albumID == '0' || $albumID == '' ) {
                    $t=$filename;
                  }
                  else {
                    $t=$album.'/'.$filename;
                  }
                  // $oneItem->srct=rawurlencode(utf8_encode('/ngcontent/'.$t.'/'.$s));
                  $oneItem->srct=rawurlencode(('/ngcontent/'.$t.'/'.$s));
                  
                  $lstAlbums[] = $oneItem;

                }
              
            }
          }
        }
        closedir( $dh );
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
      
      // sort data
      usort($lstAlbums, "compare");
      usort($lstImages, "compare");
      
      header('Content-Type: application/json; charset=utf-8');

      // return the data
      $callback = $_GET['jsonp'];
      $output = json_encode( array_merge($lstAlbums, $lstImages) );
      if (isset($callback)) {
        echo $callback . '(' . $output . ')';     // return JSONP
      }
      else {
        echo $output;                             // return JSON
      }
    }

  }

  $t = new nanogalleryJSON();

  exit;
?>