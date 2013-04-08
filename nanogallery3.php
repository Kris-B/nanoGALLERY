<?php
/*
Plugin Name: nanoGallery
Description: Ajax Image Gallery. Displays images stored in Picasa/Google+
Version: 3.0
Author: Christophe Brisbois
Author URI: http://www.brisbois.fr/
*/

# get correct id for plugin
$thisfile=basename(__FILE__, ".php");

# register plugin
register_plugin(
	$thisfile, 						//Plugin id
	'nanoGallery', 					//Plugin name
	'3.0', 							//Plugin version
	'Christophe Brisbois',  		//Plugin author
	'http://www.brisbois.fr/', 		//author website
	'<b>Ajax Image Gallery.</b><br> Displays images stored in Picasa/Google+', //Plugin description
	'pages', 						//page type - on which admin tab to display
	'nanoGallery_show'  			//main function (administration)
);

# activate filter 
add_filter('content','nanoGallery'); 
add_action('index-pretemplate','nanoGallery_check'); 
queue_script('jquery', GSFRONT);

class nanoGallerySettings {
    var $_userID='';
	var $_displayCaption=false;
	var $_consistencyError='';

	// check the consistency of the parameters
	public function checkConsistency() {
	return true;
		if( !empty($this->_userID)  ) {
			return true;
		}

//		if( $this->_stringFound ) {
//			$this->_consistencyError='Incorrect parameters for nanoSlider. Please check the settings in your page.';
//			return false;
//		}
		$this->_consistencyError='Incorrect parameters for nanoGallery. Please check the settings in your page.';
		return false;
		
	}

	
	// build the parameter string to pass to the javascript
	public function jsParams() {
		$s="{";
		if( !empty($this->_userID) ) { $s.="'userID':'".$this->_userID."',"; } 
		if( !empty($this->_displayCaption) ) { $s.="'displayCaption':'".$this->_displayCaption."',"; } 
		
		if ( strlen($s) == 1 ) { return ""; }

		$s=substr($s,0,strlen($s)-1)."}";
		return $s;
	}
}

class nanoGalleryParsedContent {
	var $_nanoGallerySettings;
	var $_newContent='';
	
	function __construct($content) {
		$this->_nanoGallerySettings=array();
		$this->_newContent=$content;
		$ok=true;
		do{
			$ok=$this->parseContent();
		} while( $ok );
	}
	
	function parseContent() {
		$p1 = strpos($this->_newContent, '(%nanogallery');
		if ( $p1 === false ){  return false; };
		$p2= strpos($this->_newContent, '%)', $p1+2);
		if ( $p2 === false ){  return false; };

		$n=count($this->_nanoGallerySettings);
		$this->_nanoGallerySettings[$n]=new nanoGallerySettings();
		//$tmp=strtolower(substr($this->_newContent, $p1+13, $p2-$p1-13));
		$tmp=substr($this->_newContent, $p1+13, $p2-$p1-13);
		// replace the settings with the DIV container in the page
		$this->_newContent=substr($this->_newContent,0,$p1)."<div id='nanoGallery".$n."' class='nanoGallery'></div>".substr($this->_newContent,$p2+2);

		$tmp=html_entity_decode($tmp);
		$tmp=str_replace('<p>','',$tmp);
		$tmp=str_replace('</p>','',$tmp);
		$tmp=str_replace('&amp;','&',$tmp);
		$tmp=str_replace('\"','"',$tmp);
		$tmp=str_replace(array("\t", "\n", "\r"),'',$tmp);
		parse_str($tmp,$fields);

		// get parameters value
		if( isset($fields['userID']) ) { $this->_nanoGallerySettings[$n]->_userID=$fields['userID']; }
		if( isset($fields['displayCaption']) ) { $this->_nanoGallerySettings[$n]->_displayCaption=$fields['displayCaption']; }

		return true;
	}

}


function nanoGallery_check() {
    global $data_index;	
	if (strpos($data_index->content, '(%nanogallery') === false ){  return false; };
	add_action('theme-header','nanoGallery_header');
};

function nanoGallery_header() {
    
    global $data_index;	

	if (strpos($data_index->content, '(%nanogallery') === false ){  return false; };
	$mp = new nanoGalleryParsedContent($data_index->content);

	
    $tmpContent='<link href="'.$SITEURL.'/plugins/nanogallery3/css/nanogallery.css" rel="stylesheet" type="text/css">'."\n";
    $tmpContent.='<script type="text/javascript" src="'.$SITEURL.'/plugins/nanogallery3/js/nanogallery.js"></script>'."\n";
    $tmpContent.='<script type="text/javascript" src="'.$SITEURL.'/plugins/nanogallery3/js/jquery.color-2.1.1.min.js"></script>'."\n";
	
    $tmpContent.='<link type="text/css" href="'.$SITEURL.'/plugins/nanogallery3/fancybox/jquery.fancybox.css?v=2.1.4" rel="stylesheet">'."\n";
	$tmpContent.="<script type='text/javascript' src='".$SITEURL."/plugins/nanogallery3/fancybox/jquery.fancybox.pack.js?v=2.1.4'></script>"."\n";
	
    $tmpContent.='<link type="text/css" href="'.$SITEURL.'/plugins/nanogallery3/fancybox/helpers/jquery.fancybox-buttons.css?v=1.0.5" rel="stylesheet">'."\n";
	$tmpContent.="<script type='text/javascript' src='".$SITEURL."/plugins/nanogallery3/fancybox/helpers/jquery.fancybox-buttons.js?v=1.0.5'></script>"."\n";
	$tmpContent.="<script type='text/javascript' src='".$SITEURL."/plugins/nanogallery3/fancybox/helpers/jquery.fancybox-media.js?v=1.0.5'></script>"."\n";

    $tmpContent.='<script>'."\n";
    $tmpContent.='  jQuery(document).ready(function () {'."\n";
	for( $i=0; $i<count($mp->_nanoGallerySettings); $i++ ) {
		$tmpContent.="    nG.Initiate('nanoGallery".$i."',".$mp->_nanoGallerySettings[$i]->jsParams().",".$i.");"."\n";
	}
    $tmpContent.='  });'."\n";
    $tmpContent.='</script>'."\n";
	
    
    echo $tmpContent;
};

# functions
function nanoGallery($content) {

	if (strpos($content, '(%nanogallery') === false ){  return $content; };
	$mp = new nanoGalleryParsedContent($content);
	for( $i=0; $i<count($mp->_nanoGallerySettings); $i++ ) {
		if( $mp->_nanoGallerySettings[$i]->checkConsistency() === false ) {
			return $mp->_nanoGallerySettings[$i]->_consistencyError;
		}
	}

	return $mp->_newContent;

}

function nanoGallery_show() {
	#echo '<p>I like to echo "Hello World" in the footers of all themes.</p>';
}

?>
